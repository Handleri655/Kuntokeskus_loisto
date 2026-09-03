"use client";

import { HoverCard } from "@/components/HoverCard";
import type { ScheduleDay } from "@/lib/schedules";

export function ScheduleTable({ days }: { days: ScheduleDay[] }) {
  return (
    <div className="grid gap-5">
      {days.map((day) => (
        <HoverCard key={day.day} className="panel overflow-hidden">
          <div className="border-b border-[var(--line)] bg-[linear-gradient(90deg,rgba(212,168,75,0.12),transparent)] px-5 py-4 pl-6 md:px-7 md:pl-8">
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-[1.75rem]">
              {day.day}
            </h3>
          </div>
          <ul className="divide-y divide-[var(--line)]">
            {day.classes.map((item) => (
              <li
                key={`${day.day}-${item.time}-${item.name}`}
                className="grid gap-2 px-5 py-5 pl-6 sm:grid-cols-[10rem_1fr_auto] sm:items-start md:px-7 md:pl-8 md:py-6"
              >
                <span className="text-base font-bold text-accent md:text-lg">
                  {item.time}
                </span>
                <div>
                  <div className="text-lg font-semibold text-ink md:text-xl">
                    {item.name}
                  </div>
                  {item.note ? (
                    <p className="mt-1.5 text-base text-muted leading-relaxed">
                      {item.note}
                    </p>
                  ) : null}
                </div>
                {item.instructor ? (
                  <span className="text-base font-medium text-muted sm:text-right md:text-lg">
                    {item.instructor}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </HoverCard>
      ))}
    </div>
  );
}
