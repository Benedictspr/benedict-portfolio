import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "../context/AdminContext";
import Ticker from "../components/Ticker";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Benedict Adurosakin — Registered Nurse, Software Engineer & Informaticist",
  description: "Licensed Registered Nurse, Software Engineer & Clinical Informaticist bridging clinical bedside care, healthcare data architectures, and software engineering.",
  keywords: ["Benedict Adurosakin", "Clinical Informatics", "Registered Nurse", "Software Engineer", "Kairos", "FHIR", "Python", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="bg-[#0D1117] text-[#F6F4F1] antialiased font-sans min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        <AdminProvider>
          <Ticker />
          <Navbar />
          <div className="flex-grow w-full flex flex-col">
            {children}
          </div>
        </AdminProvider>
      </body>
    </html>
  );
}
