# PRD - SELF FLOW OTIMIZAÇÕES CRÍTICAS V2.0

**Data:** 14 de Outubro de 2025  
**Status:** Implementação Imediata  
**Objetivo:** Integrar templates Google AI Studio + funcionalidades reais + upgrade visual premium

---

## 🔧 CONFIGURAÇÃO DE ENVIRONMENT E DEPENDÊNCIAS

### PASSO 1: Configurar APIs e Chaves Necessárias

#### Google AI Studio API
```bash
# Obter Google AI API Key
# 1. Acesse: https://aistudio.google.com/
# 2. Clique em "Get API Key" 
# 3. Crie novo projeto ou use existente
# 4. Copie a API key gerada
```

#### Supabase Setup (Via CLI - MÉTODO CORRETO)
```bash
# Instalar Supabase CLI
npm install -g @supabase/cli

# Login no Supabase
supabase login

# Listar projetos
supabase projects list

# Obter environment variables automaticamente
supabase projects api-keys --project-id=<seu-project-id>

# Output automático:
# NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### PASSO 2: Instalar Dependências Críticas

```bash
# Dependências base
npm install @google/generative-ai
npm install @supabase/supabase-js
npm install @prisma/client prisma
npm install framer-motion
npm install @paper-design/shaders-react
npm install d3 @types/d3
npm install recharts
npm install react-hook-form @hookform/resolvers zod
npm install zustand
npm install lucide-react

# Dev dependencies
npm install -D @types/node typescript tailwindcss postcss autoprefixer
```

### PASSO 3: Configurar .env.local
```bash
# Copiar template
cp .env.example .env.local

# Adicionar as chaves obtidas:
GOOGLE_AI_API_KEY=sua_google_ai_api_key_aqui
NEXT_PUBLIC_SUPABASE_URL=sua_supabase_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_supabase_anon_key_aqui
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
```

### PASSO 4: Setup do Database
```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrations
npx prisma db push

# Verificar se funcionou
npx prisma studio
```

---

## 🎯 VISÃO DAS OTIMIZAÇÕES

**PROBLEMA ATUAL:** Self Flow tem placeholders e simulações em vez de funcionalidades reais

**SOLUÇÃO:** Integração completa dos templates Google AI Studio + upgrade visual premium + sistema numerológico funcional

**RESULTADO:** App com voz streaming real + agentes personalizáveis + interface premium + sistema numerológico preciso

---

## 🔧 OTIMIZAÇÕES CRÍTICAS

### OTIMIZAÇÃO 1: VOICE STREAMING REAL
- **Problema:** Controles de áudio falsos em `ChatInterface.tsx`
- **Solução:** Integrar arquitetura completa do `native-audio-function-call-sandbox`
- **Resultado:** Conversação de voz bidirecional funcional

- [x] Copiar LiveAPIContext do template Google AI Studio @dev PRD-OT001
- [x] Integrar GenAILiveClient com system prompts numerológicos @dev PRD-OT002  
- [x] Implementar AudioStreamer para streaming real @dev PRD-OT003
- [x] Substituir placeholders por funcionalidade real @dev PRD-OT004
- [x] Configurar WebRTC para captura de áudio @dev PRD-OT005

### OTIMIZAÇÃO 2: SISTEMA DE AGENTES PERSONALIZÁVEIS  
- **Problema:** Agentes estáticos vs dinâmicos
- **Solução:** Integrar sistema de edição do `ChatterBots`
- **Resultado:** Usuário pode personalizar seu clone digital

- [ ] Integrar AgentEdit.tsx do template ChatterBots @dev PRD-OT006
- [ ] Criar interface de customização de personalidade @dev PRD-OT007
- [ ] Implementar salvamento de configurações personalizadas @dev PRD-OT008
- [ ] Integrar customização com mapa numerológico @dev PRD-OT009
- [ ] Sistema de presets por tipo de usuário @dev PRD-OT010

### OTIMIZAÇÃO 3: UPGRADE VISUAL PREMIUM
- **Problema:** Interface básica vs templates premium disponíveis  
- **Solução:** Integrar componentes visuais dos templates de referência
- **Resultado:** Interface com animações e elementos premium

- [ ] Integrar PulsingBorderShader do personal-agent-hero @dev PRD-OT011
- [ ] Implementar MeshGradientSVG no dashboard @dev PRD-OT012
- [ ] Adicionar animações do rotating-earth no mapa numerológico @dev PRD-OT013
- [ ] Integrar 3d-card-gallery para apresentação de insights @dev PRD-OT014
- [ ] Implementar gradient-hero na landing page @dev PRD-OT015

### OTIMIZAÇÃO 4: ENGINE NUMEROLÓGICO PRECISO
- **Problema:** Cálculos numerológicos podem ter imprecisões
- **Solução:** Sistema de validação dupla + auditoria completa
- **Resultado:** 100% precisão matemática nos cálculos

- [ ] Implementar validação dupla em todos os cálculos @dev PRD-OT016
- [ ] Sistema de auditoria com logs detalhados @dev PRD-OT017
- [ ] Tratamento de caracteres especiais (ç, ã, é, etc.) @dev PRD-OT018
- [ ] Validação de datas (anos bissextos, datas inválidas) @dev PRD-OT019
- [ ] Interface de debugging para cálculos numerológicos @dev PRD-OT020

### OTIMIZAÇÃO 5: MICRO-MEDITAÇÕES FUNCIONAIS
- **Problema:** Sistema de meditação é placeholder
- **Solução:** Integrar text-to-speech real + áudios personalizados  
- **Resultado:** Meditações guiadas com voz do próprio usuário

- [ ] Integrar ElevenLabs API para clonagem de voz @dev PRD-OT021
- [ ] Sistema de captura de sample de voz do usuário @dev PRD-OT022
- [ ] Geração automática de meditações personalizadas @dev PRD-OT023
- [ ] Player de áudio com controles avançados @dev PRD-OT024
- [ ] Biblioteca de templates de meditação @dev PRD-OT025

---

## 🏗️ ARQUITETURA DE INTEGRAÇÃO

### Estrutura de Arquivos Atualizada

```
src/
├── app/
│   ├── page.tsx # Hero premium integrado
│   ├── numerology/
│   │   └── page.tsx # Mapa com animações premium
│   ├── chat/
│   │   └── page.tsx # Voice streaming real
│   └── dashboard/
│       └── page.tsx # Interface premium completa
├── components/
│   ├── audio/
│   │   ├── LiveAPIProvider.tsx # Context do Google AI
│   │   ├── AudioStreamer.tsx # Streaming real
│   │   └── VoiceCloner.tsx # Clonagem de voz
│   ├── agents/
│   │   ├── AgentCustomizer.tsx # Edição dinâmica
│   │   └── PersonalityTweaker.tsx # Fine-tuning
│   ├── premium/
│   │   ├── PulsingBorderShader.tsx
│   │   ├── MeshGradientSVG.tsx
│   │   ├── RotatingEarth.tsx
│   │   └── CardGallery3D.tsx
│   └── numerology/
│       ├── CalculationEngine.tsx # Engine preciso
│       ├── ValidationSystem.tsx # Validação dupla
│       └── AuditLogger.tsx # Logs detalhados
├── lib/
│   ├── live-api/
│   │   ├── client.ts # GenAILiveClient customizado
│   │   ├── context.ts # LiveAPIContext
│   │   └── streaming.ts # Audio streaming
│   ├── agents/
│   │   ├── customizable.ts # Agentes dinâmicos
│   │   ├── numerology-prompts.ts # Prompts baseados em números
│   │   └── personality-engine.ts # Engine de personalidade
│   └── numerology/
│       ├── calculator-v2.ts # Engine otimizado
│       ├── validator.ts # Sistema de validação
│       └── auditor.ts # Sistema de auditoria
```

### Sistema de Prompts Integrados

```typescript
// lib/agents/numerology-prompts.ts
export const generateNumerologyPrompt = (
  map: NumerologyMap, 
  agentType: AgentType,
  personalizations: PersonalityTweaks
) => {
  const base = `Você é um clone digital especializado em ${agentType}.

MAPA NUMEROLÓGICO COMPLETO:
- Motivação: ${map.motivacao} (${getNumerologyMeaning(map.motivacao, 'motivacao')})
- Expressão: ${map.expressao} (${getNumerologyMeaning(map.expressao, 'expressao')}) 
- Destino: ${map.destino} (${getNumerologyMeaning(map.destino, 'destino')})
- Lições Cármicas: ${map.licoesCarmicas.join(', ')}
- Tendências Ocultas: ${map.tendenciasOcultas.join(', ')}
- Ano Pessoal: ${map.anoPessoal}

PERSONALIZAÇÕES DO USUÁRIO:
${generatePersonalizationPrompt(personalizations)}

INSTRUÇÕES ESPECÍFICAS:
${getAgentInstructions(agentType)}

FUNCIONALIDADES DISPONÍVEIS:
- numerologyInsightsTool: Análise numerológica detalhada
- microMeditationTool: Meditações personalizadas
- personalityAnalysisTool: Insights comportamentais
- voiceCloningTool: Áudios com voz do usuário`

  return base
}
```

### LiveAPI Integration

```typescript
// lib/live-api/client.ts
import { LiveAPIContext } from './context'

export class SelfFlowLiveClient extends GenAILiveClient {
  constructor(
    numerologyMap: NumerologyMap,
    agentConfig: AgentConfiguration,
    personalizations: PersonalityTweaks
  ) {
    const systemInstruction = generateNumerologyPrompt(
      numerologyMap,
      agentConfig.type,
      personalizations
    )
    
    super({
      apiKey: process.env.GOOGLE_AI_API_KEY!,
      systemInstruction,
      tools: [
        numerologyInsightsTool,
        microMeditationTool,
        personalityAnalysisTool,
        voiceCloningTool
      ]
    })
  }

  async processNumerologyQuery(query: string, audioData?: ArrayBuffer) {
    return this.sendMessage({
      text: query,
      audio: audioData,
      context: {
        numerologyContext: this.numerologyMap,
        personalityContext: this.personalizations
      }
    })
  }
}
```

---

## 🎨 COMPONENTES PREMIUM INTEGRADOS

### Hero Section Premium
```tsx
// components/premium/HeroPremium.tsx
import { PulsingBorderShader } from './PulsingBorderShader'
import { MeshGradientSVG } from './MeshGradientSVG'

export function HeroPremium() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="space-y-8">
            <h1 className="text-7xl font-bold tracking-tight">
              Seu clone{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                numerológico
              </span>
            </h1>
            <p className="text-2xl text-gray-300 leading-relaxed">
              Converse com a versão mais clara de você mesmo, baseada em seu mapa numerológico cabalístico completo
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl scale-110" />
              <PulsingBorderShader />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Dashboard Premium
```tsx
// components/premium/DashboardPremium.tsx  
import { MeshGradientSVG } from './MeshGradientSVG'
import { CardGallery3D } from './CardGallery3D'
import { RotatingEarth } from './RotatingEarth'

export function DashboardPremium({ numerologyMap }: { numerologyMap: NumerologyMap }) {
  const insights = generateNumerologyInsights(numerologyMap)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Mapa Numerológico Central */}
          <div className="col-span-8 bg-black/40 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center h-96">
              <RotatingEarth numerologyData={numerologyMap} />
            </div>
          </div>
          
          {/* Sidebar de Insights */}
          <div className="col-span-4">
            <CardGallery3D insights={insights} />
          </div>
          
          {/* Background Animado */}
          <div className="fixed inset-0 -z-10">
            <MeshGradientSVG />
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## 🔊 SISTEMA DE VOZ REAL

### Audio Streaming Implementation

```typescript
// components/audio/AudioStreamer.tsx
import { useLiveAPI } from '@/hooks/use-live-api'

export function AudioStreamer({ numerologyMap, agentConfig }: AudioStreamerProps) {
  const { client, connect, disconnect, sendAudio } = useLiveAPI({
    numerologyMap,
    agentConfig,
    onMessage: handleAudioResponse,
    onError: handleAudioError
  })
  
  const [isRecording, setIsRecording] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          sendAudio(event.data)
        }
      }
      
      recorder.start(100) // Chunk a cada 100ms
      setIsRecording(true)
    } catch (error) {
      console.error('Erro ao acessar microfone:', error)
    }
  }
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording 
              ? 'bg-red-500 animate-pulse' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isRecording ? <Square size={24} /> : <Mic size={24} />}
        </button>
        
        {isRecording && (
          <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping" />
        )}
      </div>
      
      <div className="text-sm text-gray-400">
        {isRecording ? 'Gravando...' : 'Clique para falar'}
      </div>
      
      {/* Visualizador de áudio */}
      <div className="flex space-x-1 h-8 items-end">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-blue-400 rounded-full transition-all duration-150"
            style={{
              height: `${Math.random() * (isRecording ? audioLevel : 0) * 32 + 4}px`
            }}
          />
        ))}
      </div>
    </div>
  )
}
```

---

## 🤖 SISTEMA DE AGENTES PERSONALIZÁVEIS

### Agent Customization Interface

```tsx
// components/agents/AgentCustomizer.tsx
export function AgentCustomizer({ 
  numerologyMap, 
  currentAgent, 
  onSave 
}: AgentCustomizerProps) {
  const [personalizations, setPersonalizations] = useState<PersonalityTweaks>({
    communicationStyle: 'balanced',
    empathyLevel: 0.8,
    directnessLevel: 0.6,
    numerologyFocus: ['destino', 'motivacao', 'expressao'],
    customInstructions: ''
  })
  
  return (
    <div className="bg-gray-900 rounded-2xl p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
          <Bot size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Personalizar Seu Clone</h3>
          <p className="text-gray-400">Ajuste como seu clone digital se comporta</p>
        </div>
      </div>
      
      {/* Estilo de Comunicação */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-300">Estilo de Comunicação</label>
        <select 
          value={personalizations.communicationStyle}
          onChange={(e) => setPersonalizations(prev => ({
            ...prev, 
            communicationStyle: e.target.value as CommunicationStyle
          }))}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3"
        >
          <option value="gentle">Gentil e Encorajador</option>
          <option value="balanced">Equilibrado</option>
          <option value="direct">Direto e Honesto</option>
          <option value="challenging">Desafiador</option>
        </select>
      </div>
      
      {/* Níveis de Empatia e Franqueza */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">
            Nível de Empatia: {Math.round(personalizations.empathyLevel * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={personalizations.empathyLevel}
            onChange={(e) => setPersonalizations(prev => ({
              ...prev,
              empathyLevel: parseFloat(e.target.value)
            }))}
            className="w-full"
          />
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">
            Nível de Franqueza: {Math.round(personalizations.directnessLevel * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={personalizations.directnessLevel}
            onChange={(e) => setPersonalizations(prev => ({
              ...prev,
              directnessLevel: parseFloat(e.target.value)
            }))}
            className="w-full"
          />
        </div>
      </div>
      
      {/* Foco Numerológico */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-300">Focar nestes Números</label>
        <div className="flex flex-wrap gap-2">
          {NUMEROLOGY_TYPES.map((type) => (
            <button
              key={type.key}
              onClick={() => toggleNumerologyFocus(type.key)}
              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                personalizations.numerologyFocus.includes(type.key)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Instruções Customizadas */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-300">Instruções Personalizadas</label>
        <textarea
          value={personalizations.customInstructions}
          onChange={(e) => setPersonalizations(prev => ({
            ...prev,
            customInstructions: e.target.value
          }))}
          placeholder="Adicione instruções específicas para seu clone..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 h-24 resize-none"
        />
      </div>
      
      <button
        onClick={() => onSave(personalizations)}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
      >
        Salvar Personalizações
      </button>
    </div>
  )
}
```

---

## 🔢 ENGINE NUMEROLÓGICO OTIMIZADO

### Sistema de Validação Dupla

```typescript
// lib/numerology/validator.ts
export class NumerologyValidator {
  static validateCalculation(
    name: string, 
    birthDate: Date, 
    calculationType: NumerologyType,
    result: number
  ): ValidationResult {
    // Primeira validação - cálculo direto
    const primaryResult = this.calculatePrimary(name, birthDate, calculationType)
    
    // Segunda validação - método alternativo
    const secondaryResult = this.calculateSecondary(name, birthDate, calculationType)
    
    // Terceira validação - verificação cruzada
    const crossCheck = this.performCrossCheck(name, birthDate, calculationType)
    
    const isValid = primaryResult === secondaryResult && 
                   secondaryResult === result &&
                   crossCheck.isConsistent
    
    return {
      isValid,
      primaryResult,
      secondaryResult,
      inputResult: result,
      crossCheck,
      timestamp: new Date(),
      auditLog: this.generateAuditLog(name, birthDate, calculationType, {
        primary: primaryResult,
        secondary: secondaryResult,
        input: result,
        crossCheck
      })
    }
  }
  
  private static calculatePrimary(
    name: string, 
    birthDate: Date, 
    type: NumerologyType
  ): number {
    // Implementação do método principal de cálculo
    switch (type) {
      case 'motivacao':
        return this.calculateMotivacao(name)
      case 'expressao':
        return this.calculateExpressao(name)
      case 'destino':
        return this.calculateDestino(birthDate)
      // ... outros tipos
      default:
        throw new Error(`Tipo de cálculo não suportado: ${type}`)
    }
  }
  
  private static calculateSecondary(
    name: string, 
    birthDate: Date, 
    type: NumerologyType
  ): number {
    // Implementação de método alternativo para validação cruzada
    // Usa algoritmo ligeiramente diferente mas deve chegar no mesmo resultado
    // ...
  }
}
```

### Auditoria Detalhada

```typescript
// lib/numerology/auditor.ts
export class NumerologyAuditor {
  static async logCalculation(
    userId: string,
    calculationData: CalculationAuditData
  ): Promise<void> {
    const auditEntry = {
      id: generateId(),
      userId,
      timestamp: new Date(),
      calculationType: calculationData.type,
      inputData: {
        name: calculationData.name,
        birthDate: calculationData.birthDate,
        originalInput: calculationData.originalInput
      },
      calculations: {
        primaryMethod: calculationData.primaryResult,
        secondaryMethod: calculationData.secondaryResult,
        finalResult: calculationData.finalResult
      },
      validation: {
        isValid: calculationData.isValid,
        discrepancies: calculationData.discrepancies || [],
        confidence: calculationData.confidence
      },
      environment: {
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        version: process.env.NEXT_PUBLIC_APP_VERSION
      }
    }
    
    // Salvar no banco para auditoria
    await supabase
      .from('numerology_audit_log')
      .insert(auditEntry)
      
    // Log local para debugging
    console.log('[NUMEROLOGY_AUDIT]', auditEntry)
  }
  
  static async getAuditHistory(userId: string): Promise<AuditEntry[]> {
    const { data, error } = await supabase
      .from('numerology_audit_log')
      .select('*')
      .eq('userId', userId)
      .order('timestamp', { ascending: false })
      .limit(100)
      
    if (error) throw error
    return data
  }
}
```

---

## 🎵 SISTEMA DE MICRO-MEDITAÇÕES

### Voice Cloning Integration

```typescript
// lib/voice/cloner.ts
import { ElevenLabsAPI } from '@/lib/elevenlabs'

export class VoiceCloner {
  private elevenLabs: ElevenLabsAPI
  
  constructor(apiKey: string) {
    this.elevenLabs = new ElevenLabsAPI(apiKey)
  }
  
  async cloneVoice(
    userId: string, 
    audioSample: ArrayBuffer, 
    voiceName: string
  ): Promise<ClonedVoice> {
    try {
      // Upload do sample de áudio
      const voiceId = await this.elevenLabs.cloneVoice({
        name: `${voiceName}_${userId}`,
        files: [audioSample],
        description: `Voz clonada para usuário ${userId}`
      })
      
      // Salvar referência no banco
      await supabase
        .from('user_voices')
        .upsert({
          userId,
          voiceId,
          voiceName,
          createdAt: new Date(),
          isActive: true
        })
      
      return {
        userId,
        voiceId,
        voiceName,
        status: 'ready'
      }
    } catch (error) {
      console.error('Erro ao clonar voz:', error)
      throw new Error('Falha na clonagem de voz')
    }
  }
  
  async generateMeditation(
    userId: string,
    meditationScript: string,
    numerologyContext: NumerologyMap
  ): Promise<MeditationAudio> {
    const userVoice = await this.getUserVoice(userId)
    
    if (!userVoice) {
      throw new Error('Voz do usuário não encontrada')
    }
    
    // Personalizar script baseado na numerologia
    const personalizedScript = this.personalizeMeditationScript(
      meditationScript,
      numerologyContext
    )
    
    // Gerar áudio com voz clonada
    const audioBuffer = await this.elevenLabs.generateAudio({
      text: personalizedScript,
      voiceId: userVoice.voiceId,
      settings: {
        stability: 0.75,
        similarityBoost: 0.85,
        style: 0.2
      }
    })
    
    // Salvar áudio gerado
    const audioUrl = await this.uploadAudio(userId, audioBuffer)
    
    return {
      userId,
      script: personalizedScript,
      audioUrl,
      duration: this.estimateAudioDuration(personalizedScript),
      numerologyContext,
      createdAt: new Date()
    }
  }
}
```

### Meditation Templates

```typescript
// lib/meditation/templates.ts
export const MEDITATION_TEMPLATES = {
  numerology_insight: {
    title: 'Insights do Seu Número {numerologyNumber}',
    script: `
      Respire profundamente e se conecte com a energia do seu número {numerologyNumber}.
      
      {numerologyMeaning}
      
      Sinta como essa energia ressoa dentro de você...
      
      Inspire essa qualidade... expire qualquer resistência...
      
      Você está alinhado com seu propósito numerológico...
    `,
    duration: 300, // 5 minutos
    triggers: ['high_stress', 'decision_making', 'clarity_needed']
  },
  
  karmic_healing: {
    title: 'Cura das Lições Cármicas',
    script: `
      Suas lições cármicas são: {karmicLessons}
      
      Essas são áreas de crescimento, não falhas...
      
      Inspire compaixão por si mesmo... expire julgamento...
      
      Cada desafio é uma oportunidade de evolução...
    `,
    duration: 420, // 7 minutos
    triggers: ['self_criticism', 'feeling_stuck', 'pattern_recognition']
  }
}

export function generatePersonalizedMeditation(
  template: MeditationTemplate,
  numerologyMap: NumerologyMap,
  currentMood: UserMood
): string {
  let script = template.script
  
  // Substituir placeholders numerológicos
  script = script.replace('{numerologyNumber}', numerologyMap.destino.toString())
  script = script.replace('{numerologyMeaning}', getNumerologyMeaning(numerologyMap.destino, 'destino'))
  script = script.replace('{karmicLessons}', numerologyMap.licoesCarmicas.join(', '))
  
  // Ajustar baseado no humor atual
  if (currentMood === 'anxious') {
    script = script.replace('Respire profundamente', 'Respire bem devagar, com calma total')
  }
  
  return script
}
```

---

## 📊 MÉTRICAS E MONITORAMENTO

### Analytics Integration

```typescript
// lib/analytics/tracker.ts
export class SelfFlowAnalytics {
  static trackNumerologyCalculation(
    userId: string,
    calculationType: NumerologyType,
    result: number,
    validationPassed: boolean
  ) {
    // Analytics interno
    this.trackEvent('numerology_calculation', {
      userId,
      calculationType,
      result,
      validationPassed,
      timestamp: Date.now()
    })
    
    // Vercel Analytics
    if (typeof window !== 'undefined') {
      window.va?.track('numerology_calculation', {
        type: calculationType,
        valid: validationPassed
      })
    }
  }
  
  static trackVoiceInteraction(
    userId: string,
    duration: number,
    responseQuality: number,
    agentType: AgentType
  ) {
    this.trackEvent('voice_interaction', {
      userId,
      duration,
      responseQuality,
      agentType,
      timestamp: Date.now()
    })
  }
  
  static trackAgentCustomization(
    userId: string,
    customizations: PersonalityTweaks,
    satisfactionScore?: number
  ) {
    this.trackEvent('agent_customization', {
      userId,
      customizations,
      satisfactionScore,
      timestamp: Date.now()
    })
  }
}
```

---

## 🚀 IMPLEMENTAÇÃO E DEPLOY

### Scripts de Build
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "test": "jest",
    "deploy": "npm run build && vercel --prod"
  }
}
```

### Checklist de Deploy

- [ ] Configurar todas as environment variables na Vercel @devops PRD-OT026
- [ ] Testar build de produção localmente @dev PRD-OT027  
- [ ] Executar migrations do Prisma @dev PRD-OT028
- [ ] Configurar domínio personalizado @devops PRD-OT029
- [ ] Setup de monitoramento e alertas @devops PRD-OT030
- [ ] Teste de performance e otimizações @dev PRD-OT031
- [ ] Backup de dados críticos @devops PRD-OT032
- [ ] Documentação de troubleshooting @dev PRD-OT033

---

## 🎯 CRITÉRIOS DE SUCESSO

### Funcionalidades Deve Estar 100% Funcionais
- [ ] Voice streaming bidirecional sem falhas @qa PRD-OT034
- [ ] Cálculos numerológicos com 100% precisão @qa PRD-OT035
- [ ] Agentes personalizáveis salvando configurações @qa PRD-OT036
- [ ] Interface premium com animações suaves @qa PRD-OT037
- [ ] Micro-meditações com voz clonada funcionando @qa PRD-OT038

### Performance Benchmarks
- [ ] Tempo de resposta < 3s para texto @qa PRD-OT039
- [ ] Tempo de resposta < 5s para áudio @qa PRD-OT040
- [ ] Cálculos numerológicos < 100ms @qa PRD-OT041
- [ ] Interface responsiva em dispositivos móveis @qa PRD-OT042
- [ ] Uptime > 99.9% @qa PRD-OT043

### Validação de Integração
- [ ] Todos os templates Google AI Studio integrados @qa PRD-OT044
- [ ] Componentes premium funcionando @qa PRD-OT045  
- [ ] Sistema de auditoria numerológica ativo @qa PRD-OT046
- [ ] Backup automático funcionando @qa PRD-OT047
- [ ] Monitoramento e alertas configurados @qa PRD-OT048

---

## ✅ CONCLUSÃO

Este PRD elimina todos os placeholders e simulações do Self Flow atual, integrando funcionalidades reais baseadas nos templates Google AI Studio disponíveis.

**RESULTADO FINAL:**
- Voice streaming bidirecional funcional
- Agentes AI personalizáveis dinamicamente  
- Interface premium com animações avançadas
- Sistema numerológico com precisão matemática 100%
- Micro-meditações com voz clonada do usuário
- Auditoria completa e monitoramento

**STATUS:** Pronto para implementação imediata seguindo as configurações de environment e dependências especificadas no início deste documento.