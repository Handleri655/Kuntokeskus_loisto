export function Field({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-semibold text-ink">{label}</span>
      {hint ? <span className="text-xs leading-snug text-muted">{hint}</span> : null}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-[0.95rem] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-semibold text-ink">{label}</span>
      {hint ? <span className="text-xs leading-snug text-muted">{hint}</span> : null}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 text-[0.95rem] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}

export function ItemBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid gap-3 rounded-xl border border-[var(--line)] bg-white p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function Card({
  title,
  description,
  appearsOn,
  children,
  actions,
  tone = "default",
}: {
  title: string;
  description?: string;
  appearsOn?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  tone?: "default" | "accent";
}) {
  const accent = tone === "accent";
  return (
    <section
      className={`scroll-mt-56 overflow-hidden rounded-2xl border shadow-sm md:scroll-mt-48 ${
        accent
          ? "border-accent/35 bg-[rgba(224,122,40,0.04)]"
          : "border-[var(--line)] bg-white"
      }`}
    >
      <div
        className={`flex flex-wrap items-start justify-between gap-3 border-b px-5 py-4 ${
          accent
            ? "border-accent/20 bg-[rgba(224,122,40,0.08)]"
            : "border-[var(--line)]"
        }`}
      >
        <div>
          {appearsOn ? (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Näkyy: {appearsOn}
            </p>
          ) : null}
          <h2
            className={`font-display text-xl font-semibold tracking-tight ${
              appearsOn ? "mt-1" : ""
            }`}
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
              {description}
            </p>
          ) : null}
        </div>
        {actions}
      </div>
      <div className="space-y-4 p-5">{children}</div>
    </section>
  );
}
