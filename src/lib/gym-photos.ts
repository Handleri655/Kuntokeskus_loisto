export type GymPhoto = {
  src: string;
  alt: string;
  objectPosition?: string;
};

const hall: GymPhoto = {
  src: "/images/kuntosali-01.jpg",
  alt: "Kuntosalilaitteita Kuntokeskus Loistossa Hollolassa",
  objectPosition: "58% center",
};

const machines: GymPhoto[] = [
  {
    src: "/images/kuntosali-03.jpg",
    alt: "Rinta- ja ojentajalaitteet Loiston kuntosalilla",
  },
  {
    src: "/images/kuntosali-06.jpg",
    alt: "Rintalihaslaite Kuntokeskus Loistossa",
  },
];

const studio: GymPhoto = {
  src: "/images/kuntosali-08.jpg",
  alt: "Jumppatila välineineen Kuntokeskus Loistossa",
};

const training: GymPhoto[] = [
  {
    src: "/images/kuntosali-10.jpg",
    alt: "Leuanvetoa ja laiteharjoittelua Kuntokeskus Loistossa",
  },
  {
    src: "/images/kuntosali-12.jpg",
    alt: "Vapaat painot ja käsipainoteline Loiston kuntosalilla",
  },
  {
    src: "/images/kuntosali-13.jpg",
    alt: "Treenausta Kuntokeskus Loiston kuntosalilla",
  },
  {
    src: "/images/kuntosali-11.jpg",
    alt: "Käsipainotreeniä Loiston kuntosalilla",
  },
];

/** Vaihtuvat kuvat kuntosali-sivun herossa. */
export const gymHeroSlides: GymPhoto[] = [hall, training[0], training[2], ...machines];

/** Kaikki salikuvat galleriaan. */
export const gymGallery: GymPhoto[] = [hall, ...training, ...machines, studio];

/** Treenikuvat etusivulle ja muille nostoille. */
export const gymActionPhotos: GymPhoto[] = training;
