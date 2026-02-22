import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Startup Idea Generator",
  description: "Generate absurd startup ideas instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
