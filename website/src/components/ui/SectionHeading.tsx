type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment} ${className}`}>
      {label && (
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
