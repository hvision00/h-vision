import './globals.css'
import { telegraf, poppins } from './fonts'
import { ToastProvider } from '../components/ui/Base/toast-provider'
import Navbar from '../components/Layout/Navbar'
import Footer from '../components/Layout/Footer/Footer'

export const metadata = {
  title: 'High Vision - Trasformiamo Visioni in Realtà',
  description: 'Guidiamo aziende innovative verso l\'eccellenza attraverso soluzioni digitali su misura, strategie vincenti e risultati concreti.',
  keywords: 'high vision, soluzioni digitali, consulenza, sviluppo web, innovazione',
  authors: [{ name: 'High Vision' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={`${telegraf.variable} ${poppins.variable} antialiased bg-[#fff]`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  )
}