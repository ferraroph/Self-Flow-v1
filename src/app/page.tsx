import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, User, Brain, MessageCircle, Sparkles, Star } from 'lucide-react';
import { GradientHero, PulsingBorderShader } from '@/components/premium';

export default function HomePage() {
  return (
    <>
      {/* Premium Gradient Hero Section */}
      <GradientHero>
        <section className="px-6 text-center">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              <div className="space-y-8">
                <h1 className="text-7xl font-bold tracking-tight text-white">
                  Seu clone{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    numerológico
                  </span>
                </h1>
                <p className="text-2xl text-gray-300 leading-relaxed">
                  Converse com a versão mais clara de você mesmo, baseada em seu mapa numerológico cabalístico completo
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/flow">
                    <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Criar Meu Clone Digital
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/numerology">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10">
                      <Calculator className="w-5 h-5 mr-2" />
                      Ver Mapa Numerológico
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl scale-110" />
                  <PulsingBorderShader 
                    width="400px"
                    height="400px"
                    colors={["#8B5CF6", "#3B82F6", "#EC4899", "#06B6D4"]}
                    className="relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </GradientHero>
      
      {/* Content Section */}
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">{/* Value Proposition */}

          {/* Value Proposition */}
          <Card className="mb-8 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-gray-700 shadow-lg backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl mb-4">✨</div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Não é um chatbot genérico - é VOCÊ conversando consigo mesmo
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Sem filtros emocionais ou autossabotagem. Clareza cirúrgica baseada em ciência numerológica.
                </p>
                
                <Link href="/flow">
                  <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
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
            <Card className="text-center hover:shadow-lg transition-all bg-gray-900/50 border-gray-700 hover:border-blue-500/50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Calculator className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-lg text-white">Mapa Numerológico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  15+ números cabalísticos calculados com precisão matemática dupla
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all bg-gray-900/50 border-gray-700 hover:border-green-500/50">
              <CardHeader>
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <User className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-lg text-white">Perfil Comportamental</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Onboarding direcionado que mapeia como você pensa e age
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all bg-gray-900/50 border-gray-700 hover:border-purple-500/50">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-lg text-white">Agente Especializado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Escolha entre abordagens esotérica, psicológica ou híbrida
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all bg-gray-900/50 border-gray-700 hover:border-orange-500/50">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="w-6 h-6 text-orange-400" />
                </div>
                <CardTitle className="text-lg text-white">Clone Digital</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Conversação por voz ou texto com sua versão mais clara
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Multi-Dimensional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-blue-400">•</span>
                  <span className="text-gray-300">Numerologia cabalística tradicional</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-blue-400">•</span>
                  <span className="text-gray-300">Psicologia comportamental moderna</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-blue-400">•</span>
                  <span className="text-gray-300">Integração esotérica + científica</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Precisão Cirúrgica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-purple-400">•</span>
                  <span className="text-gray-300">Validação matemática dupla</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-purple-400">•</span>
                  <span className="text-gray-300">System prompts personalizados</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-purple-400">•</span>
                  <span className="text-gray-300">Insights baseados em padrões únicos</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Final */}
          <Card className="text-center bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Pronto para conversar com a versão mais clara de você?
              </h3>
              <p className="text-gray-300 mb-6">
                O processo completo leva apenas 10-15 minutos. Zero custos, máxima precisão.
              </p>
              
              <Link href="/flow">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Calculator className="w-5 h-5 mr-2" />
                  Começar Agora - É Gratuito
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Access to Numerology Only */}
          <div className="text-center mt-6">
            <Link href="/numerology" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
              Ou acesse apenas o mapa numerológico →
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}