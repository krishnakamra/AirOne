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

## Deploying to Netlify

`scripts/export-static.py` mirrors the site into `static/`: a self-contained
bundle of clean-URL directories with no build step, no server and no
dependencies. Drag that folder onto https://app.netlify.com/drop, or:

```bash
python3 scripts/export-static.py
cd static && netlify deploy --dir . --prod
```

Pages, styling, images and the client bundle all carry over, so the mobile
menu, the fare and city filters and the destination rail keep working.

The contact form is rewired to **Netlify Forms** on the way out. The form name,
the `data-netlify` flag and the hidden `form-name` input are written into
`contact/index.html`, which is what Netlify parses at deploy time, so
submissions show up under Forms in the site dashboard with no backend at all.
Turn on notifications there to route them to info@airone.ca. Opened anywhere
other than Netlify, the form falls back to composing an email to the desk.

The bundle also carries a `netlify.toml` with immutable asset caching, security
headers and legacy link redirects.

### Making the repository self-contained

The generated imagery currently ships with the deployed site rather than with
this repository. To bring it in once, so a Netlify build from git needs nothing
external:

```bash
unzip airone-netlify.zip -d /tmp/airone
cp /tmp/airone/assets/*.jpg /tmp/airone/assets/*.png app/public/assets/
git add app/public/assets && git commit -m "Add generated imagery" && git push
```

## Contact

info@airone.ca, +1 (942) 388-2017
401 N Michigan Ave, Suite 1200, Chicago, IL 60611
