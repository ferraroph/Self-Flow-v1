import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Self Flow - Converse com a versão mais clara de você mesmo',
  description: 'Clone Digital Multi-Dimensional baseado em mapeamento numerológico cabalístico + perfil comportamental',
  keywords: ['numerologia', 'autoconhecimento', 'IA', 'clone digital', 'cabalá', 'conversa'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" 
            rel="stylesheet" 
          />
        </head>
        <body className="font-sans antialiased">
          <div id="root">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  )
}
