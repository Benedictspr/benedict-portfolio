import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "../context/AdminContext";

export const metadata: Metadata = {
  title: "Benedict Adurosakin",
  description: "Licensed Registered Nurse, Software Engineer & Clinical Informaticist bridging clinical care, data systems, and software development.",
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
      <body className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased font-sans flex min-h-screen">
        <AdminProvider>
          <div className="hidden lg:block w-[20%] border-r border-zinc-200 dark:border-zinc-800"></div>
          <main className="w-full lg:w-[60%] border-x border-zinc-200 dark:border-zinc-800 flex flex-col min-h-screen">
            {children}
          </main>
          <div className="hidden lg:block w-[20%] border-l border-zinc-200 dark:border-zinc-800"></div>
        </AdminProvider>
      </body>
    </html>
  );
}
