import Providers from "@/shared/components/providers";
import "../style/globals.css";
import { Toaster } from "sonner";
import localFont from "next/font/local";

export const yekanBakh = localFont({
  src: [
    { path: "../../public/YekanBakh-regular.ttf", weight: "800" },
    { path: "../../public/YekanBakh-regular.ttf", weight: "700" },
    { path: "../../public/YekanBakh-Black.ttf", weight: "600" },
    { path: "../../public/YekanBakh-regular.ttf", weight: "400" },
  ],
  variable: "--yekan-font",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <link rel="icon" href="/brand/logo-icon.svg" />
      </head>
      <body
        className={`${yekanBakh.variable} flex flex-col font-display overflow-x-hidden`}
      >
        <main className="py-2 px-3">
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
