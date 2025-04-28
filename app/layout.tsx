import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "@/components/layout-client"
import Providers from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Paluwagan Management System",
  description: "A digital platform for managing informal savings groups",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  )
}
