import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "../context/AdminContext";
import { TourProvider } from "../context/TourContext";
import Navbar from "../components/Navbar";
import GuidedTour from "../components/GuidedTour";

export const metadata: Metadata = {
  title: "Benedict Adurosakin — Clinical Informaticist, Software Engineer & Registered Nurse",
  description: "Benedict Adurosakin bridges high-acuity bedside nursing, clinical informatics, and resilient software engineering to solve high-friction realities in healthcare.",
  keywords: [
    "Benedict Adurosakin",
    "Registered Nurse",
    "Software Engineer",
    "Clinical Informatics",
    "Kairos Scripture Engine",
    "FHIR",
    "AI Emergency Triage",
    "Healthcare Automation",
    "Lagos Nigeria"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col selection:bg-[#FF4A2B]/20 selection:text-[#FF4A2B] relative overflow-x-hidden">
        <AdminProvider>
          <TourProvider>
            {/* Main Navigation */}
            <Navbar />
            
            {/* Main Viewport Content */}
            <main className="flex-grow w-full flex flex-col">
              {children}
            </main>

            {/* Global Interactive Guided Tour Concierge */}
            <GuidedTour />
          </TourProvider>
        </AdminProvider>
      </body>
    </html>
  );
}

