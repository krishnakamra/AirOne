# AirOne — design brief

## Design read
For a traveler with a narrow window and a real budget: someone who wants a person at a
desk to find them a seat this week, not another infinite results grid. Emotional
register is calm operational competence, the tone of an airline operations desk rather
than a lifestyle blog. Credibility is the product.

## Concept spine
**Journey / waypoints.** The site is a route, not a brochure. Every section is a
waypoint on one itinerary that runs across North America: you leave the terminal, you
cross the continent, you arrive somewhere with a key in your hand. Motifs that thread
everywhere: hairline route rules with a filled node at each end, three-letter airport
codes as structural type, boarding-pass tear edges as section dividers, and duration
strings set in mono.

## Delivery tier
`cinema` — Lenis smooth scroll bridged to GSAP ScrollTrigger, one Tier-1 mechanic,
motivated scroll reveals, no passive ambient loops.

## Animation mode
Animation mode: non-animated — user picked Non-animated at intake

## Tier-1 technique
**D1 — Horizontal cinema rail.** A pinned band pans horizontally through a wide
generated North America panorama while destination plates ride the rail.
Defense: the spine is a crossing, and D1 is the one catalog technique whose axis IS the
crossing. The visitor's vertical scroll becomes westward travel, so the mechanic
performs the idea rather than decorating it.
Mobile degradation: the pin drops to a native horizontal swipe rail with scroll-snap
points and no pinning. Reduced motion: the rail renders as a static two-row grid of the
same plates, fully composed, no pin.

## Locked palette
--paper       #EDF0F2   cool limestone ground, terminal daylight on glass
--paper-deep  #E1E7EA   banded sections, same family tint shift
--ink         #0E1A24   cool near-black, departure-board ink
--ink-soft    #53646F   secondary text and mono meta
--line        #C4CED5   hairline rules and dividers
--accent      #1B39C4   ultramarine, the single accent
--accent-deep #132A96   pressed and hover state of the same hue
Defense: limestone and ultramarine are lifted from the terminal itself, daylight on
aluminum and glass plus the one saturated blue aviation signage uses for wayfinding. It
clears every banned family (no graphite plus ember, no neon on dark, no beige plus
brass, no violet glow) and deliberately refuses the navy and sky-blue default that
every other travel site already wears. One accent, page-wide, no second hue anywhere.

## Locked type
Display and UI: **Geist**. Data: **Geist Mono**.
Swiss-rational grotesk with a true mono sibling. The mono is not decoration: it carries
the instrument data (ORD to MIA, 4h 12m, 12 seats, $148) and that data is what makes an
agency site read as real. No serif anywhere; this brand is signage, not heritage.

## Corner and border language
All-sharp. Zero border radius page-wide, 1px hairline rules in --line, no shadows
except one 1px inset on the search instrument. Boarding pass, departure board, terminal
signage. Locked for every surface including inputs and images.

## Section plan (home, 8 sections, one layout family each, no consecutive repeats)
1. Hero — full-bleed image with overlaid asymmetric text block. Anchor: bottom-left over image.
2. Partners we search — logo marquee strip. Anchor: centered statement.
3. Last-minute fare board — divide-y data rows, no cards. Anchor: top-left lead.
4. Destination rail (Tier-1) — pinned horizontal rail. Anchor: image-as-canvas.
5. Stays across North America — gapless bento, real visual variation. Anchor: off-grid offset.
6. How the desk works — hairline-ruled step rows with mono numerals. Anchor: stacked center.
7. What you get — facts strip (hours, coverage, holds), not invented stats. Anchor: inverted classic.
8. Call the desk — full-width ultramarine color-blocked banner. Anchor: centered statement.
Eight distinct families, five distinct composition anchors.
Eyebrow budget ceil(8/3) = 3. Used: 2 (fare board, stays). Hero carries none.
Mobile collapse: 3 and 6 stay single column; 5 collapses 4-cell bento to 1-col stack; 4
becomes a swipe rail; 7 goes 2-up then 1-up.

## Other routes
/flights — search instrument, fare board by region, fare rules, baggage, FAQ accordion.
/stays — city filter rail, property grid, one featured stay, amenities.
/about — the Chicago desk, coverage, accreditations, team.
/contact — form (label above input, error below), office block, hours, map plate.

## Asset plan
Hero visual: 2 candidates, one winner to app/public/assets, reject to refs/.
Section plates: boarding-pass paper grain, terminal glass gradient, night-window plate.
Content imagery: 6 destination plates (Miami, Vancouver, New York, Cabo, Banff,
Chicago), 4 stay interiors, 1 wide North America panorama for the rail, 1 Chicago
office plate, 3 team portraits.
Custom icon set: one 8-glyph sheet, 2px stroke, ink on chroma ground, keyed out.
Logo: AirOne monogram plus wordmark family, favicon and head kit derived from it.
OG: distinct 1200x630 card per major route, same template, swapped subject.
Partner marks: real SVG marks from the simple-icons package, logos only, no captions.

## CTA inventory (bespoke chrome, no shared button class)
1. Search instrument submit "Find fares" — solid ultramarine block, mono kicker above
   the label, 1px inset, presses to -translate-y-0 with accent-deep fill.
2. Fare row "Hold this fare" — inline link, underline draws left to right on hover, a
   route arrow extends 4px.
3. Rail plate — no button: the whole plate lifts 1% scale and a corner arrow badge
   slides in from the plate edge.
4. Stay card "See stay" — hairline framed block that fills with ink on hover, label
   inverts to paper.
5. Banner and nav "Call the desk" — the phone number itself is the CTA, mono, oversized
   in the banner, with a rule that draws in under it. Same label in both places, one
   label per intent page-wide.
6. Contact submit "Send request" — full-width ink block with a mono state line beneath
   that swaps to a sending and sent state.

## Content facts (fictional brand, internally consistent, no invented social proof)
Head office: 401 N Michigan Ave, Suite 1200, Chicago, IL 60611.
Desk hours: 24 hours, 7 days. Email info@airone.ca. Phone +1 (942) 388-2017.
No performance or social-proof stats anywhere. Fares, durations, seat counts and
property rates are catalog data and are plausible and internally consistent.
