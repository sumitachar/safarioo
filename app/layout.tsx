import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ReduxProvider } from "@/components/ReduxProvider";

export const metadata = {
  title: "Safarioo – Never Travel Alone",
  description: "Travel, connect, and explore together.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className="bg-background text-foreground font-sans">
        <ReduxProvider> 
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}