import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Safeguarding",
  description: "Safeguarding policy for the Bahá'í Institute for Community Building in Manchester."
};

export default function SafeguardingPage() {
  return (
    <section className="page-hero">
      <div className="page-hero__inner">
        <div>
          <p className="eyebrow">Safeguarding</p>
          <h1>Policy and child protection information</h1>
          <p className="page-hero__copy">
            The current safeguarding policy is held as a shared document while the site moves away
            from Wix.
          </p>
          <ButtonLink external href={site.safeguardingPolicy}>
            <ShieldCheck aria-hidden="true" size={18} />
            Open safeguarding policy
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
