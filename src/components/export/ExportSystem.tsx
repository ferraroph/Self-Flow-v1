'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  FileText, 
  Image, 
  Share2, 
  Copy, 
  Check,
  Settings,
  Printer,
  Mail,
  ExternalLink,
  Calendar,
  User,
  Star,
  Heart,
  Brain,
  Eye,
  Sparkles
} from 'lucide-react';

import type { NumerologyMap } from '@/lib/numerology/calculator';
import type { PersonalityProfile, AgentType } from '@/lib/agents/base';

interface ExportSystemProps {
  numerologyMap: NumerologyMap;
  personalityProfile: PersonalityProfile;
  selectedAgent: AgentType;
  userName: string;
  userBirthDate: Date;
  conversationInsights?: string[];
  meditationSessions?: any[];
  devaneioScenarios?: any[];
  onExportComplete?: (format: ExportFormat, success: boolean) => void;
}

type ExportFormat = 'pdf' | 'markdown' | 'image' | 'json' | 'csv';

interface ExportOptions {
  includePersonalInfo: boolean;
  includeNumerologyMap: boolean;
  includeInterpretations: boolean;
  includeInsights: boolean;
  includeMeditationHistory: boolean;
  includeDevaneioScenarios: boolean;
  includeVisualMap: boolean;
  format: ExportFormat;
  template: 'complete' | 'summary' | 'business' | 'personal';
}

const ExportSystem: React.FC<ExportSystemProps> = ({
  numerologyMap,
  personalityProfile,
  selectedAgent,
  userName,
  userBirthDate,
  conversationInsights = [],
  meditationSessions = [],
  devaneioScenarios = [],
  onExportComplete
}) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    includePersonalInfo: true,
    includeNumerologyMap: true,
    includeInterpretations: true,
    includeInsights: true,
    includeMeditationHistory: false,
    includeDevaneioScenarios: false,
    includeVisualMap: true,
    format: 'pdf',
    template: 'complete'
  });

  const [isExporting, setIsExporting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Gerar markdown do mapa numerológico
  const generateMarkdown = (): string => {
    const date = new Date().toLocaleDateString('pt-BR');
    const birthDateStr = userBirthDate.toLocaleDateString('pt-BR');
    
    let markdown = `# Mapa Numerológico Cabalístico - ${userName}\n\n`;
    
    if (exportOptions.includePersonalInfo) {
      markdown += `**Data de Nascimento:** ${birthDateStr}\n`;
      markdown += `**Data do Relatório:** ${date}\n`;
      markdown += `**Agente Selecionado:** ${selectedAgent}\n\n`;
    }
    
    markdown += `---\n\n`;
    
    if (exportOptions.includeNumerologyMap) {
      markdown += `## 🔢 Números Principais\n\n`;
      markdown += `### Números de Personalidade\n`;
      markdown += `- **Motivação (Vogais):** ${numerologyMap.motivacao} - Seus desejos internos e aspirações profundas\n`;
      markdown += `- **Impressão (Consoantes):** ${numerologyMap.impressao} - Primeira impressão que causa nos outros\n`;
      markdown += `- **Expressão (Nome Completo):** ${numerologyMap.expressao} - Talentos naturais e forma de se expressar\n\n`;
      
      markdown += `### Números de Destino e Realização\n`;
      markdown += `- **Destino:** ${numerologyMap.destino} - Missão de vida e propósito maior\n`;
      markdown += `- **Harmônico Superior:** ${numerologyMap.harmonicoSuperior} - Integração de talentos e propósito\n\n`;
      
      markdown += `### Desafios e Crescimento\n`;
      markdown += `- **Desafio Menor:** ${numerologyMap.desafioMenor} - Primeiro obstáculo a superar\n`;
      markdown += `- **Desafio Maior:** ${numerologyMap.desafioMaior} - Desafio principal da vida\n`;
      
      if (numerologyMap.licoesCarmicas.length > 0) {
        markdown += `- **Lições Cármicas:** ${numerologyMap.licoesCarmicas.join(', ')} - Qualidades a desenvolver\n`;
      }
      
      if (numerologyMap.tendenciasOcultas.length > 0) {
        markdown += `- **Tendências Ocultas:** ${numerologyMap.tendenciasOcultas.join(', ')} - Características intensificadas\n`;
      }
      
      markdown += `\n### Realizações por Fase da Vida\n`;
      markdown += `- **1ª Realização (0-30 anos):** ${numerologyMap.realizacao1}\n`;
      markdown += `- **2ª Realização (30-50 anos):** ${numerologyMap.realizacao2}\n`;
      markdown += `- **3ª Realização (50+ anos):** ${numerologyMap.realizacao3}\n`;
      markdown += `- **Realização Final:** ${numerologyMap.realizacaoFinal} - Realização máxima possível\n\n`;
      
      markdown += `### Ciclos Atuais\n`;
      markdown += `- **Ano Universal:** ${numerologyMap.anoUniversal} - Energia coletiva do ano\n`;
      markdown += `- **Ano Pessoal:** ${numerologyMap.anoPessoal} - Seu ciclo pessoal de 9 anos\n\n`;
    }
    
    if (exportOptions.includeInterpretations) {
      markdown += `## 📖 Interpretações Detalhadas\n\n`;
      markdown += `### Destino ${numerologyMap.destino}\n`;
      markdown += getDestinoInterpretation(numerologyMap.destino) + '\n\n';
      
      markdown += `### Ano Pessoal ${numerologyMap.anoPessoal}\n`;
      markdown += getAnoPessoalInterpretation(numerologyMap.anoPessoal) + '\n\n';
      
      if (numerologyMap.licoesCarmicas.length > 0) {
        markdown += `### Lições Cármicas\n`;
        numerologyMap.licoesCarmicas.forEach(licao => {
          markdown += `**Lição ${licao}:** ${getLicaoCarmica(licao)}\n\n`;
        });
      }
    }
    
    if (exportOptions.includeInsights && conversationInsights.length > 0) {
      markdown += `## 💡 Insights Personalizados\n\n`;
      conversationInsights.forEach((insight, index) => {
        markdown += `${index + 1}. ${insight}\n`;
      });
      markdown += `\n`;
    }
    
    if (exportOptions.includeMeditationHistory && meditationSessions.length > 0) {
      markdown += `## 🧘 Histórico de Meditações\n\n`;
      markdown += `Total de sessões: ${meditationSessions.length}\n\n`;
      // Aqui você adicionaria detalhes das sessões de meditação
    }
    
    if (exportOptions.includeDevaneioScenarios && devaneioScenarios.length > 0) {
      markdown += `## 🌟 Cenários Explorados\n\n`;
      markdown += `Total de cenários: ${devaneioScenarios.length}\n\n`;
      // Aqui você adicionaria detalhes dos cenários
    }
    
    markdown += `---\n\n`;
    markdown += `*Relatório gerado pelo Self Flow - Conversacional Multi-Dimensional*\n`;
    markdown += `*${date}*\n`;
    
    return markdown;
  };

  // Interpretações simplificadas (você pode expandir)
  const getDestinoInterpretation = (destino: number): string => {
    const interpretations: { [key: number]: string } = {
      1: 'Líder natural, pioneiro e independente. Sua missão é abrir novos caminhos e inspirar outros com sua coragem e determinação.',
      2: 'Diplomata e cooperador. Sua missão é trazer harmonia e equilíbrio, ajudando outros através da paciência e sensibilidade.',
      3: 'Criativo e comunicativo. Sua missão é expressar sua criatividade e inspirar alegria nos outros através da arte e comunicação.',
      4: 'Construtor e organizador. Sua missão é estabelecer bases sólidas e criar estruturas duradouras através do trabalho dedicado.',
      5: 'Aventureiro e livre. Sua missão é explorar e experimentar, trazendo mudança e progresso através da versatilidade.',
      6: 'Cuidador e responsável. Sua missão é nutrir e proteger, criando harmonia no lar e na comunidade.',
      7: 'Buscador da verdade. Sua missão é encontrar sabedoria profunda através da análise, intuição e conexão espiritual.',
      8: 'Realizador material. Sua missão é alcançar sucesso no mundo material enquanto desenvolve sabedoria sobre poder.',
      9: 'Humanitário e sábio. Sua missão é servir a humanidade através da compaixão e sabedoria universal.',
      11: 'Inspirador espiritual. Missão de elevar a consciência coletiva através da intuição e inspiração.',
      22: 'Construtor mestre. Missão de materializar grandes visões que beneficiem a humanidade.',
      33: 'Professor mestre. Missão de ensinar e curar através do amor incondicional e serviço compassivo.'
    };
    
    return interpretations[destino] || 'Interpretação não disponível.';
  };

  const getAnoPessoalInterpretation = (ano: number): string => {
    const interpretations: { [key: number]: string } = {
      1: 'Ano de novos começos, liderança e independência. Tempo de iniciar projetos e tomar iniciativas.',
      2: 'Ano de cooperação, paciência e parcerias. Foque em colaboração e desenvolvimento de relacionamentos.',
      3: 'Ano de criatividade, comunicação e expressão. Tempo de se expressar artisticamente e socialmente.',
      4: 'Ano de trabalho duro, organização e construção. Estabeleça bases sólidas para o futuro.',
      5: 'Ano de mudanças, aventuras e liberdade. Tempo de explorar novas experiências.',
      6: 'Ano de responsabilidade, família e cuidado. Foque no lar e nas pessoas queridas.',
      7: 'Ano de reflexão, estudos e crescimento espiritual. Tempo para introspecção e desenvolvimento interior.',
      8: 'Ano de realizações materiais e reconhecimento. Tempo de colher os frutos do trabalho.',
      9: 'Ano de finalização, desapego e serviço humanitário. Tempo de concluir ciclos e servir outros.'
    };
    
    return interpretations[ano] || 'Interpretação não disponível.';
  };

  const getLicaoCarmica = (numero: number): string => {
    const licoes: { [key: number]: string } = {
      1: 'Desenvolver liderança, iniciativa e independência.',
      2: 'Aprender cooperação, paciência e diplomacia.',
      3: 'Cultivar criatividade, comunicação e expressão.',
      4: 'Desenvolver disciplina, organização e persistência.',
      5: 'Aprender sobre liberdade responsável e mudança.',
      6: 'Desenvolver senso de responsabilidade e cuidado.',
      7: 'Cultivar fé, intuição e sabedoria interior.',
      8: 'Aprender sobre poder, materialidade e organização.',
      9: 'Desenvolver compaixão, generosidade e visão universal.'
    };
    
    return licoes[numero] || 'Lição não especificada.';
  };

  // Gerar JSON estruturado
  const generateJSON = (): string => {
    const data = {
      userInfo: exportOptions.includePersonalInfo ? {
        name: userName,
        birthDate: userBirthDate.toISOString(),
        agent: selectedAgent,
        reportDate: new Date().toISOString()
      } : null,
      
      numerologyMap: exportOptions.includeNumerologyMap ? numerologyMap : null,
      
      insights: exportOptions.includeInsights ? conversationInsights : null,
      
      meditationSessions: exportOptions.includeMeditationHistory ? meditationSessions : null,
      
      devaneioScenarios: exportOptions.includeDevaneioScenarios ? devaneioScenarios : null,
      
      metadata: {
        template: exportOptions.template,
        generatedBy: 'Self Flow',
        version: '1.0'
      }
    };
    
    return JSON.stringify(data, null, 2);
  };

  // Simular geração de PDF (na implementação real usaria biblioteca como jsPDF ou Puppeteer)
  const generatePDF = async (): Promise<void> => {
    // Por enquanto, vamos usar o markdown e simular a conversão
    const markdownContent = generateMarkdown();
    
    // Aqui você implementaria a conversão real para PDF
    // Por exemplo: usando jsPDF, Puppeteer, ou enviando para um serviço backend
    
    console.log('PDF Content (simulado):', markdownContent);
    
    // Simular download
    const blob = new Blob([markdownContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mapa-numerologico-${userName.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      let content = '';
      let fileName = `mapa-numerologico-${userName.replace(/\s+/g, '-').toLowerCase()}`;
      let mimeType = '';
      
      switch (exportOptions.format) {
        case 'markdown':
          content = generateMarkdown();
          fileName += '.md';
          mimeType = 'text/markdown';
          break;
          
        case 'json':
          content = generateJSON();
          fileName += '.json';
          mimeType = 'application/json';
          break;
          
        case 'pdf':
          await generatePDF();
          onExportComplete?.(exportOptions.format, true);
          return;
          
        default:
          content = generateMarkdown();
          fileName += '.txt';
          mimeType = 'text/plain';
      }
      
      // Download do arquivo
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      onExportComplete?.(exportOptions.format, true);
      
    } catch (error) {
      console.error('Erro ao exportar:', error);
      onExportComplete?.(exportOptions.format, false);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    const content = exportOptions.format === 'json' ? generateJSON() : generateMarkdown();
    
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const generateShareableUrl = () => {
    // Na implementação real, isso enviaria os dados para um serviço e retornaria uma URL
    const shareId = Math.random().toString(36).substring(7);
    const url = `https://selfflow.app/shared/${shareId}`;
    setShareUrl(url);
    return url;
  };

  const getFormatIcon = (format: ExportFormat) => {
    switch (format) {
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'markdown': return <FileText className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'json': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTemplateBadgeColor = (template: string) => {
    switch (template) {
      case 'complete': return 'bg-blue-100 text-blue-800';
      case 'summary': return 'bg-green-100 text-green-800';
      case 'business': return 'bg-purple-100 text-purple-800';
      case 'personal': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Sistema de Exportação
          </CardTitle>
          <p className="text-muted-foreground">
            Exporte seu mapa numerológico e insights em diferentes formatos
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Seleção de Template */}
          <div>
            <h3 className="font-medium mb-3">Modelo do Relatório</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'complete', name: 'Completo', desc: 'Tudo incluído' },
                { id: 'summary', name: 'Resumo', desc: 'Apenas essencial' },
                { id: 'business', name: 'Profissional', desc: 'Foco em carreira' },
                { id: 'personal', name: 'Pessoal', desc: 'Foco em crescimento' }
              ].map(template => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all ${
                    exportOptions.template === template.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setExportOptions(prev => ({ ...prev, template: template.id as any }))}
                >
                  <CardContent className="pt-3 pb-3">
                    <div className="text-sm font-medium">{template.name}</div>
                    <div className="text-xs text-muted-foreground">{template.desc}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Opções de Conteúdo */}
          <div>
            <h3 className="font-medium mb-3">Conteúdo a Incluir</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'includePersonalInfo', label: 'Informações Pessoais', icon: <User className="w-4 h-4" /> },
                { key: 'includeNumerologyMap', label: 'Mapa Numerológico', icon: <Star className="w-4 h-4" /> },
                { key: 'includeInterpretations', label: 'Interpretações Detalhadas', icon: <Brain className="w-4 h-4" /> },
                { key: 'includeInsights', label: 'Insights Personalizados', icon: <Eye className="w-4 h-4" /> },
                { key: 'includeMeditationHistory', label: 'Histórico de Meditações', icon: <Heart className="w-4 h-4" /> },
                { key: 'includeDevaneioScenarios', label: 'Cenários Explorados', icon: <Sparkles className="w-4 h-4" /> }
              ].map(option => (
                <label key={option.key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions[option.key as keyof ExportOptions] as boolean}
                    onChange={(e) => setExportOptions(prev => ({
                      ...prev,
                      [option.key]: e.target.checked
                    }))}
                    className="rounded"
                  />
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <span className="text-sm">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          {/* Formato de Export */}
          <div>
            <h3 className="font-medium mb-3">Formato</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'pdf', name: 'PDF', desc: 'Documento portátil' },
                { id: 'markdown', name: 'Markdown', desc: 'Texto estruturado' },
                { id: 'json', name: 'JSON', desc: 'Dados estruturados' },
                { id: 'image', name: 'Imagem', desc: 'PNG visual (em breve)' }
              ].map(format => (
                <Card
                  key={format.id}
                  className={`cursor-pointer transition-all ${
                    exportOptions.format === format.id 
                      ? 'border-primary bg-primary/5' 
                      : format.id === 'image' 
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => {
                    if (format.id !== 'image') {
                      setExportOptions(prev => ({ ...prev, format: format.id as ExportFormat }));
                    }
                  }}
                >
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      {getFormatIcon(format.id as ExportFormat)}
                      <span className="text-sm font-medium">{format.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{format.desc}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Ações de Export */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 flex-1"
            >
              {getFormatIcon(exportOptions.format)}
              {isExporting ? 'Exportando...' : `Exportar ${exportOptions.format.toUpperCase()}`}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleCopyToClipboard}
              className="flex items-center gap-2"
            >
              {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copySuccess ? 'Copiado!' : 'Copiar'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                const url = generateShareableUrl();
                navigator.clipboard.writeText(url);
              }}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Compartilhar
            </Button>
          </div>

          {shareUrl && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600 mb-2">Link de compartilhamento gerado:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-white rounded text-xs">{shareUrl}</code>
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(shareUrl)}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Preview do Conteúdo
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getTemplateBadgeColor(exportOptions.template)}>
              {exportOptions.template}
            </Badge>
            <Badge variant="outline">
              {exportOptions.format.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
            <pre className="text-xs whitespace-pre-wrap">
              {exportOptions.format === 'json' 
                ? generateJSON().substring(0, 500) + '...' 
                : generateMarkdown().substring(0, 500) + '...'}
            </pre>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Preview dos primeiros 500 caracteres. O arquivo completo terá todo o conteúdo selecionado.
          </p>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{Object.keys(numerologyMap).length}</div>
              <div className="text-sm text-muted-foreground">Números calculados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{conversationInsights.length}</div>
              <div className="text-sm text-muted-foreground">Insights gerados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{meditationSessions.length}</div>
              <div className="text-sm text-muted-foreground">Meditações</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{devaneioScenarios.length}</div>
              <div className="text-sm text-muted-foreground">Cenários</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportSystem;