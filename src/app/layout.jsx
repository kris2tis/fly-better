import Providers from "@/shared/components/providers";
import "../style/globals.css";
import { Toaster } from "sonner";
import localFont from "next/font/local";

export const yekanBakh = localFont({
  src: [
    { path: "../../public/YekanBakh-Regular.ttf", weight: "300" },
    { path: "../../public/YekanBakh-Black.ttf", weight: "700" },
    { path: "../../public/YekanBakh-Bold.ttf", weight: "600" },
  ],
  variable: "--yekan-font",
});

export const metadata = {
  title: "فلای بتر",
  description: "جستجو و خرید آسان بلیط هواپیما — Fly Betteer. پروازها، رزروها و مدیریت حساب کاربری شما.",
  icons: "/brand/logo-icon.svg",
  openGraph: {
    title: "Fly Betteer — خرید بلیط هواپیما",
    description: "جستجو و خرید آسان بلیط هواپیما — Fly Betteer.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <link rel="icon" href="/brand/favicon.svg" />
      </head>
      <body
        className={`${yekanBakh.variable} flex flex-col font-display overflow-x-hidden`}
      >
        <main className="pb-2 px-3">
          <Providers>{children}</Providers>
          <Toaster
            style={{ fontFamily: "inherit" }}
            position="top-center"
            className="toaster"
            toastOptions={{
              classNames: { success: "succes-toast", error: "error-toast" },
            }}
          />
        </main>
      </body>
    </html>
  );
}
