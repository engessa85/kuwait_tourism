import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuwait Tourism | Where Tradition Meets Tomorrow",
  description: "Official guide for exploring the hidden gems of the Gulf.",
};

import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-foreground">
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
