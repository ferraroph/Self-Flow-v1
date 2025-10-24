import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Self Flow</h1>
        <Link href="/sign-in">
          <Button variant="outline">Sign In</Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center text-center p-6">
        <Sparkles className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-5xl font-bold mb-4">
          Converse com a versão mais clara de você mesmo.
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Self Flow é um clone digital multi-dimensional baseado em seu mapa numerológico cabalístico e perfil comportamental. Tenha clareza e insights sobre sua vida, carreira e relacionamentos.
        </p>
        <Link href="/sign-up">
          <Button size="lg">
            Criar Meu Clone Digital
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </main>

      <footer className="p-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Self Flow. All rights reserved.</p>
      </footer>
    </div>
  );
}
