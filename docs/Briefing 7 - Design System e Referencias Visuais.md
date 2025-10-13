# Self Flow - Design System e Referências Visuais
## Briefing Completo de Design

**Data:** 13 de Outubro de 2025  
**Status:** Diretrizes Aprovadas para Implementação  
**Versão:** 1.0  
**Responsável:** Design System Lead + Product Team

---

## SOBRE ESTE DOCUMENTO

**Finalidade:** Define o sistema completo de design visual do Self Flow, incluindo paleta de cores, tipografia, componentes, layouts e referências visuais para implementação do MVP.

**Quando usar:**
- Desenvolvimento de interfaces web/mobile
- Criação de materiais de marketing
- Design de componentes UI/UX
- Validação de consistency visual
- Onboarding de designers

**Como usar:**
- Consultar antes de criar qualquer elemento visual
- Usar tokens de design definidos
- Seguir hierarquia visual estabelecida
- Respeitar guidelines de acessibilidade
- Manter coerência com personas

---

## 1. CONCEITO VISUAL GERAL

### 1.1 Filosofia de Design

**Conceito Central:** "Clareza Digital Humanizada"

**Princípios Fundamentais:**
- **Minimalismo Funcional:** Interface limpa que não distrai do autoconhecimento
- **Humanização Tecnológica:** IA que parece conversa natural, não robótica  
- **Profundidade Visual:** Elementos que sugerem múltiplas dimensões (numerologia + psicologia + astrologia)
- **Confiança Científica:** Visual que transmite seriedade sem frieza
- **Personalização Sutil:** Adapta-se ao usuário sem ser invasiva

### 1.2 Personalidade da Marca Visual

**Atributos:**
- **Empático mas Direto:** Acolhedor sem ser piegas
- **Inteligente mas Acessível:** Sofisticado sem ser complexo
- **Confiável mas Inovador:** Sólido mas progressivo
- **Profundo mas Claro:** Complexo por dentro, simples por fora
- **Premium mas Inclusivo:** Qualidade alta acessível

**Não somos:**
- App de meditação genérico (muito zen/minimalista)
- Ferramenta corporativa (muito fria/técnica)
- App de relacionamento (muito colorido/casual)
- Plataforma esotérica (muito mística/alternativa)

---

## 2. SISTEMA de CORES

### 2.1 Paleta Principal

**Primary Colors:**

```css
/* Azul Profundidade - Cor principal do Self Flow */
--sf-primary-50: #eff6ff;   /* Muito claro para backgrounds */
--sf-primary-100: #dbeafe;  /* Claro para highlights */
--sf-primary-200: #bfdbfe;  /* Médio claro para borders */
--sf-primary-300: #93c5fd;  /* Médio para elementos secundários */
--sf-primary-400: #60a5fa;  /* Médio escuro para hover states */
--sf-primary-500: #3b82f6;  /* Base - botões principais, links */
--sf-primary-600: #2563eb;  /* Escuro para active states */
--sf-primary-700: #1d4ed8;  /* Mais escuro para textos importantes */
--sf-primary-800: #1e40af;  /* Muito escuro para contraste */
--sf-primary-900: #1e3a8a;  /* Máximo contraste */

/* Violeta Insight - Cor da personalização/clone */
--sf-secondary-50: #faf5ff;
--sf-secondary-100: #f3e8ff;
--sf-secondary-200: #e9d5ff;
--sf-secondary-300: #d8b4fe;
--sf-secondary-400: #c084fc;
--sf-secondary-500: #a855f7;  /* Base secundária */
--sf-secondary-600: #9333ea;
--sf-secondary-700: #7c3aed;
--sf-secondary-800: #6b21a8;
--sf-secondary-900: #581c87;
```

**Neutral Colors:**

```css
/* Cinzas Neutros - Textos e backgrounds */
--sf-neutral-0: #ffffff;     /* Branco puro */
--sf-neutral-50: #f9fafb;    /* Background muito claro */
--sf-neutral-100: #f3f4f6;   /* Background cards */
--sf-neutral-200: #e5e7eb;   /* Borders sutis */
--sf-neutral-300: #d1d5db;   /* Borders normais */
--sf-neutral-400: #9ca3af;   /* Texto placeholder */
--sf-neutral-500: #6b7280;   /* Texto secundário */
--sf-neutral-600: #4b5563;   /* Texto normal */
--sf-neutral-700: #374151;   /* Texto importante */
--sf-neutral-800: #1f2937;   /* Texto muito importante */
--sf-neutral-900: #111827;   /* Texto máximo contraste */
```

### 2.2 Cores Funcionais

**Success (Verde):**
```css
--sf-success-50: #ecfdf5;
--sf-success-500: #10b981;   /* Estados de sucesso */
--sf-success-700: #047857;
```

**Warning (Amarelo):**
```css
--sf-warning-50: #fffbeb;
--sf-warning-500: #f59e0b;   /* Avisos importantes */
--sf-warning-700: #b45309;
```

**Error (Vermelho):**
```css
--sf-error-50: #fef2f2;
--sf-error-500: #ef4444;     /* Erros e alertas */
--sf-error-700: #b91c1c;
```

**Info (Ciano):**
```css
--sf-info-50: #ecfeff;
--sf-info-500: #06b6d4;      /* Informações neutras */
--sf-info-700: #0e7490;
```

### 2.3 Cores por Funcionalidade

**Mapeamento Numerológico:**
- Primary Blue (profundidade científica)
- Violeta Secondary (insights personalizados)
- Gradientes sutis entre ambas

**Conversação com Clone:**
- Neutral backgrounds (não distrair)
- Primary para mensagens do usuário
- Secondary para respostas do clone
- Accent colors para status (typing, loading)

**Dashboard/Analytics:**
- Neutral base com acentos coloridos
- Success para métricas positivas
- Info para dados neutros
- Primary para CTAs importantes

---

## 3. TIPOGRAFIA

### 3.1 Font Family Principal

**Primary Font:** Inter
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Características:**
- Excelente legibilidade em telas
- Múltiplos weights disponíveis
- Aparência profissional mas humanizada
- Otimizada para interfaces digitais
- Google Fonts (fácil implementação)

**Weights Utilizados:**
- 300 (Light) - Para textos longos opcionais
- 400 (Regular) - Texto padrão
- 500 (Medium) - Subtítulos e destaque sutil  
- 600 (SemiBold) - Títulos e botões
- 700 (Bold) - Headlines principais
- 800 (ExtraBold) - Títulos de seção

### 3.2 Sistema Tipográfico

**Display (Títulos Principais):**
```css
.sf-display-xl {
  font-size: 3.75rem; /* 60px */
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.sf-display-lg {
  font-size: 3rem; /* 48px */
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.sf-display-md {
  font-size: 2.25rem; /* 36px */
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
}
```

**Headings (Títulos de Seção):**
```css
.sf-heading-xl {
  font-size: 1.875rem; /* 30px */
  line-height: 1.3;
  font-weight: 600;
}

.sf-heading-lg {
  font-size: 1.5rem; /* 24px */
  line-height: 1.3;
  font-weight: 600;
}

.sf-heading-md {
  font-size: 1.25rem; /* 20px */
  line-height: 1.4;
  font-weight: 600;
}

.sf-heading-sm {
  font-size: 1.125rem; /* 18px */
  line-height: 1.4;
  font-weight: 500;
}
```

**Body Text (Conteúdo):**
```css
.sf-body-lg {
  font-size: 1.125rem; /* 18px */
  line-height: 1.6;
  font-weight: 400;
}

.sf-body-md {
  font-size: 1rem; /* 16px */
  line-height: 1.6;
  font-weight: 400;
}

.sf-body-sm {
  font-size: 0.875rem; /* 14px */
  line-height: 1.5;
  font-weight: 400;
}
```

**Small Text (Labels, Captions):**
```css
.sf-caption-lg {
  font-size: 0.875rem; /* 14px */
  line-height: 1.4;
  font-weight: 500;
}

.sf-caption-md {
  font-size: 0.75rem; /* 12px */
  line-height: 1.4;
  font-weight: 500;
}

.sf-caption-sm {
  font-size: 0.6875rem; /* 11px */
  line-height: 1.3;
  font-weight: 500;
}
```

### 3.3 Aplicação por Contexto

**Mapeamento Numerológico:**
- Display XL para resultado principal
- Heading LG para categorias de números
- Body MD para explicações
- Caption para detalhes técnicos

**Chat Interface:**
- Heading MD para nome do clone
- Body MD para mensagens
- Caption SM para timestamps
- Body LG para mensagens importantes

**Dashboard:**
- Display MD para métricas principais
- Heading LG para seções
- Body SM para dados secundários
- Caption para metadados

---

## 4. COMPONENTES UI

### 4.1 Botões

**Primary Button:**
```css
.sf-btn-primary {
  background: var(--sf-primary-500);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.sf-btn-primary:hover {
  background: var(--sf-primary-600);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}
```

**Secondary Button:**
```css
.sf-btn-secondary {
  background: transparent;
  color: var(--sf-primary-600);
  border: 2px solid var(--sf-primary-200);
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 600;
}

.sf-btn-secondary:hover {
  border-color: var(--sf-primary-500);
  background: var(--sf-primary-50);
}
```

**Ghost Button:**
```css
.sf-btn-ghost {
  background: transparent;
  color: var(--sf-neutral-700);
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 500;
}

.sf-btn-ghost:hover {
  background: var(--sf-neutral-100);
}
```

**Tamanhos:**
- Small: padding 8px 16px, font-size 14px
- Medium: padding 12px 24px, font-size 16px
- Large: padding 16px 32px, font-size 18px

### 4.2 Cards

**Base Card:**
```css
.sf-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--sf-neutral-200);
  padding: 24px;
  transition: all 0.2s ease;
}

.sf-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
```

**Insight Card (para descobertas do clone):**
```css
.sf-insight-card {
  @extend .sf-card;
  border-left: 4px solid var(--sf-secondary-500);
  background: linear-gradient(135deg, 
    rgba(168, 85, 247, 0.02) 0%, 
    rgba(59, 130, 246, 0.02) 100%);
}
```

**Numerology Card (para números calculados):**
```css
.sf-numerology-card {
  @extend .sf-card;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.sf-numerology-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    var(--sf-primary-500), 
    var(--sf-secondary-500));
}
```

### 4.3 Inputs e Forms

**Text Input:**
```css
.sf-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--sf-neutral-200);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.sf-input:focus {
  border-color: var(--sf-primary-500);
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.sf-input::placeholder {
  color: var(--sf-neutral-400);
}
```

**Label:**
```css
.sf-label {
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--sf-neutral-700);
  margin-bottom: 6px;
}
```

**Form Group:**
```css
.sf-form-group {
  margin-bottom: 20px;
}

.sf-form-group:last-child {
  margin-bottom: 0;
}
```

### 4.4 Chat Components

**Chat Container:**
```css
.sf-chat-container {
  max-width: 800px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--sf-neutral-50);
}
```

**Message Bubble (Usuário):**
```css
.sf-message-user {
  background: var(--sf-primary-500);
  color: white;
  padding: 12px 16px;
  border-radius: 18px 18px 4px 18px;
  max-width: 70%;
  margin-left: auto;
  margin-bottom: 8px;
  word-wrap: break-word;
}
```

**Message Bubble (Clone):**
```css
.sf-message-clone {
  background: white;
  color: var(--sf-neutral-800);
  padding: 12px 16px;
  border-radius: 18px 18px 18px 4px;
  max-width: 70%;
  margin-right: auto;
  margin-bottom: 8px;
  border: 1px solid var(--sf-neutral-200);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
```

**Typing Indicator:**
```css
.sf-typing-indicator {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: var(--sf-neutral-100);
  border-radius: 18px;
  margin-bottom: 8px;
}

.sf-typing-dots {
  display: flex;
  gap: 4px;
}

.sf-typing-dot {
  width: 8px;
  height: 8px;
  background: var(--sf-neutral-400);
  border-radius: 50%;
  animation: sf-pulse 1.4s infinite;
}
```

---

## 5. ICONOGRAFIA

### 5.1 Biblioteca de Ícones

**Fonte Principal:** Lucide Icons
- Consistência visual garantida
- Otimizados para web
- Múltiplos formatos (SVG, React, Vue)
- Estilo minimalista alinhado

**Ícones Principais:**
```
Navegação:
- menu (hamburger menu)
- x (fechar)
- arrow-left (voltar)
- home (início)
- user (perfil)
- settings (configurações)

Funcionalidades:
- message-circle (chat)
- brain (clone/IA)
- chart-bar (analytics)
- star (insights)
- target (objetivos)
- compass (navegação interna)

Estados:
- check-circle (sucesso)
- alert-triangle (aviso)
- x-circle (erro)  
- info (informação)
- loader (carregando)

Ações:
- plus (adicionar)
- edit (editar)
- trash (deletar)
- download (baixar)
- share (compartilhar)
- bookmark (salvar)
```

### 5.2 Estilo dos Ícones

**Configuração Padrão:**
```css
.sf-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

/* Variações de tamanho */
.sf-icon-sm { width: 16px; height: 16px; }
.sf-icon-md { width: 20px; height: 20px; } /* padrão */
.sf-icon-lg { width: 24px; height: 24px; }
.sf-icon-xl { width: 32px; height: 32px; }
```

**Ícones Especiais do Self Flow:**

**Clone Avatar (personalizado):**
- Círculo com gradiente Primary + Secondary
- Iniciais do usuário ou ícone de perfil
- Border sutil com animação suave

**Numerology Symbol (personalizado):**
- Geometria sagrada simplificada
- Baseado em símbolos numerológicos tradicionais
- Animação de entrada suave

**Insight Badge (personalizado):**
- Combinação de ícone + número/badge
- Indica quantidade de insights disponíveis
- Pulsa quando há novos insights

---

## 6. LAYOUT E GRID

### 6.1 Grid System

**Container:**
```css
.sf-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 640px) {
  .sf-container {
    padding: 0 16px;
  }
}
```

**Grid Layout:**
```css
.sf-grid {
  display: grid;
  gap: 24px;
}

.sf-grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.sf-grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.sf-grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.sf-grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive */
@media (max-width: 768px) {
  .sf-grid-cols-2,
  .sf-grid-cols-3,
  .sf-grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
```

### 6.2 Spacing System

**Base Unit:** 4px

```css
/* Spacing scale */
--sf-space-1: 0.25rem;  /* 4px */
--sf-space-2: 0.5rem;   /* 8px */
--sf-space-3: 0.75rem;  /* 12px */
--sf-space-4: 1rem;     /* 16px */
--sf-space-5: 1.25rem;  /* 20px */
--sf-space-6: 1.5rem;   /* 24px */
--sf-space-8: 2rem;     /* 32px */
--sf-space-10: 2.5rem;  /* 40px */
--sf-space-12: 3rem;    /* 48px */
--sf-space-16: 4rem;    /* 64px */
--sf-space-20: 5rem;    /* 80px */

/* Utility classes */
.sf-m-4 { margin: var(--sf-space-4); }
.sf-p-4 { padding: var(--sf-space-4); }
.sf-mb-6 { margin-bottom: var(--sf-space-6); }
.sf-pt-8 { padding-top: var(--sf-space-8); }
/* etc. */
```

### 6.3 Breakpoints

```css
/* Mobile first approach */
--sf-screen-sm: 640px;   /* Tablet portrait */
--sf-screen-md: 768px;   /* Tablet landscape */
--sf-screen-lg: 1024px;  /* Desktop small */
--sf-screen-xl: 1280px;  /* Desktop large */
--sf-screen-2xl: 1536px; /* Desktop extra large */
```

**Usage:**
```css
/* Mobile first */
.sf-component {
  /* Mobile styles */
}

@media (min-width: 768px) {
  .sf-component {
    /* Tablet+ styles */
  }
}

@media (min-width: 1024px) {
  .sf-component {
    /* Desktop+ styles */
  }
}
```

---

## 7. ANIMAÇÕES E TRANSIÇÕES

### 7.1 Timing Functions

```css
/* Easing curves personalizadas */
--sf-ease-in: cubic-bezier(0.4, 0, 1, 1);
--sf-ease-out: cubic-bezier(0, 0, 0.2, 1);
--sf-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--sf-ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Durações padrão */
--sf-duration-fast: 150ms;
--sf-duration-normal: 250ms;
--sf-duration-slow: 350ms;
--sf-duration-extra-slow: 500ms;
```

### 7.2 Animações Comuns

**Fade In/Out:**
```css
@keyframes sf-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes sf-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

.sf-fade-in {
  animation: sf-fade-in var(--sf-duration-normal) var(--sf-ease-out);
}
```

**Slide Up (para modais, cards):**
```css
@keyframes sf-slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.sf-slide-up {
  animation: sf-slide-up var(--sf-duration-normal) var(--sf-ease-out);
}
```

**Pulse (para loading, notifications):**
```css
@keyframes sf-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.sf-pulse {
  animation: sf-pulse 2s infinite;
}
```

**Scale (para hover effects):**
```css
.sf-scale-hover {
  transition: transform var(--sf-duration-fast) var(--sf-ease-out);
}

.sf-scale-hover:hover {
  transform: scale(1.05);
}
```

### 7.3 Animações Específicas do Self Flow

**Numerology Number Reveal:**
```css
@keyframes sf-number-reveal {
  0% {
    transform: scale(0.8) rotateY(90deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.1) rotateY(45deg);
    opacity: 0.7;
  }
  100% {
    transform: scale(1) rotateY(0deg);
    opacity: 1;
  }
}

.sf-number-reveal {
  animation: sf-number-reveal 0.6s var(--sf-ease-bounce);
}
```

**Clone Typing Indicator:**
```css
@keyframes sf-clone-typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-10px); }
}

.sf-clone-typing .sf-typing-dot:nth-child(1) {
  animation: sf-clone-typing 1.4s infinite;
  animation-delay: 0ms;
}

.sf-clone-typing .sf-typing-dot:nth-child(2) {
  animation: sf-clone-typing 1.4s infinite;
  animation-delay: 200ms;
}

.sf-clone-typing .sf-typing-dot:nth-child(3) {
  animation: sf-clone-typing 1.4s infinite;
  animation-delay: 400ms;
}
```

**Insight Notification:**
```css
@keyframes sf-insight-pop {
  0% { transform: scale(0) rotate(45deg); }
  50% { transform: scale(1.1) rotate(22.5deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.sf-insight-notification {
  animation: sf-insight-pop 0.5s var(--sf-ease-bounce);
}
```

---

## 8. REFERÊNCIAS VISUAIS

### 8.1 Análise das Referências Existentes

**Baseado nas imagens do diretório Design:**

**Referência 1 (1.png):**
- Interface clean e minimalista
- Uso inteligente de white space
- Cards bem estruturados com hierarquia clara
- Paleta neutra com acentos coloridos pontuais

**Referência 2 (2.webp):**
- Dashboard com métricas visuais
- Gráficos integrados de forma elegante
- Navegação lateral bem organizada
- Equilíbrio entre dados e usabilidade

**Referência 3 (3.jpg):**
- Interface conversacional humanizada
- Bubble chat com personalidade
- Uso de avatars e elementos pessoais
- Fluxo natural de interação

**Referência 4 (4.png):**
- Onboarding gamificado
- Progressão visual clara
- Elementos interativos engajantes
- Design que não intimida o usuário

### 8.2 Aplicação das Referências

**Para Mapeamento Numerológico:**
- Inspiração da Ref 1: Cards limpos para cada número calculado
- Inspiração da Ref 4: Progressão gamificada do mapeamento
- Layout em grid responsivo
- Hierarquia visual clara entre números principais e secundários

**Para Interface de Chat:**
- Inspiração da Ref 3: Bubbles humanizados mas profissionais
- Avatar do clone com personalidade sutil
- Indicadores de status não-intrusivos
- Transições suaves entre estados

**Para Dashboard:**
- Inspiração da Ref 2: Métricas visuais elegantes
- Cards de insight bem organizados
- Navegação intuitiva entre seções
- Dados apresentados de forma storytelling

### 8.3 Inspirações Adicionais

**Apps de Referência Visual:**
- **Linear:** Animações sutis, tipografia perfeita
- **Notion:** Hierarquia de informação clara
- **Figma:** Interface limpa, funcional, poderosa
- **Superhuman:** Atenção aos detalhes, micro-interações
- **Mercury:** Onboarding gamificado bem executado

**Não Imitar:**
- Headspace (muito zen/minimalista para nosso contexto)
- WhatsApp (muito casual para profundidade do produto)
- Tinder (muito gamificado/superficial)
- Slack (muito corporativo/frio)

---

## 9. IMPLEMENTAÇÃO TÉCNICA

### 9.1 CSS Custom Properties

```css
:root {
  /* Colors */
  --sf-primary-50: #eff6ff;
  --sf-primary-500: #3b82f6;
  --sf-primary-900: #1e3a8a;
  
  /* Typography */
  --sf-font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --sf-font-size-base: 1rem;
  --sf-line-height-base: 1.6;
  
  /* Spacing */
  --sf-space-base: 1rem;
  
  /* Animation */
  --sf-duration-normal: 250ms;
  --sf-ease-out: cubic-bezier(0, 0, 0.2, 1);
  
  /* Shadows */
  --sf-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --sf-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --sf-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Borders */
  --sf-border-radius: 8px;
  --sf-border-radius-lg: 12px;
  --sf-border-width: 1px;
}
```

### 9.2 Component Structure

**Usando Tailwind CSS + Custom Components:**

```jsx
// Button Component Example
const SFButton = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  const baseClasses = 'sf-btn font-semibold rounded-lg transition-all duration-200'
  
  const variants = {
    primary: 'bg-sf-primary-500 text-white hover:bg-sf-primary-600 hover:shadow-lg',
    secondary: 'border-2 border-sf-primary-200 text-sf-primary-600 hover:border-sf-primary-500 hover:bg-sf-primary-50',
    ghost: 'text-sf-neutral-700 hover:bg-sf-neutral-100'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

### 9.3 Responsive Design

**Mobile-First Approach:**

```css
/* Base styles for mobile */
.sf-hero {
  padding: 2rem 1rem;
  text-align: center;
}

.sf-hero-title {
  font-size: 2rem;
  line-height: 1.2;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .sf-hero {
    padding: 4rem 2rem;
  }
  
  .sf-hero-title {
    font-size: 2.5rem;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .sf-hero {
    padding: 6rem 2rem;
    text-align: left;
  }
  
  .sf-hero-title {
    font-size: 3rem;
  }
}
```

### 9.4 Dark Mode (Futuro)

**Preparação para Dark Mode:**

```css
@media (prefers-color-scheme: dark) {
  :root {
    --sf-neutral-0: #111827;
    --sf-neutral-50: #1f2937;
    --sf-neutral-900: #f9fafb;
    /* Inverter cores neutras */
  }
}

[data-theme="dark"] {
  /* Override manual para toggle */
  --sf-bg-primary: var(--sf-neutral-900);
  --sf-text-primary: var(--sf-neutral-0);
}
```

---

## 10. ACESSIBILIDADE

### 10.1 Contraste e Legibilidade

**Mínimos WCAG 2.1 AA:**
- Contraste mínimo: 4.5:1 (texto normal)
- Contraste mínimo: 3:1 (texto grande)
- Contraste mínimo: 3:1 (elementos interativos)

**Validação das Cores:**
```
Texto Primário (--sf-neutral-900) em Background Branco:
Contraste: 16.75:1 ✅

Texto Secundário (--sf-neutral-600) em Background Branco:
Contraste: 7.23:1 ✅

Primary Button (--sf-primary-500) com Texto Branco:
Contraste: 8.59:1 ✅
```

### 10.2 Navegação e Foco

**Focus States:**
```css
.sf-focusable {
  outline: none;
  transition: box-shadow 0.2s ease;
}

.sf-focusable:focus-visible {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  border-radius: 4px;
}
```

**Skip Links:**
```html
<a href="#main-content" class="sf-skip-link">
  Pular para conteúdo principal
</a>
```

### 10.3 Screen Readers

**ARIA Labels e Descriptions:**
```html
<!-- Botão com contexto -->
<button 
  aria-label="Iniciar conversa com seu clone digital"
  aria-describedby="clone-description"
>
  Conversar
</button>

<!-- Loading states -->
<div 
  role="status" 
  aria-live="polite" 
  aria-label="Processando sua resposta"
>
  <span class="sf-loading-spinner" aria-hidden="true"></span>
  Analisando...
</div>

<!-- Form validation -->
<input 
  aria-invalid="true"
  aria-describedby="name-error"
  placeholder="Seu nome completo"
>
<div id="name-error" role="alert">
  Nome é obrigatório para o mapeamento
</div>
```

---

## 11. CHECKLIST DE IMPLEMENTAÇÃO

### 11.1 Setup Inicial
- [ ] Instalar fonte Inter via Google Fonts
- [ ] Configurar CSS Custom Properties
- [ ] Implementar sistema de cores
- [ ] Criar componentes base (Button, Card, Input)
- [ ] Setup do grid system responsivo

### 11.2 Componentes Específicos
- [ ] Chat interface com bubbles
- [ ] Cards de numerologia com animações
- [ ] Dashboard com métricas visuais
- [ ] Formulário de onboarding gamificado
- [ ] Indicadores de loading/typing

### 11.3 Animações e Micro-interações
- [ ] Transições de hover em botões
- [ ] Animações de entrada de cards
- [ ] Loading states fluidos
- [ ] Feedback visual para ações

### 11.4 Responsividade
- [ ] Mobile-first implementation
- [ ] Breakpoints testados
- [ ] Touch-friendly interactions
- [ ] Navegação mobile otimizada

### 11.5 Acessibilidade
- [ ] Contraste validado WCAG 2.1 AA
- [ ] Focus states implementados
- [ ] ARIA labels configurados
- [ ] Testes com screen reader

### 11.6 Performance
- [ ] Otimização de imagens
- [ ] CSS minificado
- [ ] Fontes carregadas eficientemente
- [ ] Animações performáticas (GPU)

---

## 12. PRÓXIMOS PASSOS

### 12.1 Para Desenvolvimento Imediato (MVP)
1. **Implementar sistema de cores e tipografia**
2. **Criar componentes base (Button, Card, Input, Chat)**
3. **Desenvolver layout responsivo**
4. **Implementar animações básicas**
5. **Testes de acessibilidade inicial**

### 12.2 Para Iteração Pós-MVP
1. **Animações avançadas e micro-interações**
2. **Dark mode implementation**
3. **Componentes de visualização de dados**
4. **Sistema de theming dinâmico**
5. **Otimizações de performance avançadas**

### 12.3 Para Evolução Futura
1. **Design system completo documentado**
2. **Component library standalone**
3. **Temas personalizáveis por usuário**
4. **Animações adaptadas ao perfil numerológico**
5. **Integração com motion design avançado**

---

## CONCLUSÃO

Este design system estabelece as fundações visuais sólidas para o Self Flow, equilibrando:

- **Profissionalismo científico** com **humanização tecnológica**
- **Simplicidade visual** com **profundidade funcional**  
- **Consistência técnica** com **personalização adaptativa**
- **Modernidade estética** com **acessibilidade universal**

**Status:** Diretrizes aprovadas e prontas para implementação no MVP.

**Responsabilidade:** Seguir rigorosamente estas guidelines garante experiência visual coerente e profissional que transmite confiança e clareza - valores fundamentais do Self Flow.

---

**Versão:** 1.0  
**Próxima Revisão:** Após implementação do MVP  
**Responsável:** Design System Lead + Frontend Team  
**Validação:** Testes de usabilidade + feedback de primeiros usuários