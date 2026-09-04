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

The contact form is rewired to Netlify Forms on the way out, so submissions
land in the Netlify dashboard with no backend of any kind. Off Netlify it
falls back to opening a prefilled email to the desk.
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

NETLIFY_FORM_ATTRS = (
    b'<form name="contact" method="POST" data-netlify="true" '
    b'netlify-honeypot="bot-field"'
)

NETLIFY_HIDDEN = (
    b'<input type="hidden" name="form-name" value="contact"/>'
    b'<p hidden><label>Leave this empty: <input name="bot-field"/></label></p>'
)

FORM_SCRIPT = """
<script>
/* Static bundle: there is no server function here, so the request form posts to
   Netlify Forms instead. Capture phase, because React's own submit handler
   would otherwise try to reach a Worker endpoint that does not exist on a
   static host. Falls back to emailing the desk if the post cannot go through
   (for example when the bundle is opened straight off disk). */
(function () {
  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form || !form.querySelector || !form.querySelector("#ao-message")) return;
    event.preventDefault();
    event.stopImmediatePropagation();

    var status = form.querySelector('[role="status"]');
    var button = form.querySelector('button[type="submit"]');
    var say = function (text) { if (status) status.textContent = text; };

    var val = function (name) {
      var el = form.querySelector('[name="' + name + '"]');
      return el && el.value ? el.value : "";
    };
    if (!val("name") || !val("email") || !val("message")) {
      say("Add your name, an email address and a line about the trip.");
      return;
    }

    say("Sending your request");
    if (button) button.disabled = true;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (response) {
        if (!response.ok) throw new Error("post failed");
        say("Request received. The desk will call you back.");
        if (button) button.textContent = "Request sent";
        form.reset();
      })
      .catch(function () {
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
        say("Opening your email client instead.");
        if (button) button.disabled = false;
        window.location.href =
          "mailto:info@airone.ca?subject=" +
          encodeURIComponent("Travel request from " + val("name")) +
          "&body=" + encodeURIComponent(lines.join("\\n"));
      });
  }, true);
})();
</script>
"""


def wire_netlify_form(html):
    """Turn the SSR contact form into a Netlify Forms form.

    Netlify detects forms by parsing the deployed HTML at deploy time, so the
    name, the data-netlify flag and the hidden form-name input all have to be
    present in the file on disk, not added later by script.
    """
    marker = html.find(b"<form")
    if marker == -1 or b'id="ao-message"' not in html:
        print("  warn   contact form not found, left untouched")
        return html
    close = html.index(b">", marker)
    html = html[:marker] + NETLIFY_FORM_ATTRS + html[marker + len(b"<form"):]
    close = html.index(b">", html.find(b"<form"))
    html = html[: close + 1] + NETLIFY_HIDDEN + html[close + 1 :]
    return html.replace(b"</body>", FORM_SCRIPT.encode() + b"</body>", 1)


NETLIFY_TOML = """# AirOne static bundle.
# Drop this folder on https://app.netlify.com/drop, or point a site at it.

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    X-Frame-Options = "SAMEORIGIN"

# Clean urls are already real directories, so no rewrites are needed. This only
# catches stray legacy links.
[[redirects]]
  from = "/index.html"
  to = "/"
  status = 301

[[redirects]]
  from = "/flights.html"
  to = "/flights"
  status = 301

[[redirects]]
  from = "/stays.html"
  to = "/stays"
  status = 301

[[redirects]]
  from = "/about.html"
  to = "/about"
  status = 301

[[redirects]]
  from = "/contact.html"
  to = "/contact"
  status = 301
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
            html = wire_netlify_form(html)
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

    total += save("netlify.toml", NETLIFY_TOML.encode())
    print("  file   /netlify.toml")

    print(f"\n{len(seen) + len(PAGES) + len(EXTRA) + 1} files, {total // 1024} KB -> {OUT}/")
    print("Deploy: drag the folder onto https://app.netlify.com/drop")
    print("Serve it with:  python3 -m http.server --directory", OUT)


if __name__ == "__main__":
    main()
