import type { Metadata } from 'next'
import { Syne, Space_Mono } from 'next/font/google'
import 'lenis/dist/lenis.css'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
})

const description =
  'System Analyst at PT Pusaka Nagara. Business analysis, system analysis, and full-stack development.'

export const metadata: Metadata = {
  title: 'Ahmad Showi — System Analyst',
  description,
  openGraph: {
    title: 'Ahmad Showi — System Analyst',
    description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before paint so returning visitors never see a flash of the intro */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('intro-seen')==='1')document.documentElement.dataset.introSeen='1'}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
