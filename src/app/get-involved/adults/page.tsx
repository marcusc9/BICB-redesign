import type { Metadata } from "next";
import { ProgrammeDetail } from "@/components/programme-detail";
import { programmes } from "@/data/site";

const programme = programmes.find((item) => item.slug === "adults");

export const metadata: Metadata = {
  title: "Adult Volunteers and Training",
  description:
    "Adult volunteer training in Manchester for parent gatherings, children's classes, prayer spaces and family festivals."
};

export default function AdultVolunteersPage() {
  if (!programme) {
    return null;
  }

  return <ProgrammeDetail programme={programme} />;
}
