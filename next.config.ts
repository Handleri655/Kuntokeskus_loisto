import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/nimaljarentoutus",
        destination: "/aanimaljarentoutus",
        permanent: true,
      },
      {
        source: "/henkil-esittely",
        destination: "/jari",
        permanent: true,
      },
      {
        source: "/loiston-info",
        destination: "/info",
        permanent: true,
      },
      {
        source: "/personal-training-intensiivi-painonpudotus",
        destination: "/personal-training",
        permanent: true,
      },
      {
        source: "/personal-training-intensiivi-painonpudotus/painonpudotus",
        destination: "/painonpudotus",
        permanent: true,
      },
      {
        source: "/ryhm-liikunta-17.8.26",
        destination: "/ryhmaliikunta",
        permanent: true,
      },
      {
        source: "/uusi-ryhm-liikunta",
        destination: "/ryhmaliikunta/kesa",
        permanent: true,
      },
      {
        source: "/kangoo-power-jumps",
        destination: "/kangoo",
        permanent: true,
      },
      {
        source: "/hieronta-kuivakuppaus-kuumakivi-hieronta",
        destination: "/hyvinvointi",
        permanent: true,
      },
      {
        source: "/astanga-jooga",
        destination: "/jooga",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
