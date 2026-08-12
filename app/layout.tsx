import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Sigmavalue AI Agent Workspace | Skeleton R&D",
  description: "Starter skeleton template for AI agent development & R&D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-900 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
