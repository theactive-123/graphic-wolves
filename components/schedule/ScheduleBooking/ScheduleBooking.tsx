"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import styles from "./ScheduleBooking.module.css";

type BookingStep = "date-time" | "details" | "success";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = Array.from({ length: 16 }, (_, index) => {
  const totalMinutes = 9 * 60 + index * 30;
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
});

const timeZoneOptions = [
  "UTC",
  "America/Los_Angeles",
  "America/Anchorage",
  "America/Phoenix",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Halifax",
  "America/Toronto",
  "America/Sao_Paulo",
  "America/Mexico_City",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Istanbul",
  "Africa/Cairo",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Dhaka",
  "Asia/Bangkok",
  "Asia/Singapore",
  "Asia/Hong_Kong",
  "Asia/Tokyo",
  "Australia/Perth",
  "Australia/Sydney",
  "Pacific/Auckland",
];

const zonedDateFormatters = new Map<string, Intl.DateTimeFormat>();

function getZonedDateFormatter(timeZone: string) {
  let formatter = zonedDateFormatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    zonedDateFormatters.set(timeZone, formatter);
  }
  return formatter;
}

function getZonedParts(date: Date, timeZone: string) {
  const parts = getZonedDateFormatter(timeZone).formatToParts(date);
  return Object.fromEntries(parts.map(({ type, value }) => [type, value]));
}

function formatTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return new Date(2020, 0, 1, hour, minute).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getTimeZoneLabel(timeZone: string, date: Date) {
  const zoneName = new Intl.DateTimeFormat(undefined, {
    timeZone,
    timeZoneName: "long",
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;

  return zoneName ? `${zoneName} · ${timeZone}` : timeZone;
}

function getDateKeyParts(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return { year, month, day };
}

function getMonthLabel(month: Date) {
  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(month);
}

function formatDateKey(
  dateKey: string,
  timeZone: string,
  options: Intl.DateTimeFormatOptions
) {
  const { year, month, day } = getDateKeyParts(dateKey);
  return new Intl.DateTimeFormat(undefined, {
    ...options,
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}

function dateKeyToUtc(dateKey: string, time: string, timeZone: string) {
  const { year, month, day } = getDateKeyParts(dateKey);
  const [hour, minute] = time.split(":").map(Number);
  const desiredUtcValue = Date.UTC(year, month - 1, day, hour, minute);
  let utcValue = desiredUtcValue;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const localParts = getZonedParts(new Date(utcValue), timeZone);
    const localAsUtc = Date.UTC(
      Number(localParts.year),
      Number(localParts.month) - 1,
      Number(localParts.day),
      Number(localParts.hour),
      Number(localParts.minute)
    );
    const adjustment = desiredUtcValue - localAsUtc;
    utcValue += adjustment;
    if (adjustment === 0) break;
  }

  return new Date(utcValue);
}

function getAvailableSlots(dateKey: string, timeZone: string, todayKey: string) {
  if (dateKey < todayKey) return [];
  if (dateKey > todayKey) return timeSlots;
  const now = Date.now();
  return timeSlots.filter(
    (slot) => dateKeyToUtc(dateKey, slot, timeZone).getTime() > now
  );
}

export default function ScheduleBooking() {
  const [step, setStep] = useState<BookingStep>("date-time");
  const [month, setMonth] = useState<{ year: number; month: number } | null>(null);
  const [todayKey, setTodayKey] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [detectedTimeZone, setDetectedTimeZone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let detectedTimeZone = "UTC";
    try {
      detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch {
      detectedTimeZone = "UTC";
    }
    const now = new Date();
    const today = getZonedParts(now, "UTC");
    setTodayKey(`${today.year}-${today.month}-${today.day}`);
    setMonth({ year: Number(today.year), month: Number(today.month) });
    setTimeZone("UTC");
    setDetectedTimeZone(detectedTimeZone);
  }, []);

  const calendarCells = useMemo(() => {
    if (!month) return [];
    const daysInMonth = new Date(Date.UTC(month.year, month.month, 0)).getUTCDate();
    const mondayOffset =
      (new Date(Date.UTC(month.year, month.month - 1, 1)).getUTCDay() + 6) % 7;
    return [
      ...Array.from({ length: mondayOffset }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) =>
        index + 1
      ),
    ];
  }, [month]);

  const selectedSlots =
    selectedDate && timeZone
      ? getAvailableSlots(selectedDate, timeZone, todayKey)
      : [];
  const timezoneDisplay = timeZone
    ? getTimeZoneLabel(timeZone, new Date())
    : "Detecting your timezone…";

  const monthLabel = month ? getMonthLabel(new Date(Date.UTC(month.year, month.month - 1, 1))) : "Loading calendar…";

  const canGoPrevious = Boolean(
    month &&
      todayKey &&
      (month.year > getDateKeyParts(todayKey).year ||
        (month.year === getDateKeyParts(todayKey).year &&
          month.month > getDateKeyParts(todayKey).month))
  );

  const changeMonth = (direction: -1 | 1) => {
    setMonth((current) => {
      if (!current) return current;
      const next = new Date(Date.UTC(current.year, current.month - 1 + direction, 1));
      return { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1 };
    });
    setSelectedDate("");
    setSelectedTime("");
  };

  const updateTimeZone = (nextTimeZone: string) => {
    setTimeZone(nextTimeZone);
    const today = getZonedParts(new Date(), nextTimeZone);
    setTodayKey(`${today.year}-${today.month}-${today.day}`);
    setMonth({ year: Number(today.year), month: Number(today.month) });
    setSelectedDate("");
    setSelectedTime("");
    setError("");
  };

  const chooseDate = (day: number) => {
    if (!month || !timeZone) return;
    const dateKey = `${month.year}-${String(month.month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!getAvailableSlots(dateKey, timeZone, todayKey).length) return;
    setSelectedDate(dateKey);
    setSelectedTime("");
  };

  const startDetails = () => {
    if (selectedDate && selectedTime) {
      setError("");
      setStep("details");
    }
  };

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedDate || !selectedTime || !timeZone) {
      setError("Please choose a date and time first.");
      setStep("date-time");
      return;
    }

    const selectedStart = dateKeyToUtc(selectedDate, selectedTime, timeZone);

    if (selectedStart.getTime() <= Date.now()) {
      setError("That time has passed. Please choose another available slot.");
      setStep("date-time");
      setSelectedTime("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          notes,
          startsAt: selectedStart.toISOString(),
          timeZone,
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your call request.");
      }

      setStep("success");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send your call request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedDateLabel = selectedDate && timeZone
    ? formatDateKey(selectedDate, timeZone, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const timezoneOptions = timeZoneOptions.includes(timeZone)
    ? timeZoneOptions
    : [timeZone, ...timeZoneOptions];

  return (
    <section className={styles.section} aria-label="Schedule a meeting">
      <div className={styles.bookingCard}>
        <aside className={styles.meetingInfo}>
          <a className={styles.brand} href="/" aria-label="Graphic Wolves home">
            <Image
              src="/images/graphic-logo.svg"
              alt="Graphic Wolves"
              width={210}
              height={48}
              priority
            />
          </a>

          <div className={styles.meetingCopy}>
            <p className={styles.host}>Graphic Wolves</p>
            <h2 className={styles.meetingTitle}>30 Minute Discovery Call</h2>
            <p className={styles.meetingDescription}>
              A relaxed conversation about your goals, your project, and where
              we can help.
            </p>
          </div>

          <div className={styles.meetingMeta}>
            <span className={styles.metaIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 7v5l3.5 2" />
              </svg>
            </span>
            <span>30 min</span>
          </div>
          <div className={styles.meetingMeta}>
            <span className={styles.metaIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="13" height="12" rx="2" />
                <path d="m16 10 5-3v10l-5-3" />
              </svg>
            </span>
            <span>Video call details provided upon confirmation.</span>
          </div>

          {selectedDateLabel && selectedTime && step !== "date-time" && (
            <div className={styles.selectedSummary}>
              <span className={styles.summaryIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3.5" y="5" width="17" height="16" rx="2" />
                  <path d="M7.5 3v4m9-4v4M4 9h16" />
                </svg>
              </span>
              <span>
                <strong>
                  {formatTime(selectedTime)} · {selectedDateLabel}
                </strong>
                <small>{timezoneDisplay}</small>
              </span>
            </div>
          )}

          <div className={styles.timezoneNote}>
            <span className={styles.timezoneDot} />
            Times shown in your local timezone
          </div>
        </aside>

        <div className={styles.bookingContent}>
          {step === "date-time" && (
            <>
              <div className={styles.contentHeading}>
                <div>
                  <p className={styles.stepLabel}>STEP 01 <span>OF 02</span></p>
                  <h2>Select a Date &amp; Time</h2>
                </div>
                <span className={styles.durationBadge}>30 MIN</span>
              </div>

              <div className={styles.dateTimeLayout}>
                <div className={styles.calendarPane}>
                  <div className={styles.monthNavigation}>
                    <button
                      className={styles.monthArrow}
                      type="button"
                      onClick={() => changeMonth(-1)}
                      disabled={!canGoPrevious}
                      aria-label="Previous month"
                    >
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>
                    <h3>{monthLabel}</h3>
                    <button
                      className={styles.monthArrow}
                      type="button"
                      onClick={() => changeMonth(1)}
                      disabled={!month}
                      aria-label="Next month"
                    >
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>

                  <div className={styles.calendarGrid} role="grid" aria-label={monthLabel}>
                    {weekdays.map((weekday) => (
                      <span className={styles.weekday} key={weekday} role="columnheader">
                        {weekday}
                      </span>
                    ))}
                    {calendarCells.map((day, index) => {
                      if (day === null) {
                        return (
                          <span
                            className={styles.emptyDay}
                            key={`empty-${index}`}
                            aria-hidden="true"
                          />
                        );
                      }

                      const dateKey = `${month?.year}-${String(month?.month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                      const weekday = month
                        ? new Date(Date.UTC(month.year, month.month - 1, day)).getUTCDay()
                        : 0;
                      const available =
                        weekday !== 0 &&
                        weekday !== 6 &&
                        dateKey >= todayKey &&
                        getAvailableSlots(dateKey, timeZone, todayKey).length > 0;
                      const selected = dateKey === selectedDate;

                      return (
                        <button
                          className={`${styles.dayButton} ${available ? styles.dayAvailable : ""} ${selected ? styles.daySelected : ""}`}
                          type="button"
                          key={dateKey}
                          disabled={!available}
                          onClick={() => chooseDate(day)}
                          aria-label={`${formatDateKey(dateKey, timeZone, {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}${available ? ", available" : ", unavailable"}`}
                          aria-pressed={selected}
                          role="gridcell"
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  <div className={styles.timezoneBlock}>
                    <label htmlFor="schedule-timezone">Time zone</label>
                    <div className={styles.timezoneSelectWrap}>
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M3.5 12h17M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18" />
                      </svg>
                      <select
                        id="schedule-timezone"
                        value={timeZone}
                        onChange={(event) => updateTimeZone(event.target.value)}
                        aria-label="Choose your timezone"
                      >
                        {timezoneOptions.map((zone) => (
                          <option key={zone} value={zone}>
                            {zone.replaceAll("_", " ")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className={styles.timezoneDetected}>
                      Browser detected: {detectedTimeZone || "Detecting…"}
                    </p>
                  </div>
                </div>

                <div className={styles.timesPane}>
                  <h3>
                    {selectedDate && timeZone
                      ? formatDateKey(selectedDate, timeZone, {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })
                      : "Available times"}
                  </h3>

                  {!selectedDate && (
                    <p className={styles.selectDateHint}>
                      Select a day on the calendar to see available times.
                    </p>
                  )}

                  {selectedDate && selectedSlots.length === 0 && (
                    <p className={styles.selectDateHint}>
                      No more times are available today. Please choose another day.
                    </p>
                  )}

                  {selectedSlots.length > 0 && (
                    <>
                      <div className={styles.timeList}>
                        {selectedSlots.map((slot) => (
                          <button
                            className={`${styles.timeButton} ${selectedTime === slot ? styles.timeSelected : ""}`}
                            type="button"
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            aria-pressed={selectedTime === slot}
                          >
                            {formatTime(slot)}
                          </button>
                        ))}
                      </div>
                      {selectedTime && (
                        <button
                          className={styles.nextButton}
                          type="button"
                          onClick={startDetails}
                        >
                          <span>Next</span>
                          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12h14m-6-6 6 6-6 6" />
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {step === "details" && (
            <form className={styles.detailsForm} onSubmit={submitRequest}>
              <button
                className={styles.backButton}
                type="button"
                onClick={() => {
                  setError("");
                  setStep("date-time");
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M19 12H5m0 0 7-7m-7 7 7 7" />
                </svg>
                Back to date &amp; time
              </button>

              <p className={styles.stepLabel}>STEP 02 <span>OF 02</span></p>
              <h2>Enter your details</h2>
              <p className={styles.formIntro}>
                Share your details and we&apos;ll email you to confirm the call.
              </p>

              <label className={styles.field}>
                <span>Name <b>*</b></span>
                <input
                  autoComplete="name"
                  maxLength={120}
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                />
              </label>

              <label className={styles.field}>
                <span>Email <b>*</b></span>
                <input
                  autoComplete="email"
                  maxLength={254}
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              <label className={styles.field}>
                <span>Anything we should know? <small>Optional</small></span>
                <textarea
                  maxLength={2000}
                  rows={4}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Tell us a little about what you’d like to discuss."
                />
              </label>

              {error && <p className={styles.errorMessage} role="alert">{error}</p>}

              <button className={styles.submitButton} type="submit" disabled={loading}>
                {loading ? "Sending request…" : "Request this time"}
                {!loading && (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                )}
              </button>
              <p className={styles.requestNote}>
                This is a time request, not a confirmed booking. Our team will
                check availability and confirm by email.
              </p>
            </form>
          )}

          {step === "success" && (
            <div className={styles.successPanel} role="status">
              <div className={styles.successIcon} aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="27" />
                  <path d="m19 32 9 9 18-19" />
                </svg>
              </div>
              <p className={styles.stepLabel}>REQUEST SENT</p>
              <h2>You&apos;re on our calendar request list.</h2>
              <p>
                We&apos;ve emailed your requested time to our team. We&apos;ll
                confirm availability with you at <strong>{email}</strong>.
              </p>
              <div className={styles.successSummary}>
                <strong>{formatTime(selectedTime)} · {selectedDateLabel}</strong>
                <span>{timezoneDisplay}</span>
              </div>
              <a className={styles.homeLink} href="/">
                Back to Graphic Wolves
              </a>
            </div>
          )}

          {error && step === "date-time" && (
            <p className={styles.errorMessage} role="alert">{error}</p>
          )}
        </div>
      </div>
      <p className={styles.privacyNote}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 10V7a6 6 0 0 1 12 0v3m-13 0h14v11H5V10Z" />
          <path d="M12 14v3" />
        </svg>
        Your details are only used to arrange this conversation.
      </p>
    </section>
  );
}
