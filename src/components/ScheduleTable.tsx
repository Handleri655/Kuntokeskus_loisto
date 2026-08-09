import type { ScheduleDay } from "@/lib/schedules";

export function ScheduleTable({ days }: { days: ScheduleDay[] }) {
  return (
    <div className="grid gap-4">
      {days.map((day) => (
        <div key={day.day} className="panel overflow-hidden">
          <div className="border-b border-[var(--line)] bg-[linear-gradient(90deg,rgba(31,138,127,0.08),transparent)] px-5 py-3.5 pl-6 md:px-6 md:pl-7">
            <h3 className="font-display text-xl font-semibold tracking-tight">
              {day.day}
            </h3>
          </div>
          <ul className="divide-y divide-[var(--line)]">
            {day.classes.map((item) => (
              <li
                key={`${day.day}-${item.time}-${item.name}`}
                className="grid gap-2 px-5 py-4 pl-6 sm:grid-cols-[8.5rem_1fr_auto] sm:items-start md:px-6 md:pl-7"
              >
                <span className="text-sm font-semibold text-accent">
                  {item.time}
                </span>
                <div>
                  <div className="font-medium text-ink">{item.name}</div>
                  {item.note ? (
                    <p className="mt-1 text-sm text-muted">{item.note}</p>
                  ) : null}
                </div>
                {item.instructor ? (
                  <span className="text-sm text-muted sm:text-right">
                    {item.instructor}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
