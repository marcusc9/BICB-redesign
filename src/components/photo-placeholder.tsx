import { Image as ImageIcon } from "lucide-react";

type PhotoPlaceholderProps = {
  label: string;
  variant?: "about" | "programme" | "portrait";
};

export function PhotoPlaceholder({ label, variant = "programme" }: PhotoPlaceholderProps) {
  return (
    <div
      aria-label={label}
      className={`photo-placeholder photo-placeholder--${variant}`}
      role="img"
    >
      <ImageIcon aria-hidden="true" size={variant === "portrait" ? 22 : 28} strokeWidth={1.5} />
      <span>{label}</span>
    </div>
  );
}
