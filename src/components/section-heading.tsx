type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, children, align = "left" }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <div className="section-heading__copy">{children}</div> : null}
    </div>
  );
}
