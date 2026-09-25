import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "../context/AdminContext";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Benedict Adurosakin | Registered Nurse, Software Engineer & Clinical Informaticist",
  description: "Benedict Adurosakin is a licensed Registered Nurse and Software Engineer specializing in clinical informatics, healthcare workflow automation, and resilient software development.",
  keywords: ["Benedict Adurosakin", "Registered Nurse", "Software Engineer", "Clinical Informatics", "Kairos", "FHIR", "AI Automation", "Lagos Nigeria"],
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
      <body className="bg-[#0a0a0f] text-[#f8fafc] font-sans antialiased min-h-screen flex flex-col selection:bg-violet-500/30 selection:text-violet-200 relative overflow-x-hidden">
        {/* Jack Mkimbo Ambient Glow & Grid Backdrop */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-violet-600/[0.08] blur-[140px]"></div>
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-indigo-600/[0.06] blur-[120px]"></div>
          <div className="absolute inset-0 bg-grid-texture opacity-30"></div>
        </div>

        <AdminProvider>
          <Navbar />
          <div className="flex-grow w-full flex flex-col pt-16 md:pt-20">
            {children}
          </div>
        </AdminProvider>
      </body>
    </html>
  );
}
