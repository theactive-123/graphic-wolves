import { sendCrmLead } from "@/lib/crm";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BRAND, emailLayout, escapeHtml } from "@/lib/email-template";

interface ScheduleRequest {
  name?: unknown;
  email?: unknown;
  notes?: unknown;
  startsAt?: unknown;
  timeZone?: unknown;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json(
        { message: "Please check your details and try again." },
        { status: 400 }
      );
    }
    const body = payload as ScheduleRequest;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const notes = typeof body.notes === "string" ? body.notes.trim() : "";
    const startsAt = typeof body.startsAt === "string" ? body.startsAt : "";
    const timeZone = typeof body.timeZone === "string" ? body.timeZone : "";

    if (
      !name ||
      name.length > 120 ||
      !email ||
      email.length > 254 ||
      !emailPattern.test(email) ||
      notes.length > 2000 ||
      !timeZone ||
      timeZone.length > 100 ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(startsAt)
    ) {
      return NextResponse.json(
        { message: "Please check your details and try again." },
        { status: 400 }
      );
    }

    const requestedDate = new Date(startsAt);
    if (
      !Number.isFinite(requestedDate.getTime()) ||
      requestedDate.getTime() <= Date.now()
    ) {
      return NextResponse.json(
        { message: "Please select a future available time." },
        { status: 400 }
      );
    }

    let localParts: Intl.DateTimeFormatPart[];
    let timeZoneLabel: string;

    try {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZoneName: "long",
      });
      localParts = formatter.formatToParts(requestedDate);
      timeZoneLabel =
        localParts.find((part) => part.type === "timeZoneName")?.value ?? timeZone;
    } catch {
      return NextResponse.json(
        { message: "We could not read your timezone. Please refresh and try again." },
        { status: 400 }
      );
    }

    const localTime = Object.fromEntries(
      localParts.map(({ type, value }) => [type, value])
    );
    const localHour = Number(localTime.hour);
    const localMinute = Number(localTime.minute);
    const isWeekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(
      localTime.weekday
    );
    const isAvailableHour =
      localHour >= 9 &&
      localHour < 17 &&
      (localMinute === 0 || localMinute === 30);

    if (!isWeekday || !isAvailableHour || requestedDate.getUTCSeconds() !== 0) {
      return NextResponse.json(
        { message: "That time is outside our available weekday hours. Please choose another slot." },
        { status: 400 }
      );
    }

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD ||
      !process.env.ADMIN_EMAIL ||
      process.env.SMTP_HOST.includes("yourdomain.com")
    ) {
      console.error("SMTP environment variables are missing or placeholders.");
      return NextResponse.json(
        { message: "Email service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(requestedDate);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(requestedDate);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeNotes = escapeHtml(notes || "No additional notes provided.").replace(
      /\n/g,
      "<br />"
    );
    const appointment = `${formattedTime} · ${formattedDate}`;

    await Promise.all([
      transporter.sendMail({
        from: `"Graphic Wolves" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: email,
        subject: `Call request from ${name}`,
        text: [
          "New 30-minute discovery call request",
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          `Requested time: ${appointment}`,
          `Timezone: ${timeZoneLabel} (${timeZone})`,
          "",
          "Notes:",
          notes || "No additional notes provided.",
        ].join("\n"),
        html: emailLayout({
          preheader: `A new call request from ${name}.`,
          eyebrow: "New Call Request",
          title: `A new <span style="color:${BRAND.purple};">discovery call</span> request`,
          content: `
            <p style="margin:0 0 18px;">A visitor requested a 30-minute call. Please check availability and confirm the time with them.</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:12px;border-collapse:separate;">
              <tr><td style="padding:12px 16px;font-size:12px;font-weight:700;color:${BRAND.muted};border-bottom:1px solid ${BRAND.border};">NAME</td><td style="padding:12px 16px;font-size:14px;font-weight:600;color:${BRAND.black};border-bottom:1px solid ${BRAND.border};">${safeName}</td></tr>
              <tr><td style="padding:12px 16px;font-size:12px;font-weight:700;color:${BRAND.muted};border-bottom:1px solid ${BRAND.border};">EMAIL</td><td style="padding:12px 16px;font-size:14px;font-weight:600;border-bottom:1px solid ${BRAND.border};"><a href="mailto:${safeEmail}" style="color:${BRAND.purple};text-decoration:none;">${safeEmail}</a></td></tr>
              <tr><td style="padding:12px 16px;font-size:12px;font-weight:700;color:${BRAND.muted};border-bottom:1px solid ${BRAND.border};">REQUESTED TIME</td><td style="padding:12px 16px;font-size:14px;font-weight:600;color:${BRAND.black};border-bottom:1px solid ${BRAND.border};">${escapeHtml(appointment)}</td></tr>
              <tr><td style="padding:12px 16px;font-size:12px;font-weight:700;color:${BRAND.muted};border-bottom:1px solid ${BRAND.border};">TIMEZONE</td><td style="padding:12px 16px;font-size:14px;font-weight:600;color:${BRAND.black};border-bottom:1px solid ${BRAND.border};">${escapeHtml(timeZoneLabel)} (${escapeHtml(timeZone)})</td></tr>
              <tr><td style="padding:12px 16px;font-size:12px;font-weight:700;color:${BRAND.muted};">NOTES</td><td style="padding:12px 16px;font-size:14px;color:${BRAND.text};">${safeNotes}</td></tr>
            </table>
          `,
        }),
      }),
      transporter.sendMail({
        from: `"Graphic Wolves" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "We received your call request",
        text: [
          `Hi ${name},`,
          "",
          "We received your request for a 30-minute discovery call.",
          `Requested time: ${appointment}`,
          `Timezone: ${timeZoneLabel} (${timeZone})`,
          "",
          "This time is not confirmed yet. Our team will check availability and reply to this email.",
          "",
          "Regards,",
          "Graphic Wolves",
        ].join("\n"),
        html: emailLayout({
          preheader: "We received your discovery call request.",
          eyebrow: "Request Received",
          title: `Thanks, <span style="color:${BRAND.purple};">${escapeHtml(
            name.split(/\s+/)[0]
          )}</span>!`,
          content: `
            <p style="margin:0 0 16px;">We received your request for a 30-minute discovery call.</p>
            <p style="margin:0 0 6px;font-weight:700;color:${BRAND.black};">${escapeHtml(appointment)}</p>
            <p style="margin:0 0 18px;color:${BRAND.muted};">${escapeHtml(timeZoneLabel)} (${escapeHtml(timeZone)})</p>
            <p style="margin:0;">This time is not confirmed yet. Our team will check availability and reply to this email.</p>
            <p style="margin:23px 0 0;">Regards,<br /><strong>Graphic Wolves</strong></p>
          `,
        }),
      }),
    ]);

    const crmSynced = await sendCrmLead("schedule", { name, email, message: notes, startsAt, timeZone }, request);

    return NextResponse.json({
      success: true,
      crmSynced,
      message: "Your request was sent. Our team will confirm the time by email.",
    });
  } catch (error) {
    console.error("Schedule request error:", error);
    return NextResponse.json(
      { message: "Unable to send your request right now. Please try again later." },
      { status: 500 }
    );
  }
}
