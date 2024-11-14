import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import {
  Box,
  ColorModeScript,
  ThemeSchemeScript,
  UIProvider,
  createColorModeManager,
  createThemeSchemeManager,
} from "@yamada-ui/react";
import type React from "react";
import { Footer } from "~/components/Footer";
import { config, theme } from "~/theme";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const cookies = request.headers.get("Cookie");
  return { cookies };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/template-icon.svg",
      type: "image/svg+xml",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { cookies } = useLoaderData<typeof loader>();
  const colorModeManager = createColorModeManager("ssr", cookies ?? undefined);
  const themeSchemeManager = createThemeSchemeManager("ssr", cookies ?? undefined);

  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning={true}>
        <ColorModeScript type="cookie" nonce="testing" initialColorMode={config.initialColorMode} />
        <ThemeSchemeScript type="cookie" nonce="testing" initialThemeScheme={config.initialThemeScheme} />
        <UIProvider
          colorModeManager={colorModeManager}
          config={config}
          theme={theme}
          themeSchemeManager={themeSchemeManager}
        >
          <Box minHeight="100vh" pos="relative" pb="30vh" boxSizing="border-box">
            {children}
            <Footer />
          </Box>
        </UIProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
