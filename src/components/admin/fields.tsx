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
      <span className="font-medium text-ink">{label}</span>
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
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
      <span className="font-medium text-ink">{label}</span>
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}

export function Card({
  title,
  description,
  children,
  actions,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--line)] bg-[#f8fafb] px-5 py-4">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-sm text-muted">{description}</p>
          ) : null}
        </div>
        {actions}
      </div>
      <div className="space-y-4 p-5">{children}</div>
    </section>
  );
}
