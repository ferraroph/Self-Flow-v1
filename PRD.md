# PRD - SELF FLOW MVP

## Product Requirements Document - Versão 1.0

  

**Data:** 13 de Outubro de 2025  

**Status:** Pronto para Implementação  

**Timeline:** MVP em 4-6 horas  

**Orçamento:** R$ 0,00 (pay-per-use APIs apenas)

  

---

  

##  1. VISÃO DO PRODUTO

  

**"Converse com a versão mais clara de você mesmo, que já viveu todos os seus futuros possíveis e pode te guiar com precisão cirúrgica."**

  

**Self Flow** é uma aplicação web conversacional multi-dimensional que cria clones digitais personalizados baseados em mapeamento numerológico cabalístico + perfil comportamental. O usuário primeiro descobre seu mapa numerológico completo, escolhe sua abordagem preferida (esotérica, psicológica ou híbrida), e conversa com sua versão mais clara e centrada - um clone IA especializado que integra sabedoria numerológica com insights comportamentais únicos.

  

**Diferencial único:** Não é chatbot genérico - é VOCÊ conversando consigo mesmo sem filtros emocionais ou autossabotagem.

  

---

  

##  2. PERSONAS DE USUÁRIO

  

### Persona Primária: Profissional em Busca de Clareza Multi-Dimensional (25-55 anos)

**Demografia:** Classe média educada, renda R$3-30K/mês, trabalha com decisões complexas

**Contexto:** Competente profissionalmente mas preso em conflitos internos, curioso sobre autoconhecimento

**Dor:** "Sei que há mais sobre mim que não entendo. Preciso de clareza profunda, não só conselhos externos."

**Desejo:** Descobrir seu mapa numerológico + conversar com versão esclarecida de si mesmo

**Jornada:** Nome+nascimento → Mapa numerológico → Escolha de abordagem → Clone personalizado

  

### Personas Secundárias:

- **Empreendedor Esotérico:** Combina negócios com espiritualidade, quer agente numerologia+astrologia

- **Executivo Analítico:** Prefere abordagem psicológica/científica, cético do esotérico

- **Buscadora Holística:** Quer integração completa (híbrido), numerologia + psicologia + astrologia

- **Empresário Pragmático:** Quer insights rápidos baseados em dados numerológicos precisos

- **Terapeuta Curiosa:** Profissional da área que quer entender a ferramenta para si mesma

- **Jovem Autoconhecimento:** 18-25 anos, primeira experiência com mapeamento profundo

  

---

  

##  3. REQUISITOS FUNCIONAIS

  

### 3.1 Funcionalidades Must-Have (MVP)

  

| ID        | Funcionalidade                          | Descrição                                                                                         | Prioridade |
| --------- | --------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------- |
| **RF001** | **Mapeamento Numerológico Cabalístico** | Sistema que calcula mapa numerológico completo a partir de nome completo + data nascimento        | MUST       |
| **RF002** | **Validação Matemática Precisa**        | Sistema de validação dos cálculos numerológicos com múltiplas verificações para garantir precisão | MUST       |
| **RF003** | **Apresentação Gamificada do Mapa**     | Interface visual estilo Obsidian para apresentar os 15+ números calculados de forma interativa    | MUST       |
| **RF004** | **Seletor de Agente Especializado**     | Sistema multi-agente: esotérico (numerologia+astrologia), psicológico (TCC+neuro), híbrido        | MUST       |
| **RF005** | **Onboarding Direcionado**              | Perguntas adaptadas ao perfil numerológico identificado (10-15 perguntas específicas)             | MUST       |
| **RF006** | **Clone Digital Multi-Dimensional**     | IA baseada no mapa numerológico + respostas comportamentais + agente escolhido                    | MUST       |
| **RF007** | **Conversação por Voz**                 | Chat em tempo real com o clone via áudio bidirecional (Gemini Live API)                           | MUST       |
| **RF008** | **Conversação por Texto**               | Interface de chat tradicional como alternativa ao áudio                                           | MUST       |
| **RF009** | **Dashboard Multi-Modal**               | Painel integrando mapa numerológico + insights comportamentais + evolução                         | MUST       |

  

### 3.2 Funcionalidades Should-Have (Pós-MVP Imediato)

  

| ID        | Funcionalidade                          | Descrição                                                              | Prioridade |
| --------- | --------------------------------------- | ---------------------------------------------------------------------- | ---------- |
| **RF010** | **Integração Astrológica**              | Mapa astrológico completo integrado ao perfil numerológico             | SHOULD     |
| **RF011** | **Ciclos Numerológicos Personalizados** | Alertas baseados em ano pessoal, mês pessoal, dia pessoal              | SHOULD     |
| **RF012** | **Modo Devaneio Multi-Dimensional**     | Simulação de cenários usando insights numerológicos + comportamentais  | SHOULD     |
| **RF013** | **Micro-Meditações Direcionadas**       | Intervenções de 30s adaptadas ao perfil numerológico atual             | SHOULD     |
| **RF014** | **TCC Inversa Numerológica**            | Identifica padrões comportamentais usando lições cármicas e tendências | SHOULD     |
| **RF015** | **Avatar Visual Numerológico**          | Representação visual que reflete números dominantes no mapa            | SHOULD     |

  

### 3.3 Funcionalidades Could-Have (Futuras)

  

| ID        | Funcionalidade                         | Descrição                                                    | Prioridade |
| --------- | -------------------------------------- | ------------------------------------------------------------ | ---------- |
| **RF016** | **Compatibilidade Numerológica**       | Análise de relacionamentos baseada em mapas numerológicos    | COULD      |
| **RF017** | **Previsões Anuais Personalizadas**    | Relatório detalhado baseado em ciclos numerológicos pessoais | COULD      |
| **RF018** | **Histórico de Evolução Numerológica** | Timeline visual mostrando crescimento pessoal via números    | COULD      |
| **RF019** | **Comunidade por Números Mestres**     | Espaços para pessoas com mesmo número dominante              | COULD      |
| **RF020** | **Integração Calendário Lunar**        | Sincronização com fases lunares e ciclos numerológicos       | COULD      |
| **RF021** | **Exportar Mapa Completo**             | Download PDF/imagem do mapa numerológico + insights          | COULD      |

  

---

  

## � 3.5 SISTEMA NUMEROLÓGICO CABALÍSTICO

  

### 3.5.1 Números Calculados (15+ tipos)

  

| Tipo                   | Fórmula                   | Descrição                                 | Exemplo                               |
| ---------------------- | ------------------------- | ----------------------------------------- | ------------------------------------- |
| **Motivação**          | Soma das vogais do nome   | Desejos internos e aspirações profundas   | MARIA = A+I+A = 1+9+1 = 11            |
| **Impressão**          | Soma das consoantes       | Primeira impressão que causa nos outros   | MARIA = M+R = 4+9 = 13 → 4            |
| **Expressão**          | Soma total do nome        | Talentos naturais e forma de se expressar | MARIA = 11+13 = 24 → 6                |
| **Destino**            | Soma da data nascimento   | Missão de vida e propósito maior          | 15/03/1985 = 1+5+0+3+1+9+8+5 = 32 → 5 |
| **Lições Cármicas**    | Números ausentes (1-9)    | Desafios que precisa desenvolver          | Nome sem 2,7,8 = Lições: [2,7,8]      |
| **Tendências Ocultas** | Números repetidos         | Características intensificadas            | Nome com 3 vezes o 1 = Tendência: [1] |
| **Harmônico Superior** | Expressão + Destino       | Integração de talentos e propósito        | 6 + 5 = 11 (Mestre)                   |
| **Desafio Menor**      | abs(Mês - Dia) nascimento | Primeiro obstáculo a superar              | abs(03-15) = 12 → 3                   |
| **Desafio Maior**      | abs(Ano - Destino)        | Desafio principal da vida                 | abs(1985-5) = 1980 → 9                |
| **Realização 1**       | (Dia + Mês) reduzido      | Primeira fase da vida (0-30 anos)         | (15+03) = 18 → 9                      |
| **Realização 2**       | (Dia + Ano) reduzido      | Segunda fase da vida (30-50 anos)         | (15+1985) = 2000 → 2                  |
| **Realização 3**       | Real1 + Real2             | Terceira fase da vida (50+ anos)          | 9 + 2 = 11                            |
| **Realização Final**   | Mês + Ano reduzido        | Realização máxima possível                | (03+1985) = 1988 → 8                  |
| **Ano Universal**      | Soma do ano atual         | Energia coletiva do ano                   | 2025 = 2+0+2+5 = 9                    |
| **Ano Pessoal**        | (Dia+Mês+Ano atual)       | Ciclo pessoal de 9 anos                   | (15+03+2025) = 2043 → 9               |

  

### 3.5.2 Números Mestres (Não reduzir)

- **11** - Intuição, inspiração, iluminação espiritual

- **22** - Construtor mestre, visão prática de grande escala

- **33** - Professor mestre, serviço compassivo à humanidade

  

### 3.5.3 Validações Matemáticas Obrigatórias

-  Verificação dupla de todos os cálculos

-  Tratamento especial para números mestres

-  Validação de datas (anos bissextos, etc.)

-  Controle de caracteres especiais (ç, ã, etc.)

-  Log detalhado para auditoria de cálculos

  

---

  

## � 4. USER FLOWS

  

### 4.1 Fluxo Principal: Primeira Experiência

  

```

1. LANDING PAGE

   ↓

2. "Criar Meu Clone Digital" (CTA)

   ↓

3. MAPEAMENTO NUMEROLÓGICO (NOVO!)

   - Coleta nome completo (com acentos)

   - Data de nascimento

   - Sistema calcula Mapa Numerológico Cabalístico completo

   - Apresentação gamificada do mapa (estilo Obsidian)

   ↓

4. ESCOLHA DE ABORDAGEM

   - Esotérica (Numerologia + Astrologia)

   - Psicológica (TCC + Neurociência)

   - Híbrida (Integração de ambas)

   ↓

5. ONBOARDING DIRECIONADO

   - Perguntas adaptadas ao perfil numerológico identificado

   - 10-12 perguntas de personalidade específicas

   - Preview do clone personalizado

   ↓

6. PRIMEIRA CONVERSA

   - "Olá [Nome], sou você com clareza total baseada em seu mapa [tipo escolhido]. O que te trouxe aqui?"

   - Conversa de 5-10 minutos

   - Clone identifica padrões usando base numerológica

   ↓

7. DASHBOARD MULTI-DIMENSIONAL

   - Mapa numerológico visual

   - Resumo da primeira conversa

   - Insights cruzados (numerologia + comportamento)

   - Tabs para diferentes mapas (se escolheu híbrido)

   ↓

8. LOOP DE ENGAJAMENTO

   - Notificações baseadas em ciclos numerológicos pessoais

   - Conversas regulares com agentes especializados

   - Evolução do clone com dados comportamentais + numerológicos

```

  

### 4.2 Fluxo Secundário: Conversa Recorrente

  

```

1. LOGIN SIMPLES

   ↓

2. DASHBOARD

   - Últimas conversas

   - Insights pendentes

   - Sugestões de temas

   ↓

3. INICIAR CONVERSA

   - Escolha: Voz ou Texto

   - Tópico sugerido ou livre

   ↓

4. CONVERSAÇÃO

   - IA adapta tom baseado no estado emocional detectado

   - Intervenções micro-meditativas quando necessário

   - Identificação de padrões em tempo real

   ↓

5. PÓS-CONVERSA

   - Resumo automático

   - Insights capturados

   - Próximos passos sugeridos

```

  

### 4.3 Estados de Erro e Recuperação

  

| Erro | Recuperação |

|---|---|

| **API Gemini indisponível** | Fallback para GPT-4 ou modo offline com mensagem clara |

| **Microfone não funciona** | Redirect automático para chat por texto |

| **Conversa muito longa** | Auto-save a cada 2 minutos + aviso de limite |

| **Sistema prompt corrompido** | Re-geração automática baseada no perfil salvo |

| **Dados perdidos** | Backup automático no localStorage + Supabase |

  

---

  

## ️ 5. DATABASE SCHEMA (Prisma)

  

```prisma

// Schema para PostgreSQL/Supabase

generator client {

  provider = "prisma-client-js"

}

  

datasource db {

  provider = "postgresql"

  url      = env("DATABASE_URL")

}

  

model User {

  id                String    @id @default(cuid())

  email             String?   @unique

  name              String

  fullName          String    // Nome completo com acentos para numerologia

  birthDate         DateTime  // Data nascimento para cálculos numerológicos

  age               Int?

  createdAt         DateTime  @default(now())

  updatedAt         DateTime  @updatedAt

  // Dados de personalidade

  personalityData   Json      // Respostas do onboarding direcionado

  personaType       PersonaType? // Persona detectada automaticamente

  systemPrompt      String?   // System prompt personalizado

  selectedAgent     AgentType @default(HYBRID) // Tipo de agente escolhido

  // Configurações

  preferredMode     ConversationMode @default(TEXT)

  timezone          String?

  language          String    @default("pt-BR")

  // Relacionamentos

  numerologyMap     NumerologyMap?

  conversations     Conversation[]

  insights          Insight[]

  @@map("users")

}

  

model NumerologyMap {

  id                String    @id @default(cuid())

  userId            String    @unique

  // Números Principais (15+ calculados)

  motivacao         Int       // Soma das vogais do nome

  impressao         Int       // Primeira impressão que causa

  expressao         Int       // Soma total do nome completo

  destino           Int       // Soma da data de nascimento

  licoesCarmicas    Json      // Array de números que faltam

  tendenciasOcultas Json      // Array de números repetidos

  harmonicoSuperior Int       // Cálculo específico

  desafioMenor      Int       // Diferença entre mês e dia

  desafioMaior      Int       // Diferença entre ano e destino

  realizacao1       Int       // Primeira realização

  realizacao2       Int       // Segunda realização

  realizacao3       Int       // Terceira realização

  realizacaoFinal   Int       // Realização final

  anoUniversal      Int       // Ano atual em numerologia

  anoPessoal        Int       // Ciclo pessoal atual

  // Metadados dos cálculos

  calculatedAt      DateTime  @default(now())

  updatedAt         DateTime  @updatedAt

  isValidated       Boolean   @default(false) // Validação matemática

  // Relacionamentos

  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("numerology_maps")

}

  

model Conversation {

  id            String    @id @default(cuid())

  userId        String

  title         String?   // Auto-gerado ou definido pelo usuário

  mode          ConversationMode

  status        ConversationStatus @default(ACTIVE)

  summary       String?   // Resumo automático pós-conversa

  createdAt     DateTime  @default(now())

  updatedAt     DateTime  @updatedAt

  // Relacionamentos

  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  messages      Message[]

  insights      Insight[]

  @@map("conversations")

}

  

model Message {

  id              String    @id @default(cuid())

  conversationId  String

  role            MessageRole

  content         String    // Texto da mensagem

  audioUrl        String?   // URL do áudio se for voz

  timestamp       DateTime  @default(now())

  // Metadados

  emotionalTone   String?   // Detectado pela IA

  confidence      Float?    // Nível de confiança da resposta

  tokensUsed      Int?      // Para controle de custos

  // Relacionamentos

  conversation    Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  @@map("messages")

}

  

model Insight {

  id              String    @id @default(cuid())

  userId          String

  conversationId  String?   // Pode ser de conversa específica ou geral

  title           String

  description     String

  category        InsightCategory

  importance      InsightImportance @default(MEDIUM)

  isRead          Boolean   @default(false)

  createdAt       DateTime  @default(now())

  // Relacionamentos

  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  conversation    Conversation? @relation(fields: [conversationId], references: [id], onDelete: SetNull)

  @@map("insights")

}

  

// Enums

enum PersonaType {

  EMPREENDEDOR_TRAVADO

  EMPRESARIO_SOBRECARREGADO

  BUSCADORA_TOXICA

  BUSCADOR_FILOSOFICO

  HIGH_PERFORMER

  ESPIRITUAL

}

  

enum AgentType {

  ESOTERICO        // Numerologia + Astrologia

  PSICOLOGICO     // TCC + Neurociência

  HYBRID          // Integração de ambas abordagens

}

  

enum ConversationMode {

  VOICE

  TEXT

  MIXED

}

  

enum ConversationStatus {

  ACTIVE

  COMPLETED

  ARCHIVED

}

  

enum MessageRole {

  USER

  ASSISTANT

  SYSTEM

}

  

enum InsightCategory {

  PADRAO_COMPORTAMENTAL

  DECISAO_IMPORTANTE

  EMOCIONAL

  PROFISSIONAL

  RELACIONAMENTO

  AUTOCONHECIMENTO

}

  

enum InsightImportance {

  LOW

  MEDIUM

  HIGH

  CRITICAL

}

```

  

---

  

##  6. TECH STACK

  

### 6.1 Frontend

- **Framework:** Next.js 15 (App Router)

- **Language:** TypeScript

- **Styling:** Tailwind CSS + shadcn/ui

- **State Management:** Zustand (múltiplos estados de agentes)

- **Forms:** React Hook Form + Zod validation

- **Audio:** Web Audio API (nativo, zero custo)

- **Visualização:** D3.js ou Vis.js (para mapas estilo Obsidian)

- **Cálculos:** Custom numerology engine (TypeScript puro)

  

### 6.2 Backend & APIs

- **Database:** Supabase (PostgreSQL + Real-time + Auth)

- **ORM:** Prisma Client

- **Numerologia:** Sistema proprietário de cálculos (validação dupla)

- **AI APIs:**

  - Primary: Gemini 2.5 Flash Audio (Google AI Studio)

  - Backup: OpenAI GPT-4 (para fallback)

  - Multi-Agent: System prompts especializados por tipo (esotérico/psicológico/híbrido)

- **Vector DB:** Pinecone (free tier para embeddings numerológicos + comportamentais)

  

### 6.3 Deployment & Infrastructure

- **Hosting:** Vercel (free tier)

- **CDN:** Vercel Edge Network

- **Storage:** Supabase Storage (arquivos de áudio)

- **Auth:** Supabase Auth (social login)

- **Monitoring:** Vercel Analytics (gratuito)

  

### 6.4 Development Tools

- **Code Editor:** VS Code + PRD Assistant extension

- **Version Control:** Git + GitHub

- **Package Manager:** npm/yarn

- **Linting:** ESLint + Prettier

- **Testing:** Jest + React Testing Library (opcional para MVP)

  

### 6.5 Design System & UI Framework

  

**Conceito Visual:** "Clareza Digital Humanizada"

- **Filosofia:** Interface limpa que não distrai do autoconhecimento

- **Personalidade:** Empático mas direto, inteligente mas acessível, confiável mas inovador

  

**Sistema de Cores:**

```css

/* Primary - Azul Profundidade */

--sf-primary-500: #3b82f6;  /* Botões principais, links */

--sf-primary-600: #2563eb;  /* Hover states */

  

/* Secondary - Violeta Insight */

--sf-secondary-500: #a855f7; /* Personalização/clone */

  

/* Neutros */

--sf-neutral-50: #f9fafb;   /* Backgrounds claros */

--sf-neutral-600: #4b5563;  /* Texto principal */

--sf-neutral-800: #1f2937;  /* Texto importante */

```

  

**Tipografia:**

- **Fonte Principal:** Inter (Google Fonts)

- **Display:** 3rem+ para títulos principais (numerology results)

- **Body:** 1rem para texto padrão (chat, descrições)

- **Caption:** 0.875rem para metadados (timestamps, labels)

  

**Componentes Principais:**

- **Cards Numerológicos:** Visual estilo Obsidian com animações suaves

- **Chat Interface:** Bubbles humanizados, indicadores de typing

- **Botões:** Primary (azul sólido), Secondary (outline), Ghost

- **Dashboard:** Grid responsivo com métricas visuais

  

**Animações & Micro-interações:**

- **Transições:** 250ms cubic-bezier(0, 0, 0.2, 1)

- **Number Reveal:** Animação especial para resultados numerológicos

- **Loading States:** Indicators suaves, não intrusivos

- **Hover Effects:** Subtle scale + shadow

  

**Responsividade:**

- **Mobile-First:** Design prioritiza experiência mobile

- **Breakpoints:** 640px (tablet), 768px (desktop), 1024px (large)

- **Touch-Friendly:** Buttons 44px+ mínimo, gestures naturais

  

**Acessibilidade (WCAG 2.1 AA):**

- **Contraste:** Mínimo 4.5:1 para texto normal

- **Focus States:** Outline visível para navegação por teclado

- **ARIA Labels:** Screen reader friendly

- **Color Independence:** Informação não depende apenas de cor

  

**Referência Completa:** [Briefing 7 - Design System e Referencias Visuais.md](./docs/Briefing%207%20-%20Design%20System%20e%20Referencias%20Visuais.md)

  

---

  

##  7. CRITÉRIOS DE ACEITAÇÃO

  

### 7.1 RF001 - Mapeamento Numerológico Cabalístico

  

**Critério:** Sistema deve calcular mapa numerológico completo com 100% de precisão matemática

  

**Acceptance Criteria:**

  

- [ ] Interface de coleta nome completo (validação acentos) + data nascimento @frontend PRD-001001

- [ ] Implementar 15+ cálculos numerológicos (Motivação, Impressão, Expressão, etc.) @backend PRD-001002

- [ ] Sistema de validação matemática com dupla verificação @backend PRD-001003

- [ ] Armazenamento seguro dos dados numerológicos no Supabase @backend PRD-001004

- [ ] API para gerar mapa numerológico completo @backend PRD-001005

- [ ] Tratamento de casos especiais (números mestres 11, 22, 33) @backend PRD-001006

- [ ] Log de auditoria para debugging de cálculos @backend PRD-001007

  

### 7.2 RF003 - Apresentação Gamificada do Mapa

  

**Critério:** Interface visual deve apresentar 15+ números de forma intuitiva e interativa

  

**Acceptance Criteria:**

  

- [ ] Layout tipo Obsidian Graph com nodes conectados @frontend PRD-003001

- [ ] Cards interativos para cada número calculado @frontend PRD-003002

- [ ] Animações suaves de entrada/saída dos elementos @frontend PRD-003003

- [ ] Tooltips explicativos para cada número @frontend PRD-003004

- [ ] Modo escuro/claro para visualização @frontend PRD-003005

- [ ] Responsividade para mobile (touch interactions) @frontend PRD-003006

- [ ] Opção de compartilhar mapa via link/imagem @frontend PRD-003007

  

### 7.2 RF002 - Clone Digital Personalizado

  

**Critério:** IA deve responder de forma consistente com a personalidade mapeada em >85% das interações

  

**Acceptance Criteria:**

- [ ] **AC002.1** - System prompt dinâmico gerado baseado nas respostas do onboarding

- [ ] **AC002.2** - Adaptação do tom/linguagem baseado na persona detectada

- [ ] **AC002.3** - Referências específicas às informações fornecidas pelo usuário

- [ ] **AC002.4** - Consistência de personalidade entre conversas (não contradições)

- [ ] **AC002.5** - Capacidade de "lembrar" informações de conversas anteriores

- [ ] **AC002.6** - Evolução gradual do clone baseada em novas interações

- [ ] **AC002.7** - Fallback gracioso quando informações são insuficientes

  

### 7.3 RF003 - Conversação por Voz

  

**Critério:** Áudio bidirecional funcional com latência <3 segundos em 90% dos casos

  

**Acceptance Criteria:**

- [ ] **AC003.1** - Gravação de áudio via Web Audio API com indicador visual

- [ ] **AC003.2** - Transcrição automática do áudio para texto (via Gemini Audio)

- [ ] **AC003.3** - Resposta em áudio sintético com voz natural

- [ ] **AC003.4** - Controles de play/pause/stop para áudio de resposta

- [ ] **AC003.5** - Indicador de status (gravando/processando/respondendo)

- [ ] **AC003.6** - Fallback para texto se áudio falhar

- [ ] **AC003.7** - Histórico mostra tanto áudio quanto transcrição

  

### 7.4 RF004 - Conversação por Texto

  

**Critério:** Interface de chat responsiva com typing indicators e formatação adequada

  

**Acceptance Criteria:**

- [ ] **AC004.1** - Input field com auto-resize e contador de caracteres

- [ ] **AC004.2** - Envio por Enter (ou Shift+Enter para nova linha)

- [ ] **AC004.3** - Typing indicator enquanto IA processa resposta

- [ ] **AC004.4** - Mensagens formatadas com Markdown básico (negrito, itálico, listas)

- [ ] **AC004.5** - Scroll automático para última mensagem

- [ ] **AC004.6** - Timestamps relativos (há 2 minutos, ontem, etc.)

- [ ] **AC004.7** - Botão para alternar entre voz e texto durante conversa

  

### 7.5 RF005 - Histórico de Conversas

  

**Critério:** Todas as conversas são salvas automaticamente com busca e organização eficientes

  

**Acceptance Criteria:**

- [ ] **AC005.1** - Lista de conversas ordenada por data (mais recente primeiro)

- [ ] **AC005.2** - Título automático gerado baseado no conteúdo da conversa

- [ ] **AC005.3** - Busca por palavra-chave no conteúdo das conversas

- [ ] **AC005.4** - Filtros por data, duração e modo (voz/texto)

- [ ] **AC005.5** - Preview de 2-3 linhas do conteúdo na lista

- [ ] **AC005.6** - Possibilidade de renomear título da conversa

- [ ] **AC005.7** - Backup automático no localStorage + sincronização com Supabase

  

### 7.6 RF006 - Personas Adaptativas

  

**Critério:** System prompt se adapta automaticamente baseado no perfil com >90% de precisão na detecção

  

**Acceptance Criteria:**

- [ ] **AC006.1** - Algoritmo detecta persona mais provável baseado nas respostas

- [ ] **AC006.2** - Linguagem/tom adaptado para cada uma das 6 personas definidas

- [ ] **AC006.3** - Exemplos específicos relevantes para o contexto de cada persona

- [ ] **AC006.4** - Possibilidade de override manual da persona detectada

- [ ] **AC006.5** - Histórico mostra qual persona estava ativa em cada conversa

- [ ] **AC006.6** - Re-detecção periódica baseada em novas informações

- [ ] **AC006.7** - Transição suave entre personas se houver mudança

  

### 7.7 RF007 - Dashboard de Insights

  

**Critério:** Painel apresenta descobertas relevantes de forma visual e acionável

  

**Acceptance Criteria:**

- [ ] **AC007.1** - Cards com insights categorizados (comportamental, emocional, profissional)

- [ ] **AC007.2** - Indicadores visuais de importância (crítico, alto, médio, baixo)

- [ ] **AC007.3** - Timestamps de quando cada insight foi descoberto

- [ ] **AC007.4** - Possibilidade de marcar insights como "lidos"

- [ ] **AC007.5** - Geração automática de insights baseada em padrões das conversas

- [ ] **AC007.6** - Export de insights para formato legível (PDF/Markdown)

- [ ] **AC007.7** - Sugestões de próximas conversas baseadas nos insights

  

---

  

##  8. MÉTRICAS DE SUCESSO

  

### 8.1 Métricas Técnicas (MVP)

- **Uptime:** >99% (monitorado via Vercel)

- **Latência de resposta:** <3s para texto, <5s para áudio

- **Taxa de erro da API:** <2%

- **Tempo de carregamento inicial:** <2s

  

### 8.2 Métricas de Produto (Pós-MVP)

- **Taxa de conclusão do mapeamento numerológico:** >95%

- **Taxa de escolha de agente (não sair no híbrido):** >70%

- **Conversas por usuário/semana:** 3+ (engajamento)

- **Sessão média:** 10-15 minutos

- **Retenção D7:** >60%

- **Retenção D30:** >40%

  

### 8.3 Métricas de Qualidade Numerológica

- **Precisão matemática dos cálculos:** 100% (validação dupla obrigatória)

- **NPS específico do mapa numerológico:** >75

- **Satisfação com apresentação visual:** >4.3/5

- **Taxa de compartilhamento do mapa:** >25%

- **Insights numerológicos úteis:** >5 por usuário nos primeiros 3 dias

  

### 8.4 Métricas de Qualidade Conversacional

- **NPS conversas com clone:** >70

- **Satisfação com respostas multi-dimensionais:** >4.2/5

- **Precisão da persona + agente detectado:** >85% (validação manual)

- **Consistência numerológica nas respostas:** >90% (auditoria IA)

  

---

  

##  9. REQUISITOS NÃO-FUNCIONAIS

  

### 9.1 Performance

- **Responsividade:** Design responsivo para mobile-first

- **Otimização de imagens:** Next.js Image Optimization

- **Lazy loading:** Componentes e rotas carregadas sob demanda

- **Caching:** Cache agressivo de respostas similares

  

### 9.2 Segurança & Privacidade

- **Autenticação:** Supabase Auth com social login (Google, GitHub)

- **Criptografia:** Dados sensíveis criptografados em repouso

- **GDPR Compliance:** Possibilidade de download/deletar todos os dados

- **Rate limiting:** Prevenção de abuso das APIs

- **Sanitização:** Input sanitization para prevenir XSS

  

### 9.3 Escalabilidade

- **Arquitetura serverless:** Vercel Edge Functions

- **Database scaling:** Supabase auto-scaling

- **CDN global:** Assets servidos via Vercel Edge Network

- **API management:** Circuit breakers para APIs externas

  

### 9.4 Usabilidade

- **Acessibilidade:** WCAG 2.1 AA compliance

- **PWA:** Progressive Web App para instalação mobile

- **Offline support:** Funcionalidades básicas offline via service worker

- **Multi-idioma:** Preparado para internacionalização (i18n)

  

### 9.5 Monitoramento

- **Error tracking:** Sentry para captura de erros

- **Analytics:** Vercel Analytics + custom events

- **Performance monitoring:** Core Web Vitals tracking

- **API monitoring:** Uptime e latência das APIs externas

- **Auditoria numerológica:** Log detalhado de todos os cálculos para debugging

  

### 9.6 Considerações Especiais - Sistema Numerológico

- **Precisão matemática:** Zero tolerância a erros de cálculo (validação dupla obrigatória)

- **Caracteres especiais:** Suporte completo a acentos em nomes (ã, ç, é, etc.)

- **Datas edge cases:** Validação de anos bissextos, datas inválidas

- **Performance:** Cálculos numerológicos devem ser <100ms mesmo para nomes longos

- **Backup de dados:** Mapa numerológico é critical data, backup triplo

- **Privacidade especial:** Nome completo + data nascimento = dados sensíveis

- **Auditabilidade:** Cada cálculo deve ser rastreável e reproduzível

  

---

  

##  10. ROADMAP DE IMPLEMENTAÇÃO (PRD Assistant Compatible)

  

### Fase 1: Fundação + Sistema Numerológico + Design System (Horas 1-2)

- [ ] Setup projeto Next.js com TypeScript + Tailwind @dev PRD-100001

- [ ] Configurar Supabase database + authentication @dev PRD-100002

- [ ] Setup Prisma schema com NumerologyMap model @dev PRD-100003

- [ ] **Implementar Design System base (cores, tipografia, componentes)** @dev PRD-100004

- [ ] **Implementar engine de cálculos numerológicos (15+ tipos)** @dev PRD-100005

- [ ] **Sistema de validação matemática dupla** @dev PRD-100006

- [ ] Estrutura de componentes base + D3.js setup @dev PRD-100007

  

### Fase 2: Mapeamento & Visualização (Horas 3-4)

- [ ] **Interface de coleta nome completo + data nascimento** @dev PRD-100007

- [ ] **Sistema de apresentação gamificada (estilo Obsidian)** @dev PRD-100008

- [ ] **Seletor de agente especializado (3 tipos)** @dev PRD-100009

- [ ] **Onboarding direcionado baseado no mapa numerológico** @dev PRD-100010

- [ ] Sistema multi-agente com prompts especializados @dev PRD-100011

- [ ] **Dashboard multi-modal (numerológico + comportamental)** @dev PRD-100012

  

### Fase 3: Clone Multi-Dimensional + Áudio (Horas 5-6)

- [ ] **Integração mapa numerológico + perfil comportamental** @dev PRD-100013

- [ ] Implementar conversação por voz (Gemini Live API) @dev PRD-100014

- [ ] Interface de chat por texto funcional @dev PRD-100015

- [ ] **Clone IA que referencia insights numerológicos** @dev PRD-100016

- [ ] Sistema de salvamento integrado (mapa + conversas) @dev PRD-100017

- [ ] Deploy pipeline Vercel + environment setup @dev PRD-100018

  

### Fase 4: Refinamento (Pós-MVP)

- [ ] Implementar Modo Devaneio (simulação cenários) @dev PRD-100019

- [ ] Sistema de micro-meditações adaptativas @dev PRD-100020

- [ ] Avatar visual animado reagindo ao áudio @dev PRD-100021

- [ ] Gamificação básica (pontos, níveis) @dev PRD-100022

- [ ] Sistema de exportação (PDF/Markdown) @dev PRD-100023

- [ ] Métricas e analytics básicas @dev PRD-100024

  

---

  

## ️ 11. GUIA DE IMPLEMENTAÇÃO RÁPIDA

  

### 11.1 Setup Inicial com PRD Assistant

  

**IMPORTANTE:** Este PRD foi criado para funcionar com a **PRD Assistant Extension** para VS Code.

  

#### Instalação da Extensão:

- [ ] Instalar PRD Assistant no VS Code (fusepilot.prd-assistant) @dev PRD-300001

- [ ] Configurar file patterns para *.md files @dev PRD-300002  

- [ ] Verificar tree view funcional no sidebar @dev PRD-300003

  

#### Como Usar Este PRD:

- Todas as tasks têm **IDs únicos** (PRD-XXXXXX) para tracking

- **@username** assignments para cada task  

- **Checkboxes interativas** - clique para marcar como done

- **Progress tracking** automático no sidebar

- **Deep linking** - clique em qualquer PRD-XXXXXX para navegar

  

### 11.2 Começar com Google AI Studio

  

```bash

# 1. Clone base do Native Audio Function Call Sandbox

git clone https://github.com/google-gemini/cookbook

cd cookbook/gemini-2/live-api/native-audio-function-call-sandbox

  

# 2. Instalar dependências  

npm install

  

# 3. Configurar API key

cp .env.example .env

# Adicionar GOOGLE_AI_API_KEY

  

# 4. Rodar localmente

npm run dev

```

  

### 11.2 Adaptações Necessárias

  

1. **Remover templates** de customer service

2. **Adicionar onboarding** de personalidade

3. **Implementar detecção** de personas

4. **Personalizar system prompt** dinâmico

5. **Adicionar histórico** com Supabase

  

### 11.3 System Prompt Template

  

```typescript

const generateSystemPrompt = (personalityData: any, persona: PersonaType) => {

  const basePrompt = `Você é o clone digital de ${personalityData.name}.

  Você tem clareza total sobre quem ele/ela é, sem filtros emocionais ou autossabotagem.

  PERSONALIDADE DETECTADA: ${persona}

  DADOS PESSOAIS:

  - Idade: ${personalityData.age}

  - Situação atual: ${personalityData.currentSituation}

  - Principais desafios: ${personalityData.challenges}

  - Valores importantes: ${personalityData.values}

  COMO RESPONDER:

  - Fale como ${personalityData.name} falaria, mas com total clareza emocional

  - Use as mesmas expressões e vocabulário

  - Seja direto sobre padrões de autossabotagem

  - Ofereça perspectivas que ele/ela não consegue ver sozinho(a)

  - Nunca julgue, apenas reflita com clareza total

  PERSONA ESPECÍFICA: ${getPersonaInstructions(persona)}`;

  return basePrompt;

};

```

  

### 11.4 Estrutura de Arquivos

  

```

src/

├── app/

│   ├── numerology/

│   │   └── page.tsx           # Sistema mapeamento numerológico

│   ├── agent-selection/

│   │   └── page.tsx           # Escolha de agente especializado

│   ├── onboarding/

│   │   └── page.tsx           # Onboarding direcionado

│   ├── chat/

│   │   └── page.tsx           # Interface chat multi-dimensional

│   ├── dashboard/

│   │   └── page.tsx           # Dashboard integrado (mapa + insights)

│   └── layout.tsx

├── components/

│   ├── ui/                    # shadcn/ui components

│   ├── numerology/

│   │   ├── NumerologyForm.tsx     # Coleta nome + data

│   │   ├── NumerologyMap.tsx      # Visualização estilo Obsidian

│   │   └── NumerologyCard.tsx     # Cards individuais por número

│   ├── agents/

│   │   ├── AgentSelector.tsx      # Seleção de agente

│   │   └── AgentPromptBuilder.tsx # Construção de prompts

│   ├── AudioChat.tsx          # Voice conversation

│   ├── TextChat.tsx           # Text conversation multi-agente

│   ├── PersonalityDetector.tsx # Persona + numerology detection

│   └── InsightCard.tsx        # Insights multi-dimensionais

├── lib/

│   ├── numerology/

│   │   ├── calculator.ts      # Engine de cálculos (15+ tipos)

│   │   ├── validator.ts       # Validação matemática dupla

│   │   └── interpreter.ts     # Interpretação dos números

│   ├── agents/

│   │   ├── esoterico.ts       # Prompts numerologia + astrologia

│   │   ├── psicologico.ts     # Prompts TCC + neurociência

│   │   └── hibrido.ts         # Integração de ambos

│   ├── gemini.ts              # Gemini API multi-agente

│   ├── supabase.ts           # Supabase client + numerology

│   ├── personas.ts           # Persona definitions

│   └── utils.ts

├── types/

│   ├── numerology.ts         # Types numerológicos

│   ├── agents.ts             # Types de agentes

│   └── index.ts              # TypeScript definitions

└── hooks/

    ├── useNumerology.ts      # Mapa numerológico

    ├── useAgentSelector.ts   # Seleção de agente

    ├── useAudio.ts           # Audio recording hook

    ├── usePersonality.ts     # Personality detection integrada

    └── useConversation.ts    # Chat management multi-dimensional

```

  

---

  

##  12. DEFINIÇÃO DE PRONTO (DOD)

  

### Para cada funcionalidade ser considerada "Done":

  

 **Desenvolvimento:**

- [ ] Código implementado seguindo padrões TypeScript

- [ ] Componentes responsivos (mobile-first)

- [ ] Integração com APIs funcionando

- [ ] Tratamento de erros implementado

  

 **Qualidade:**

- [ ] Testado manualmente em Chrome, Safari, Firefox

- [ ] Testado em dispositivos mobile (iOS/Android)

- [ ] Performance adequada (< 3s resposta)

- [ ] Acessibilidade básica (keyboard navigation)

  

 **Dados:**

- [ ] Schema do banco atualizado

- [ ] Migrations executadas

- [ ] Backup/restore funcionando

- [ ] Dados persistindo corretamente

  

 **Deploy:**

- [ ] Deploy automático na Vercel funcionando

- [ ] Environment variables configuradas

- [ ] Monitoramento básico ativo

- [ ] URL de produção acessível

  

---

  

##  13. CRITÉRIOS DE SUCESSO DO MVP

  

### Objetivo: Validar o conceito de Clone Digital personalizado

  

**Métricas Primárias:**

1. **Usuários completam onboarding:** >70%

2. **Têm conversas significativas:** >5 min primeira sessão

3. **Retornam em 48h:** >40%

4. **Avaliam positivamente:** >4/5 stars

  

**Sinais de Sucesso Qualitativo:**

- Usuários expressam surpresa com precisão do clone

- Compartilham insights obtidos espontaneamente

- Perguntam sobre funcionalidades futuras

- Recomendam para conhecidos

  

**Critérios de Pivot:**

- <30% completam onboarding (UX complexa demais)

- <2 min sessão média (clone não é envolvente)

- <10% retorno (produto não gera valor)

  

---

  

##  14. REFERÊNCIAS E RECURSOS

  

### Documentação Técnica:

- [Gemini 2.5 Flash Audio API](https://ai.google.dev/gemini-api/docs/audio)

- [Next.js 15 Documentation](https://nextjs.org/docs)

- [Supabase Documentation](https://supabase.com/docs)

- [Prisma Documentation](https://www.prisma.io/docs)

  

### Apps de Referência (Google AI Studio):

- **Native Audio Function Call Sandbox** - Base para conversação por voz

- **ChatterBots** - Sistema de personas e customização

- **Dictation App** - Interface de insights e notas

  

### Inspirações de Produto:

- **Replika** - Relacionamento com IA personalizada (mas genérica)

- **Character.AI** - Múltiplas personas (mas não personalizadas)

- **Notion AI** - Integration seamless com workflow

  

---

  

##  15. PRÓXIMOS PASSOS IMEDIATOS

  

### Para Começar AGORA (Com PRD Assistant):

  

#### Setup da Extensão PRD Assistant:

  

- [ ] Abrir este arquivo PRD no VS Code @dev PRD-400001

- [ ] Instalar extensão PRD Assistant (fusepilot.prd-assistant) @dev PRD-400002

- [ ] Verificar sidebar "PRD Explorer" funcionando @dev PRD-400003

- [ ] Testar clique nas checkboxes (devem ser interativas) @dev PRD-400004

- [ ] Ver progress tracking automático funcionando @dev PRD-400005

  

#### Setup do Projeto:

  

- [ ] Clone repositório base Google AI Studio @dev PRD-400006

- [ ] Configure Google AI Studio API key @dev PRD-400007  

- [ ] Configure Supabase project URL e anon key @dev PRD-400008

- [ ] Teste hello world Gemini API @dev PRD-400009

- [ ] Setup inicial Vercel deploy @dev PRD-400010

  

#### Adaptações Prioritárias:

  

- [ ] Remover templates customer service existentes @dev PRD-400011

- [ ] Implementar onboarding personalidade (PRD-100007) @dev PRD-400012

- [ ] Sistema detecção personas (PRD-100008) @dev PRD-400013

- [ ] Chat funcional com clone personalizado (PRD-100010) @dev PRD-400014

  

#### Controle via PRD Assistant:

  

- **Usar tree view** para ver progresso geral

- **Marcar tasks** como done conforme implementa

- **Assignments @dev** para tracking de responsabilidade

- **Deep links** PRD-XXXXXX para navegação rápida

  

**Tempo estimado até MVP funcional: 4-6 horas de desenvolvimento focado**

  

---

  

##  CHECKLIST FINAL PRD

  

### Completude (10/10 seções obrigatórias):

- [x] **Visão do Produto** - Multi-dimensional (numerologia + comportamental) ✓

- [x] **Personas de Usuário** - 6 personas adaptadas ao fluxo numerológico ✓

- [x] **Requisitos Funcionais** - 21 RFs incluindo sistema numerológico completo ✓

- [x] **Sistema Numerológico** - 15+ cálculos detalhados com validações ✓

- [x] **User Flows** - Fluxo integrado: numerologia → agente → clone ✓

- [x] **Database Schema** - Prisma com NumerologyMap e AgentType ✓

- [x] **Tech Stack** - Específico incluindo engine numerológico e visualização ✓

- [x] **Critérios de Aceitação** - Testáveis para sistema multi-dimensional ✓

- [x] **Métricas de Sucesso** - KPIs numerológicos + comportamentais ✓

- [x] **Requisitos Não-Funcionais** - Precisão matemática + considerações especiais ✓

  

### Qualidade Numerológica:

- [x] **Sistema de cálculos completo** - 15+ tipos numerológicos implementáveis ✓

- [x] **Validação matemática dupla** - Zero tolerância a erros ✓

- [x] **Multi-agente especializado** - Esotérico, psicológico, híbrido ✓

- [x] **Implementável diretamente** - Stack definida, engine numerológico detalhado ✓

- [x] **User stories completas** - Formato correto com critérios ✓

- [x] **Schema alinha com features** - Todas funcionalidades suportadas ✓

- [x] **Tech stack específico** - Versões e justificativas ✓

- [x] **Orçamento zero** - Apenas pay-per-use APIs ✓

  

### Implementabilidade:

- [x] **MVP em 4-6h** - Roadmap detalhado ✓

- [x] **Base existente identificada** - Google AI Studio apps ✓

- [x] **Deploy path claro** - Vercel + Supabase ✓

- [x] **Fallbacks definidos** - Para APIs e estados de erro ✓

  

---

  

**STATUS FINAL:**  **PRD APROVADO - PRONTO PARA IMPLEMENTAÇÃO**

  

Este PRD está completo, implementável e otimizado para desenvolvimento rápido com IA. O conceito do Self Flow está bem fundamentado, a tecnologia está disponível e o path de implementação está claro.

  

**Próximo passo:** Clone o Native Audio Function Call Sandbox e comece a adaptação seguindo o roadmap definido.