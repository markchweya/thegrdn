import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteNav } from "@/components/grdn/SiteNav";
import { SiteFooter } from "@/components/grdn/SiteFooter";
import { GradientBlobs } from "@/components/grdn/GradientBlobs";
import { CustomCursor } from "@/components/grdn/CustomCursor";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center relative z-10">
        <h1 className="font-display text-8xl grdn-gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-display uppercase tracking-wider">Lost in the garden</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This path doesn't lead anywhere we know. Try the home gate.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-display text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Back to THE GRDN
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl uppercase">Something tripped</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The signal dropped. Try again.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-5 py-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-5 py-2 border border-border font-mono text-xs uppercase tracking-widest"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "THE GRDN" },
      {
        name: "description",
        content:
          "THE GRDN by The Garden Ke. Curated nights, ticket drops, living memories.",
      },
      { name: "author", content: "The Garden Ke" },
      { name: "theme-color", content: "#0a0a0c" },
      { property: "og:title", content: "THE GRDN" },
      {
        property: "og:description",
        content: "Curated nights, ticket drops, living memories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@thegardenke" },
      { name: "twitter:title", content: "THE GRDN" },
      { name: "twitter:description", content: "THE GRDN by The Garden Ke. Curated nights, ticket drops, living memories." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <GradientBlobs />
      <div className="relative z-10 min-h-screen flex flex-col">
        <SiteNav />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
