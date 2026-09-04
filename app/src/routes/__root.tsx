import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
import appMetaJson from "../app-meta.json";
import { AGENCY } from "../lib/site-data";
import { MotionFlag, SiteFooter, SiteHeader } from "../components/airone/chrome";
import { AirOneMark } from "../components/airone/marks";

declare const __HF_DESIGN_INSPECTOR__: boolean;

const DEFAULT_TITLE = "AirOne | Last minute flights and stays across North America";
const DEFAULT_DESCRIPTION =
  "AirOne is a Chicago travel desk booking discounted last minute flights and stays across North America.";

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;

const APP_HOST_ZONES = ["higgsfield.app", "higgsfield-dev.app"];

function toOwnAssetUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/")) return value;
  try {
    const u = new URL(value);
    const isAppHost = APP_HOST_ZONES.some(
      (zone) => u.hostname === zone || u.hostname.endsWith(`.${zone}`),
    );
    if (isAppHost) return u.pathname + u.search;
    return value;
  } catch {
    return value;
  }
}

function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? DEFAULT_TITLE;
  const description = meta.og_description ?? DEFAULT_DESCRIPTION;
  const ogImage = toOwnAssetUrl(meta.og_image_url);
  const favicon = toOwnAssetUrl(meta.favicon_url);
  const ogVideo = toOwnAssetUrl(meta.og_video_url);

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: AGENCY.legalName },
      { name: "theme-color", content: "#edf0f2" },
      { property: "og:site_name", content: AGENCY.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:alt", content: `${AGENCY.name}, ${AGENCY.tagline}` },
            { name: "twitter:image", content: ogImage },
          ]
        : []),
      ...(ogVideo ? [{ property: "og:video", content: ogVideo }] : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap",
      },
      ...(favicon ? [{ rel: "icon", href: favicon, type: "image/svg+xml" }] : []),
      { rel: "alternate icon", href: "/assets/favicon-32.png", sizes: "32x32" },
      { rel: "alternate icon", href: "/assets/favicon-16.png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/assets/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  };
}

function NotFoundComponent() {
  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-col items-start gap-7 px-5 py-28 md:px-8">
      <img
        src="/assets/state-empty-board.jpg"
        alt="An empty departure board"
        className="w-full border border-line"
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
        Nothing on this board
      </span>
      <h1 className="text-4xl font-semibold leading-[1.05] tracking-tighter md:text-5xl">
        That page is not scheduled.
      </h1>
      <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
        The link may be old, or the fare it pointed at has already been ticketed. The
        desk can find you something else.
      </p>
      <div className="flex flex-wrap items-center gap-6">
        <a
          href="/"
          className="border border-ink px-6 py-3 text-[13px] font-semibold tracking-tight text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
        >
          Back to the home page
        </a>
        <a href={AGENCY.phoneHref} className="font-mono text-[14px] text-accent">
          {AGENCY.phone}
        </a>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportHiggsfieldError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-[640px] flex-col items-start gap-6 px-5 py-28 md:px-8">
      <AirOneMark className="h-9 w-9" />
      <h1 className="text-3xl font-semibold leading-tight tracking-tighter md:text-4xl">
        This page did not load.
      </h1>
      <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
        Something went wrong at our end. Try again, or call the desk and we will take
        the request over the phone.
      </p>
      <div className="flex flex-wrap items-center gap-6">
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="bg-ink px-6 py-3 text-[13px] font-semibold tracking-tight text-paper transition-colors duration-200 hover:bg-accent"
        >
          Try again
        </button>
        <a href={AGENCY.phoneHref} className="font-mono text-[14px] text-accent">
          {AGENCY.phone}
        </a>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-paper font-display text-ink antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) {
      return;
    }

    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => {
        installHiggsfieldDesignInspector();
      })
      .catch((error) => {
        reportHiggsfieldError(
          error instanceof Error ? error : new Error("Failed to load design inspector"),
          { boundary: "higgsfield_design_inspector_import" },
        );
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionFlag />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <SiteHeader active={pathname} />
      <main id="main">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
