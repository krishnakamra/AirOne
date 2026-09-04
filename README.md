# AirOne

Marketing site for **AirOne Travel Agency**, a Chicago travel desk booking
discounted last minute flights and stays across North America.

**Live:** https://airone-travel.higgsfield.app

## Pages

| Route | What it does |
| --- | --- |
| `/` | Hero, partner strip, live fare board, destination rail, stays, how the desk works, closing call |
| `/flights` | Search instrument, region filters, fare board, fare rules, FAQ |
| `/stays` | City filters, property detail, coverage grid, booking terms |
| `/about` | The Chicago office, coverage, route map, the three agents |
| `/contact` | Address and hours, request form backed by D1 |

## Stack

React 19 + TanStack Start, server rendered, deployed as a single Cloudflare
Worker. The project lives in `app/`; run every build command from there.

- `app/design-brief.md` is the locked design contract. Palette, type, layout
  families, the Tier-1 mechanic and the CTA inventory all trace back to it.
- `app/src/lib/site-data.ts` holds the fare board, stays, destinations and desk
  copy. Editing a fare here changes it everywhere it appears.
- `app/src/components/airone/` holds the site's own components. Nothing here
  shares a button class: each call to action is its own component with its own
  interaction identity, which is deliberate.
- `app/src/lib/api/contact.functions.ts` persists travel requests to D1
  (schema in `app/migrations/0002_travel_requests.sql`).
- `refs/` holds the generated reference boards the build was designed against.

## Static export

`scripts/export-static.py` mirrors the deployed site into a portable bundle of
clean-URL directories, so it drops onto any ordinary static host (Netlify,
Vercel, S3 plus CloudFront, nginx, Apache, GitHub Pages) with no rewrite rules
and no server:

```bash
python3 scripts/export-static.py
python3 -m http.server --directory static
```

Pages, styling, images and the client bundle all carry over, so the mobile
menu, the fare and city filters and the destination rail keep working. The
contact form is the one exception: it posts to a server function that only
exists on the Worker, so in the static bundle it falls back to opening a
prefilled email to the desk. Point it at a real form endpoint when you have
one.

## Contact

info@airone.ca, +1 (942) 388-2017
401 N Michigan Ave, Suite 1200, Chicago, IL 60611
