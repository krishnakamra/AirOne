#!/usr/bin/env python3
"""
Mirror the deployed AirOne site into a portable static bundle.

Produces clean-URL directories (flights/index.html, stays/index.html, ...) so
the result drops onto any ordinary static host (Netlify, Vercel, S3 plus
CloudFront, nginx, Apache, GitHub Pages) with no rewrite rules and no server.

    python3 scripts/export-static.py
    AIRONE_ORIGIN=https://airone.ca AIRONE_OUT=dist-static python3 scripts/export-static.py

What carries over: every page, the compiled CSS, the client bundle (so the
mobile menu, the fare and city filters and the destination rail all still
work), and every generated image.

What does not: the contact form posts to a server function that only exists on
the Worker. On the static bundle the form falls back to opening a prefilled
email to the desk. Point it at a real form endpoint when you have one.
"""
import os
import pathlib
import re
import sys
import urllib.parse
import urllib.request

ORIGIN = os.environ.get("AIRONE_ORIGIN", "https://airone-travel.higgsfield.app").rstrip("/")
OUT = pathlib.Path(os.environ.get("AIRONE_OUT", "static"))
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/131.0 Safari/537.36")

PAGES = ["/", "/flights", "/stays", "/about", "/contact"]
EXTRA = ["/robots.txt", "/sitemap.xml", "/site.webmanifest"]

REF = re.compile(
    rb"""["'(](/(?:[A-Za-z0-9_\-./@]+)\.(?:js|mjs|css|jpg|jpeg|png|svg|webp|avif|ico|woff2?|json))["')]"""
)

MAILTO_FALLBACK = """
<script>
/* Static bundle: no server function to post to, so the request form opens a
   prefilled email to the desk instead. Capture phase so this runs before the
   React handler that would otherwise try to reach the Worker. */
(function () {
  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form || !form.querySelector || !form.querySelector("#ao-message")) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    var val = function (name) {
      var el = form.querySelector('[name="' + name + '"]');
      return el && el.value ? el.value : "";
    };
    var lines = [
      "Name: " + val("name"),
      "Email: " + val("email"),
      "Phone: " + val("phone"),
      "Travelers: " + val("travelers"),
      "Where to: " + val("destination"),
      "When: " + val("window"),
      "Reference: " + val("reference"),
      "",
      val("message")
    ];
    window.location.href =
      "mailto:info@airone.ca?subject=" +
      encodeURIComponent("Travel request from " + (val("name") || "the website")) +
      "&body=" + encodeURIComponent(lines.join("\\n"));
  }, true);
})();
</script>
"""


def fetch(path):
    url = ORIGIN + path
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=90) as response:
        return response.read()


def save(rel, data):
    target = OUT / rel.lstrip("/")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data)
    return len(data)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    queue, seen, total = set(), set(), 0

    for page in PAGES:
        html = fetch(page)
        queue.update(m.group(1).decode() for m in REF.finditer(html))
        if page == "/contact":
            html = html.replace(b"</body>", MAILTO_FALLBACK.encode() + b"</body>", 1)
        rel = "index.html" if page == "/" else page.strip("/") + "/index.html"
        total += save(rel, html)
        print(f"  page   {page:<10} -> {rel}")

    for path in EXTRA:
        try:
            total += save(path, fetch(path))
            print(f"  file   {path}")
        except Exception as exc:                      # noqa: BLE001
            print(f"  skip   {path} ({exc})", file=sys.stderr)

    # Walk the reference graph: scripts and stylesheets pull in further chunks.
    while queue:
        path = urllib.parse.urlparse(queue.pop()).path
        if path in seen:
            continue
        seen.add(path)
        try:
            body = fetch(path)
        except Exception as exc:                      # noqa: BLE001
            print(f"  skip   {path} ({exc})", file=sys.stderr)
            continue
        total += save(path, body)
        if path.endswith((".js", ".mjs", ".css")):
            queue.update(
                m.group(1).decode() for m in REF.finditer(body)
                if m.group(1).decode() not in seen
            )

    print(f"\n{len(seen) + len(PAGES) + len(EXTRA)} files, {total // 1024} KB -> {OUT}/")
    print("Serve it with:  python3 -m http.server --directory", OUT)


if __name__ == "__main__":
    main()
