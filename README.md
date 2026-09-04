# AirOne

Marketing site for **AirOne Travel Agency**, a Chicago travel desk booking
discounted last minute flights and stays across North America.

- **Stack**: React 19 + TanStack Start, server rendered, deployed as a single
  Cloudflare Worker. The project lives in `app/`.
- **Pages**: Home, Flights, Stays, About, Contact.
- **Design contract**: `app/design-brief.md` is the locked brief. Palette, type,
  layout families and the CTA inventory all trace back to it.
- **Data**: `app/src/lib/site-data.ts` holds the fare board, stays and desk copy.
- **Backend**: the contact form writes to D1 via
  `app/src/lib/api/contact.functions.ts` (schema in `app/migrations/`).

Imagery is generated per the brief and is served from `app/public/assets/` on
the deployed site.

Contact: info@airone.ca, +1 (942) 388-2017
