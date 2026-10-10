const fieldControlClass =
  "w-full min-h-12 rounded-xl border border-[var(--line)] bg-white px-3.5 py-3 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 md:min-h-0 md:py-2.5 md:text-[0.95rem]";

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
        className={fieldControlClass}
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
        className={`${fieldControlClass} min-h-[6.5rem] resize-y`}
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
      className={`grid gap-3 rounded-xl border border-[var(--line)] bg-white p-3.5 sm:p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl py-1 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 rounded border-[var(--line)] text-accent focus:ring-accent/30"
      />
      <span>
        <span className="font-semibold text-ink">{label}</span>
        {hint ? (
          <span className="mt-0.5 block text-xs leading-snug text-muted">
            {hint}
          </span>
        ) : null}
      </span>
    </label>
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
      className={`scroll-mt-36 overflow-hidden rounded-2xl border shadow-sm md:scroll-mt-48 ${
        accent
          ? "border-accent/35 bg-[rgba(224,122,40,0.04)]"
          : "border-[var(--line)] bg-white"
      }`}
    >
      <div
        className={`flex flex-col gap-3 border-b px-4 py-4 sm:px-5 md:flex-row md:flex-wrap md:items-start md:justify-between ${
          accent
            ? "border-accent/20 bg-[rgba(224,122,40,0.08)]"
            : "border-[var(--line)]"
        }`}
      >
        <div className="min-w-0">
          {appearsOn ? (
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent sm:text-xs">
              Näkyy: {appearsOn}
            </p>
          ) : null}
          <h2
            className={`font-display text-lg font-semibold tracking-tight sm:text-xl ${
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
        {actions ? (
          <div className="flex w-full flex-wrap gap-2 md:w-auto md:justify-end">
            {actions}
          </div>
        ) : null}
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </section>
  );
}
