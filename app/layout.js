import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { Providers } from "./Provider";
import Header from "@/components/Header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Dev-Seeker",
  description: "An App that connect a devloper to a devloper",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <NextTopLoader />
        <Providers>
          <Toaster position="bottom-right" />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
