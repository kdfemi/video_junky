import type { Metadata } from "next";
import "./globals.css";
import type { Viewport } from 'next'
import { classes } from "src/common/helper";
import { inter, roboto } from "./fonts";


export const metadata: Metadata = {
  title: "Junky Video",
  description: "Watch great videos",
};

export const viewport: Viewport = {
  themeColor: '#111111',
  initialScale: 1,
  width: 'device-width'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classes(inter.variable, roboto.variable, 'bg-primary text-white')}>{children}</body>
    </html>
  );
}
