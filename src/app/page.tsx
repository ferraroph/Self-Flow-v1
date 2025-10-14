import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, User, Brain, MessageCircle, Sparkles, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Self Flow
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Converse com a versão mais clara de você mesmo
          </p>
          <p className="text-lg text-muted-foreground/80">
            Clone digital personalizado baseado em mapeamento numerológico cabalístico + perfil comportamental
          </p>
        </div>

        {/* Value Proposition */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl mb-4">✨</div>
              <h2 className="text-2xl font-bold mb-4">
                Não é um chatbot genérico - é VOCÊ conversando consigo mesmo
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Sem filtros emocionais ou autossabotagem. Clareza cirúrgica baseada em ciência numerológica.
              </p>
              
              <Link href="/flow">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Criar Meu Clone Digital
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Process Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Mapa Numerológico</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                15+ números cabalísticos calculados com precisão matemática dupla
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Perfil Comportamental</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Onboarding direcionado que mapeia como você pensa e age
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Agente Especializado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Escolha entre abordagens esotérica, psicológica ou híbrida
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <MessageCircle className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Clone Digital</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Conversação por voz ou texto com sua versão mais clara
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Multi-Dimensional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">•</span>
                <span>Numerologia cabalística tradicional</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">•</span>
                <span>Psicologia comportamental moderna</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">•</span>
                <span>Integração esotérica + científica</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Precisão Cirúrgica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">•</span>
                <span>Validação matemática dupla</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">•</span>
                <span>System prompts personalizados</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">•</span>
                <span>Insights baseados em padrões únicos</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Final */}
        <Card className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="pt-8 pb-8">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para conversar com a versão mais clara de você?
            </h3>
            <p className="text-muted-foreground mb-6">
              O processo completo leva apenas 10-15 minutos. Zero custos, máxima precisão.
            </p>
            
            <Link href="/flow">
              <Button size="lg" className="text-lg px-8 py-6">
                <Calculator className="w-5 h-5 mr-2" />
                Começar Agora - É Gratuito
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Access to Numerology Only */}
        <div className="text-center mt-6">
          <Link href="/numerology" className="text-sm text-muted-foreground hover:text-primary">
            Ou acesse apenas o mapa numerológico →
          </Link>
        </div>

      </div>
    </div>
  );
}