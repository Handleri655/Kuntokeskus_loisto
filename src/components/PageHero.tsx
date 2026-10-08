import Image from "next/image";
import { HeroLine, HeroMotion } from "@/components/HeroMotion";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  veilClassName?: string;
};

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  veilClassName,
}: PageHeroProps) {
  return (
    <HeroMotion
      className="relative isolate min-h-[52vh] overflow-hidden bg-ink text-white md:min-h-[60vh]"
      contentClassName="container-page relative flex min-h-[52vh] flex-col justify-end pb-10 pt-28 md:min-h-[60vh] md:pb-14"
      veilClassName={veilClassName}
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
        <h1 className="font-display mt-3 max-w-3xl text-[clamp(2.1rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
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
