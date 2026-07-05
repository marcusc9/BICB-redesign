import type { Metadata } from "next";
import { ProgrammeDetail } from "@/components/programme-detail";
import { programmes } from "@/data/site";

const programme = programmes.find((item) => item.slug === "children");

export const metadata: Metadata = {
  title: "Children's Classes",
  description:
    "Children's classes in Manchester for ages 5-10, using arts, songs, stories, prayers and games to nurture spiritual qualities."
};

export default function ChildrenProgrammePage() {
  if (!programme) {
    return null;
  }

  return <ProgrammeDetail programme={programme} />;
}
