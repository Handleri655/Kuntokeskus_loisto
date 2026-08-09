import Image from "next/image";

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
    <section className="relative isolate min-h-[58vh] overflow-hidden bg-ink text-white md:min-h-[64vh]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="animate-drift object-cover"
        sizes="100vw"
      />
      <div className="hero-veil absolute inset-0" />
      <div className="grain absolute inset-0" />
      <div className="container-page relative flex min-h-[58vh] flex-col justify-end pb-14 pt-32 md:min-h-[64vh] md:pb-20">
        {eyebrow ? (
          <p className="animate-rise text-xs font-semibold uppercase tracking-[0.22em] text-accent-bright">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="animate-rise-delay-1 font-display mt-3 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-tight md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="animate-rise-delay-2 mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          {lead}
        </p>
      </div>
    </section>
  );
}
