import Image from "next/image";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
};

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
}: PageHeroProps) {
  return (
    <HeroMotion
      className="relative isolate min-h-[62vh] overflow-hidden bg-ink text-white md:min-h-[70vh]"
      contentClassName="container-page relative flex min-h-[62vh] flex-col justify-end pb-12 pt-28 md:min-h-[70vh] md:pb-16"
      image={
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
      }
    >
      {eyebrow ? (
        <HeroLine>
          <p className="eyebrow text-accent-bright">{eyebrow}</p>
        </HeroLine>
      ) : null}
      <HeroLine>
        <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-tight">
          {title}
        </h1>
      </HeroLine>
      <HeroLine>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
          {lead}
        </p>
      </HeroLine>
    </HeroMotion>
  );
}
