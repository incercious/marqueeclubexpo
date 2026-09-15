import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fontBody } from "@/lib/theme";

export const metadata = {
  title: "Marquee — find your club",
  description: "A year-round, searchable directory of every club at our school.",
};

// This file wraps EVERY page. Anything you put here (the header,
// footer) shows up on every page automatically.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: fontBody, minHeight: "100vh" }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
