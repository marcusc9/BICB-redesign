import type { Metadata } from "next";
import { ProgrammeDetail } from "@/components/programme-detail";
import { programmes } from "@/data/site";

const programme = programmes.find((item) => item.slug === "youth");

export const metadata: Metadata = {
  title: "Youth Mentors and Volunteers",
  description:
    "Training for youth in Manchester who want to serve as children's class teachers, junior youth animators and facilitators."
};

export default function YouthVolunteersPage() {
  if (!programme) {
    return null;
  }

  return <ProgrammeDetail programme={programme} />;
}
