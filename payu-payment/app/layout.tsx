import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SigmaValue PayU Test",
  description: "SigmaValue PayU payment gateway test application"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
