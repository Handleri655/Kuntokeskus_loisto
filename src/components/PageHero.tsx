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
    <section className="relative isolate min-h-[62vh] overflow-hidden bg-ink text-white md:min-h-[70vh]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="animate-drift object-cover object-center"
        sizes="100vw"
      />
      <div className="hero-veil absolute inset-0" />
      <div className="grain absolute inset-0" />
      <div className="container-page relative flex min-h-[62vh] flex-col justify-end pb-12 pt-28 md:min-h-[70vh] md:pb-16">
        {eyebrow ? (
          <p className="eyebrow animate-rise text-accent-bright">{eyebrow}</p>
        ) : null}
        <h1 className="animate-rise-delay-1 font-display mt-4 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-tight">
          {title}
        </h1>
        <p className="animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
          {lead}
        </p>
      </div>
    </section>
  );
}
