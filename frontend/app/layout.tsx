import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "School Management System",
  description: "Full-Stack School Management System",
  icons: "/favicon.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
