import type { Metadata } from "next";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { ToastProvider } from "@/components/notifications/ToastProvider";

export const metadata: Metadata = {
  title: "MSFS Pilot Portal",
  description: "Aviation dispatch and pilot portal for Microsoft Flight Simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-aviation-dark antialiased">
        <ToastProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}
