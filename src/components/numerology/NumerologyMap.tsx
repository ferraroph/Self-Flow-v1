'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, User, Calendar, Star, Palette, Calculator } from 'lucide-react';
import { generateNumerologyReport } from '@/lib/numerology';
import type { NumerologyReport } from '@/lib/numerology/types';

const NumerologyMap: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    partnerName: '',
    partnerBirthDate: ''
  });
  
  const [report, setReport] = useState<NumerologyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('core');

  const formatDateInput = (value: string): string => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara dd/mm/aaaa
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else if (numbers.length <= 8) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }
  };

  const isValidDate = (dateString: string): boolean => {
    if (!dateString || dateString.length !== 10) return false;
    
    const [day, month, year] = dateString.split('/').map(num => parseInt(num));
    
    if (!day || !month || !year) return false;
    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < 1900 || year > new Date().getFullYear()) return false;
    
    // Verifica se a data é válida
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
  };

  const parseDate = (dateString: string): Date => {
    // Se for formato brasileiro dd/mm/aaaa
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    // Se for formato ISO yyyy-mm-dd
    return new Date(dateString);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.birthDate) return;
    
    // Validar data de nascimento
    if (!isValidDate(formData.birthDate)) {
      alert('Por favor, insira uma data de nascimento válida no formato dd/mm/aaaa');
      return;
    }
    
    // Validar data do parceiro se fornecida
    if (formData.partnerBirthDate && !isValidDate(formData.partnerBirthDate)) {
      alert('Por favor, insira uma data de nascimento válida para o parceiro no formato dd/mm/aaaa');
      return;
    }
    
    setLoading(true);
    try {
      const birthDate = parseDate(formData.birthDate);
      const options: any = { 
        includeInterpretations: true,
        includePredictions: true
      };
      
      if (formData.partnerName && formData.partnerBirthDate) {
        options.includeCompatibility = true;
        options.partnerData = {
          fullName: formData.partnerName,
          birthDate: parseDate(formData.partnerBirthDate)
        };
      }
      
      const numerologyReport = generateNumerologyReport(
        formData.fullName,
        birthDate,
        options
      );
      
      setReport(numerologyReport);
    } catch (error) {
      console.error('Erro ao gerar mapa:', error);
    } finally {
      setLoading(false);
    }
  };

  const NumberCard: React.FC<{ 
    title: string; 
    number: number; 
    interpretation?: any;
    colors?: string[];
  }> = ({ title, number, interpretation, colors }) => (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary mb-2">{number}</div>
        {interpretation && (
          <>
            <div className="text-xs font-medium text-muted-foreground mb-2">
              {interpretation.title}
            </div>
            {interpretation.description && (
              <div className="text-xs text-gray-600 line-clamp-4">
                {interpretation.description.substring(0, 150)}...
              </div>
            )}
          </>
        )}
        {colors && (
          <div className="flex gap-1 mt-2">
            {colors.slice(0, 4).map((color, idx) => (
              <div 
                key={idx}
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Mapa Numerológico Cabalístico Completo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="text"
                  value={formData.birthDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthDate: formatDateInput(e.target.value) }))}
                  placeholder="dd/mm/aaaa"
                  pattern="\d{2}/\d{2}/\d{4}"
                  maxLength={10}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerName">Nome do Parceiro (opcional)</Label>
                <Input
                  id="partnerName"
                  value={formData.partnerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, partnerName: e.target.value }))}
                  placeholder="Nome do parceiro para compatibilidade"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerBirthDate">Data de Nascimento do Parceiro</Label>
                <Input
                  id="partnerBirthDate"
                  type="text"
                  value={formData.partnerBirthDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, partnerBirthDate: formatDateInput(e.target.value) }))}
                  placeholder="dd/mm/aaaa"
                  pattern="\d{2}/\d{2}/\d{4}"
                  maxLength={10}
                  disabled={!formData.partnerName}
                />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Gerando Mapa...' : 'Gerar Mapa Numerológico'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {report && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="core" className="flex items-center gap-1">
              <User className="w-3 h-3" />
              Núcleos
            </TabsTrigger>
            <TabsTrigger value="cycles" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Ciclos
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              Previsões
            </TabsTrigger>
            <TabsTrigger value="love" className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              Amor
            </TabsTrigger>
            <TabsTrigger value="karmic" className="flex items-center gap-1">
              <Calculator className="w-3 h-3" />
              Cármico
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-1">
              <Palette className="w-3 h-3" />
              Cores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="core" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Nome</div>
                    <div className="font-medium">{report.personalInfo.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Nascimento</div>
                    <div className="font-medium">{report.personalInfo.birthDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Idade</div>
                    <div className="font-medium">{report.personalInfo.age} anos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Números Centrais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <NumberCard
                    title="Motivação"
                    number={report.coreNumbers.motivation.number}
                    interpretation={report.coreNumbers.motivation.interpretation}
                  />
                  <NumberCard
                    title="Impressão"
                    number={report.coreNumbers.impression.number}
                    interpretation={report.coreNumbers.impression.interpretation}
                  />
                  <NumberCard
                    title="Expressão"
                    number={report.coreNumbers.expression.number}
                    interpretation={report.coreNumbers.expression.interpretation}
                    colors={report.loveAndRelationships.favorableColors}
                  />
                  <NumberCard
                    title="Destino"
                    number={report.coreNumbers.destiny.number}
                    interpretation={report.coreNumbers.destiny.interpretation}
                  />
                  <NumberCard
                    title="Missão"
                    number={report.coreNumbers.mission.number}
                    interpretation={report.coreNumbers.mission.interpretation}
                  />
                  <NumberCard
                    title="Dia Natalício"
                    number={report.coreNumbers.birthDay.number}
                    interpretation={report.coreNumbers.birthDay.interpretation}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cycles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ciclos de Vida</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{report.lifePath.cycles.first.number}</div>
                    <div className="text-sm font-medium">Primeiro Ciclo</div>
                    <div className="text-xs text-muted-foreground">
                      {report.lifePath.cycles.first.startYear} - {report.lifePath.cycles.first.endYear}
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{report.lifePath.cycles.second.number}</div>
                    <div className="text-sm font-medium">Segundo Ciclo</div>
                    <div className="text-xs text-muted-foreground">
                      {report.lifePath.cycles.second.startYear} - {report.lifePath.cycles.second.endYear}
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{report.lifePath.cycles.third.number}</div>
                    <div className="text-sm font-medium">Terceiro Ciclo</div>
                    <div className="text-xs text-muted-foreground">
                      {report.lifePath.cycles.third.startYear}+
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Desafios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{report.lifePath.challenges.first}</div>
                    <div className="text-sm font-medium">Primeiro Desafio</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{report.lifePath.challenges.second}</div>
                    <div className="text-sm font-medium">Segundo Desafio</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{report.lifePath.challenges.main}</div>
                    <div className="text-sm font-medium">Desafio Principal</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Previsões Atuais - {report.currentPredictions.year}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{report.currentPredictions.personalYear}</div>
                    <div className="text-sm font-medium">Ano Pessoal</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{report.currentPredictions.personalMonth}</div>
                    <div className="text-sm font-medium">Mês Pessoal</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{report.currentPredictions.personalDay}</div>
                    <div className="text-sm font-medium">Dia Pessoal</div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Previsão Anual</h4>
                    <p className="text-sm text-gray-600">{report.currentPredictions.yearlyForecast}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Previsão Mensal</h4>
                    <p className="text-sm text-gray-600">{report.currentPredictions.monthlyForecast}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Números Favoráveis Este Mês</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.currentPredictions.favorableNumbers.map((num, idx) => (
                        <Badge key={idx} variant="secondary">{num}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="love" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Números do Amor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-red-500 mb-2">
                    {report.loveAndRelationships.loveNumber}
                  </div>
                  <div className="text-sm text-muted-foreground">Número do Amor</div>
                </div>
              </CardContent>
            </Card>

            {report.compatibility && (
              <Card>
                <CardHeader>
                  <CardTitle>Análise de Compatibilidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="font-medium">{report.compatibility.person1.name}</div>
                      <div className="text-sm text-muted-foreground">Amor: {report.compatibility.person1.loveNumber}</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="font-medium">{report.compatibility.person2.name}</div>
                      <div className="text-sm text-muted-foreground">Amor: {report.compatibility.person2.loveNumber}</div>
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold mb-2">{report.compatibility.compatibility.score}%</div>
                    <Badge 
                      variant={
                        report.compatibility.compatibility.compatibilityLevel === 'excellent' ? 'default' :
                        report.compatibility.compatibility.compatibilityLevel === 'good' ? 'secondary' :
                        report.compatibility.compatibility.compatibilityLevel === 'challenging' ? 'destructive' :
                        'outline'
                      }
                    >
                      {report.compatibility.compatibility.compatibilityLevel}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">{report.compatibility.compatibility.description}</p>
                    
                    <div>
                      <h4 className="font-medium mb-2">Recomendações</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {report.compatibility.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="karmic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análises Cármicas e Especiais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {report.specialAnalyses.karmicLessons.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Lições Cármicas</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.specialAnalyses.karmicLessons.map((lesson, idx) => (
                        <Badge key={idx} variant="destructive">{lesson}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {report.specialAnalyses.karmicDebts.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Dívidas Cármicas</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.specialAnalyses.karmicDebts.map((debt, idx) => (
                        <Badge key={idx} variant="destructive">{debt}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {report.specialAnalyses.hiddenTendencies.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Tendências Ocultas</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.specialAnalyses.hiddenTendencies.map((tendency, idx) => (
                        <Badge key={idx} variant="outline">{tendency}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium mb-2">Grau de Ascensão</h4>
                  <Badge variant={
                    report.specialAnalyses.ascensionDegree === 'ascending' ? 'default' :
                    report.specialAnalyses.ascensionDegree === 'equal' ? 'secondary' :
                    'outline'
                  }>
                    {report.specialAnalyses.ascensionDegree === 'ascending' ? 'Ascendente' :
                     report.specialAnalyses.ascensionDegree === 'equal' ? 'Equilibrado' :
                     'Descendente'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cores Favoráveis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {report.loveAndRelationships.favorableColors.map((color, idx) => (
                    <div key={idx} className="text-center p-4 border rounded-lg">
                      <div 
                        className="w-16 h-16 rounded-full mx-auto mb-2 border"
                        style={{ backgroundColor: color }}
                      />
                      <div className="text-xs font-mono">{color}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default NumerologyMap;