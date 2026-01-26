import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ReduxProvider } from "@/components/ReduxProvider";
import AuthInitializer from "@/components/AuthInitializer"; 
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Safarioo – Never Travel Alone",
  description: "Travel, connect, and explore together.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className="bg-background text-foreground font-sans">
        <ReduxProvider> 
          <AuthInitializer>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="grow">
                  {children}
                  <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
                </main>
                <Footer />
              </div>
            </ThemeProvider>
          </AuthInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}