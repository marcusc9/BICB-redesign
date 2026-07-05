import type { Metadata } from "next";
import { ProgrammeDetail } from "@/components/programme-detail";
import { programmes } from "@/data/site";

const programme = programmes.find((item) => item.slug === "junior-youth");

export const metadata: Metadata = {
  title: "Junior Youth Groups",
  description:
    "Junior youth groups in Manchester for ages 11-15, supporting expression, spiritual perception, service and community life."
};

export default function JuniorYouthProgrammePage() {
  if (!programme) {
    return null;
  }

  return <ProgrammeDetail programme={programme} />;
}
