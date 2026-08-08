import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Interview IQ | AI Assessment Platform",
  description: "Practice explaining the systems you built during the 31-day AI Cohort with real-time AI interviewers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#F8FAFC]">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#0F172A] antialiased">
        <main className="flex-1 w-full min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
