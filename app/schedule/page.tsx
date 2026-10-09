import type { Metadata } from "next";
import ScheduleHero from "@/components/schedule/ScheduleHero/ScheduleHero";
import MeetingBooking from "@/components/schedule/MeetingBooking/MeetingBooking";
import Header from "@/components/layout/Header/Header";
import FooterSection from "@/components/layout/Footer/FooterSection";

export const metadata: Metadata = {
  title: "Schedule a Call",
  description:
    "Choose a convenient time to talk with Graphic Wolves about your next project.",
};

export default function SchedulePage() {
  return (
    <main>
      <Header />
      <ScheduleHero />
      <MeetingBooking />
      <FooterSection />
    </main>
  );
}
