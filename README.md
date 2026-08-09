# Kuntokeskus Loisto – nettisivut

Premium Next.js -sivusto yritykselle [Kuntokeskus Loisto Oy](https://kuntokeskusloisto.fi/).

## Käynnistys

```bash
npm install
npm run dev
```

Avaa [http://localhost:3000](http://localhost:3000).

## Hallinta (asiakas)

**[/admin](http://localhost:3000/admin)**

1. Kirjaudu salasanalla (oletus: `loisto2026`)
2. Muokkaa hintoja / tarjouksia / ryhmäliikuntatunteja
3. Paina **Tallenna**

## Pysyvä tallennus (GitHub + Vercel)

Admin-tallennus toimii tuotannossa **Upstash Redis** -pilvitietokannan kautta.

### 1. Luo Upstash-tietokanta

1. Mene [console.upstash.com](https://console.upstash.com/)
2. Create Database → valitse ilmainen (Free)
3. Kopioi **UPSTASH_REDIS_REST_URL** ja **UPSTASH_REDIS_REST_TOKEN**

### 2. Lisää ympäristömuuttujat

Paikallisesti `.env.local`:

```env
ADMIN_PASSWORD=oma-vahva-salasana
ADMIN_SECRET=oma-salainen-avain
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxx
```

Vercelissä: Project → Settings → Environment Variables → samat avaimet.

### 3. Julkaise

Push GitHubiin → deploy Verceliin. Admin-muutokset säilyvät pilvessä deployien yli.

Ilman Upstash-avaimia sivusto käyttää paikallisia tiedostoja `data/prices.json` ja `data/schedules.json` (hyvä kehitykseen / VPS:lle).

## Tuotanto (VPS)

```bash
npm run build
npm start
```

## Sisältö

Kuntosali, ryhmäliikunta, Aerial Bungee, Cross Training, Kangoo, jooga, PT, painonpudotus, solarium, hyvinvointi, hinnat, tarjoukset, info ja henkilökuva.
