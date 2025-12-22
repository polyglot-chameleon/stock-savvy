import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SearchPanel from "./search/SearchPanel";
import Dashboard from "./dashboard/Dashboard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stock Savvy",
  description: "Your next gen stock analysis platform",
};

export default function Home({}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="grid sm:grid-cols-1 md:grid-cols-[max-content_0.85fr] p-3 mb-5">
          <h1 className="text-3xl font-semibold  text-black ">Stock Savvy</h1>
          <SearchPanel />
        </header>

        <Dashboard />
      </body>
    </html>
  );
}
