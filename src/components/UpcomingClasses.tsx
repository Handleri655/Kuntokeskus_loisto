import { HoverCard } from "@/components/HoverCard";
import type { NimenhuutoDay, NimenhuutoFeed } from "@/lib/nimenhuuto";
import { site } from "@/lib/site";

export function UpcomingClasses({ feed }: { feed: NimenhuutoFeed }) {
  if (feed.status === "error") {
    return (
      <HoverCard className="panel panel-pad">
        <p className="text-muted leading-relaxed">
          Tunteja ei saatu juuri nyt Nimenhuudosta. Katso ajantasaiset ajat{" "}
          <a
            href={site.nimenhuutoEventsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink underline decoration-[var(--line)] underline-offset-4 hover:decoration-accent"
          >
            Aerodiggarit-kalenterista
          </a>
          .
        </p>
      </HoverCard>
    );
  }

  if (feed.status === "empty") {
    return (
      <HoverCard className="panel panel-pad">
        <p className="text-muted leading-relaxed">
          Ei tulevia tunteja seuraavalle kahdelle viikolle. Katso koko lista{" "}
          <a
            href={site.nimenhuutoEventsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink underline decoration-[var(--line)] underline-offset-4 hover:decoration-accent"
          >
            Nimenhuudossa
          </a>
          .
        </p>
      </HoverCard>
    );
  }

  return (
    <div className="grid gap-5">
      {feed.days.map((day) => (
        <DayCard key={day.date} day={day} />
      ))}
    </div>
  );
}

function DayCard({ day }: { day: NimenhuutoDay }) {
  return (
    <HoverCard className="panel overflow-hidden">
      <div className="border-b border-[var(--line)] bg-[linear-gradient(90deg,rgba(212,168,75,0.12),transparent)] px-5 py-4 pl-6 md:px-7 md:pl-8">
        <h3 className="font-display text-2xl font-semibold tracking-tight md:text-[1.75rem]">
          {day.label}
        </h3>
      </div>
      <ul className="divide-y divide-[var(--line)]">
        {day.classes.map((item) => (
          <li
            key={`${day.date}-${item.time}-${item.name}-${item.href ?? ""}`}
            className="grid gap-2 px-5 py-5 pl-6 sm:grid-cols-[9.5rem_1fr_auto] sm:items-start lg:grid-cols-[9.5rem_1fr_8rem_auto] md:px-7 md:pl-8 md:py-6"
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
              {item.instructor ? (
                <p className="mt-1 text-sm font-medium text-muted lg:hidden">
                  {item.instructor}
                </p>
              ) : null}
            </div>
            {item.instructor ? (
              <span className="hidden text-base font-medium text-muted lg:block lg:text-right md:text-lg">
                {item.instructor}
              </span>
            ) : (
              <span className="hidden lg:block" />
            )}
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-soft sm:justify-self-end"
              >
                Ilmoittaudu
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </HoverCard>
  );
}
