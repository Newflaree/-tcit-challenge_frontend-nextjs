import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { AppLayout } from "@/posts/presentation/layouts/AppLayout";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TCIT · Posts",
  description:
    "Demo full-stack de un muro de posts: crea, filtra y elimina publicaciones al instante, sin recargar la página. Next.js + Redux + TanStack Query sobre una API NestJS + PostgreSQL.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
