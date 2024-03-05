import type { Metadata } from "next";
import { Providers } from './components/Providers'
import { TheHeader } from './components/TheHeader/TheHeader'
import "./styles/main.css";

export const metadata: Metadata = {
  title: "Test page for Abz.agency",
  description: "My page for Abz.agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex,nofollow" />
      </head>
      <body>
        <Providers>
          <TheHeader />
          <main className="main">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
