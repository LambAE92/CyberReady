type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-6 ${
        hover ? "transition-all duration-200 hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
