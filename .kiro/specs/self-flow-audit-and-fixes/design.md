# Design Document - Self Flow Audit & Fixes

## Overview

This design document outlines the architectural approach to fixing and completing the Self Flow application. The design focuses on:

1. **Real Implementations** - Replacing all placeholders with functional code
2. **Proper Integrations** - Connecting to real APIs (Google AI, Supabase, Astrology services)
3. **Data Persistence** - Ensuring all features save and retrieve data correctly
4. **Error Handling** - Graceful degradation when services are unavailable
5. **Testing Strategy** - Validation that fixes actually work

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Chat         │  │ Numerology   │  │ Gamification │     │
│  │ Interface    │  │ Dashboard    │  │ System       │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
│  ┌──────▼──────────────────▼──────────────────▼───────┐    │
│  │           API Routes Layer (/app/api/*)            │    │
│  └──────┬──────────────────┬──────────────────┬───────┘    │
└─────────┼──────────────────┼──────────────────┼────────────┘
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼────────────┐
│                    Backend Services                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Google AI    │  │ Supabase     │  │ Astrology    │     │
│  │ Live API     │  │ Database     │  │ API          │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: Zustand (for complex state), React Context (for simple state)
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **AI Services**: Google Generative AI (Gemini)
- **Authentication**: Clerk
- **Voice**: Web Audio API, MediaRecorder API
- **Astrology**: Aztro API or similar service

## Components and Interfaces

### 1. Voice Streaming System

#### Current Issues
- `AudioStreamer.tsx` has placeholder implementations
- `SelfFlowLiveClient.ts` doesn't actually connect to Live API
- No real WebRTC audio streaming
- Mock audio visualization

#### Design Solution

**LiveAPIContext Enhancement**
```typescript
interface LiveAPIContextValue {
  // Connection state
  isConnected: boolean
  isInitializing: boolean
  connectionError: string | null
  
  // Audio state
  isRecording: boolean
  isSpeaking: boolean
  audioLevel: number
  
  // Methods
  connect: (config: LiveAPIConfig) => Promise<void>
  disconnect: () => Promise<void>
  startRecording: () => Promise<void>
  stopRecording: () => Promise<void>
  sendAudio: (audioData: ArrayBuffer) => Promise<void>
  
  // Event handlers
  onMessage: (callback: (message: LiveMessage) => void) => void
  onError: (callback: (error: string) => void) => void
  onAudioLevel: (callback: (level: number) => void) => void
}
```

**Real Audio Streaming Flow**
1. User clicks microphone → Request media permissions
2. Create MediaRecorder with appropriate codec
3. Chunk audio data every 100ms
4. Send chunks to Google Live API via WebSocket
5. Receive audio response chunks
6. Play back using Web Audio API AudioContext
7. Display real-time visualization using AnalyserNode

**Fallback Strategy**
- If Live API unavailable → Use standard Gemini text API
- If microphone unavailable → Show error, offer text input
- If audio playback fails → Display text transcript

### 2. Numerology Calculation Validation

#### Current Issues
- No validation that calculations are correct
- Special characters might not be handled properly
- Master numbers might be reduced incorrectly

#### Design Solution

**Dual Validation System**
```typescript
interface ValidationResult {
  isValid: boolean
  primaryResult: number
  secondaryResult: number
  discrepancies: string[]
  confidence: number
}

class NumerologyValidator {
  // Primary calculation (existing method)
  static calculatePrimary(input: NumerologyInput): NumerologyMap
  
  // Secondary calculation (independent algorithm)
  static calculateSecondary(input: NumerologyInput): NumerologyMap
  
  // Cross-validation
  static validate(input: NumerologyInput): ValidationResult
  
  // Audit logging
  static logCalculation(userId: string, result: ValidationResult): Promise<void>
}
```

**Test Cases**
- Known numerology examples with verified results
- Edge cases: names with special characters, leap year dates
- Master number preservation tests
- Character encoding tests (UTF-8 handling)

### 3. Astrology Integration

#### Current Issues
- Using mock/placeholder horoscope data
- No real birth chart calculation
- No visual representation of chart

#### Design Solution

**Astrology Service Layer**
```typescript
interface BirthChartData {
  sun: { sign: string; degree: number; house: number }
  moon: { sign: string; degree: number; house: number }
  ascendant: { sign: string; degree: number }
  planets: PlanetPosition[]
  houses: HousePosition[]
  aspects: Aspect[]
}

class AstrologyService {
  // Fetch birth chart from API
  static async getBirthChart(
    birthDate: Date,
    birthTime: string,
    birthPlace: { lat: number; lon: number }
  ): Promise<BirthChartData>
  
  // Cache chart data
  static async saveBirthChart(userId: string, chart: BirthChartData): Promise<void>
  
  // Get daily horoscope
  static async getDailyHoroscope(sunSign: string): Promise<Horoscope>
}
```

**API Options**
1. **Primary**: Astro-Seek API (comprehensive, paid)
2. **Fallback**: Aztro API (free, basic)
3. **Cache**: Store charts in Supabase for 30 days

**Visual Representation**
- Use D3.js or similar to render birth chart wheel
- Display planetary positions
- Show aspect lines
- Interactive tooltips for each element

### 4. Psychological Test Enhancement

#### Current Issues
- Only 3 questions (needs 20+)
- No validated psychological framework
- Results not properly integrated into AI context

#### Design Solution

**Comprehensive Assessment**
```typescript
interface PsychologicalProfile {
  // Big Five personality traits
  openness: number        // 0-100
  conscientiousness: number
  extraversion: number
  agreeableness: number
  neuroticism: number
  
  // Decision-making style
  decisionMaking: 'analytical' | 'intuitive' | 'dependent' | 'avoidant'
  
  // Stress response
  stressResponse: 'problem-focused' | 'emotion-focused' | 'avoidant'
  
  // Motivation drivers
  motivationDrivers: string[]
  
  // Communication preferences
  communicationStyle: 'direct' | 'indirect' | 'assertive' | 'passive'
  
  // Calculated at
  assessedAt: Date
  validUntil: Date  // Re-assess after 6 months
}
```

**Question Bank Structure**
- 5 questions per Big Five trait (25 total)
- 5 questions for decision-making style
- 5 questions for stress response
- 5 questions for motivation
- Total: 40 questions, presented in randomized order

**Integration with AI**
- Include psychological profile in system prompt
- Adapt communication style based on preferences
- Provide insights aligned with personality traits

### 5. Gamification System Persistence

#### Current Issues
- XP and achievements calculated from props, not database
- No persistence of unlocked achievements
- Leaderboard not implemented

#### Design Solution

**Database Schema**
```prisma
model UserStats {
  id                String   @id @default(cuid())
  userId            String   @unique
  totalXP           Int      @default(0)
  currentLevel      Int      @default(1)
  totalConversations Int     @default(0)
  totalMeditations  Int      @default(0)
  totalDevaneios    Int      @default(0)
  consecutiveDays   Int      @default(0)
  lastActiveDate    DateTime @default(now())
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model Achievement {
  id          String   @id @default(cuid())
  userId      String
  achievementId String
  unlockedAt  DateTime @default(now())
  
  @@unique([userId, achievementId])
}

model Quest {
  id          String   @id @default(cuid())
  userId      String
  questId     String
  progress    Int      @default(0)
  target      Int
  completedAt DateTime?
  expiresAt   DateTime
}
```

**Real-time Updates**
- Use Supabase real-time subscriptions for leaderboard
- Update XP immediately after actions
- Trigger achievement checks on stat updates
- Show toast notifications for unlocks

### 6. Forum and Community Features

#### Current Issues
- Basic forum implementation
- No private messaging
- No mentorship system

#### Design Solution

**Enhanced Forum System**
```typescript
interface ForumPost {
  id: string
  authorId: string
  title: string
  content: string
  category: string
  tags: string[]
  upvotes: number
  commentCount: number
  createdAt: Date
  updatedAt: Date
}

interface Comment {
  id: string
  postId: string
  authorId: string
  content: string
  parentCommentId?: string  // For nested replies
  upvotes: number
  createdAt: Date
}
```

**Private Messaging**
```typescript
interface Message {
  id: string
  senderId: string
  recipientId: string
  content: string
  read: boolean
  createdAt: Date
}

interface Conversation {
  id: string
  participants: string[]
  lastMessage: Message
  unreadCount: number
}
```

**Mentorship Matching**
```typescript
interface MentorProfile {
  userId: string
  expertise: string[]
  numerologyStrengths: number[]  // Which numbers they've mastered
  availability: 'high' | 'medium' | 'low'
  menteeCount: number
  rating: number
}

class MentorshipService {
  // Find compatible mentors based on numerology
  static async findMentors(
    userId: string,
    numerologyMap: NumerologyMap
  ): Promise<MentorProfile[]>
  
  // Calculate compatibility score
  static calculateCompatibility(
    mentorMap: NumerologyMap,
    menteeMap: NumerologyMap
  ): number
}
```

### 7. Devaneio Mode AI Integration

#### Current Issues
- Scenario generation is hardcoded
- No real AI analysis of possibilities
- Paths are generic, not personalized

#### Design Solution

**AI-Powered Scenario Generation**
```typescript
interface ScenarioGenerationRequest {
  userId: string
  numerologyMap: NumerologyMap
  psychologicalProfile: PsychologicalProfile
  scenario: {
    title: string
    category: string
    currentSituation: string
    desiredOutcome: string
    timeframe: string
  }
}

class DevaneioAIService {
  // Generate scenarios using Gemini
  static async generateScenario(
    request: ScenarioGenerationRequest
  ): Promise<DevaneioScenario>
  
  // Analyze probability of success
  static async analyzeProbability(
    scenario: DevaneioScenario,
    userContext: UserContext
  ): Promise<number>
  
  // Generate actionable steps
  static async generateSteps(
    path: DevaneioPath,
    numerologyMap: NumerologyMap
  ): Promise<DevaneioStep[]>
}
```

**Prompt Engineering**
```typescript
const DEVANEIO_SYSTEM_PROMPT = `
You are an expert life coach and numerologist analyzing future scenarios.

User's Numerology Map:
- Destino: ${map.destino}
- Motivação: ${map.motivacao}
- Ano Pessoal: ${map.anoPessoal}
- Lições Cármicas: ${map.licoesCarmicas.join(', ')}

Psychological Profile:
- Decision Making: ${profile.decisionMaking}
- Stress Response: ${profile.stressResponse}

Task: Generate 3 possible paths for achieving the following goal:
${scenario.desiredOutcome}

For each path, provide:
1. Realistic probability (0-100%)
2. Key challenges
3. Key opportunities
4. 3-5 actionable steps with timeframes
5. Numerology alignment score

Be specific, practical, and grounded in the user's actual strengths and challenges.
`
```

### 8. Micro-Meditation Audio Generation

#### Current Issues
- No audio generation
- Scripts are generic
- No voice cloning

#### Design Solution

**Text-to-Speech Integration**
```typescript
interface MeditationAudioService {
  // Generate meditation audio
  static async generateMeditation(
    script: string,
    voice: 'default' | 'user-cloned',
    userId?: string
  ): Promise<string>  // Returns audio URL
  
  // Clone user voice (optional premium feature)
  static async cloneVoice(
    userId: string,
    audioSample: ArrayBuffer
  ): Promise<string>  // Returns voice ID
}
```

**Audio Generation Options**
1. **Free Tier**: Browser Web Speech API (text-to-speech)
2. **Premium Tier**: ElevenLabs API for high-quality voice
3. **Ultra Premium**: Voice cloning with user's own voice

**Meditation Script Generation**
```typescript
class MeditationScriptGenerator {
  static async generateScript(
    numerologyMap: NumerologyMap,
    duration: number,  // in seconds
    focus: 'stress' | 'clarity' | 'sleep' | 'energy'
  ): Promise<string>
  
  // Personalize script with numerology insights
  static personalizeScript(
    template: string,
    numerologyMap: NumerologyMap
  ): string
}
```

### 9. Advanced Chat Features

#### Current Issues
- No goal tracking
- No proactive accountability
- No emotional pattern detection
- No adaptive interventions

#### Design Solution

**Goal Tracking System**
```typescript
interface UserGoal {
  id: string
  userId: string
  description: string
  category: string
  deadline?: Date
  checkInFrequency: 'daily' | 'weekly' | 'monthly'
  lastCheckIn?: Date
  status: 'active' | 'completed' | 'abandoned'
  progress: number  // 0-100
}

class GoalTrackingService {
  // Extract goals from conversation
  static async extractGoals(
    conversationHistory: Message[]
  ): Promise<UserGoal[]>
  
  // Check if user needs accountability prompt
  static async shouldPromptCheckIn(
    userId: string
  ): Promise<{ shouldPrompt: boolean; goal: UserGoal }>
  
  // Generate accountability message
  static async generateAccountabilityPrompt(
    goal: UserGoal,
    numerologyMap: NumerologyMap
  ): Promise<string>
}
```

**Emotional Pattern Detection**
```typescript
interface EmotionalPattern {
  userId: string
  detectedAt: Date
  pattern: 'anxiety' | 'depression' | 'stress' | 'excitement' | 'confusion'
  confidence: number
  triggerContext: string
  suggestedIntervention: string
}

class EmotionalAnalysisService {
  // Analyze message for emotional content
  static async analyzeEmotion(
    message: string,
    conversationHistory: Message[]
  ): Promise<EmotionalPattern | null>
  
  // Generate adaptive response
  static async generateAdaptiveResponse(
    pattern: EmotionalPattern,
    numerologyMap: NumerologyMap
  ): Promise<string>
}
```

**Intervention System**
```typescript
interface Intervention {
  type: 'meditation' | 'breathing' | 'reframe' | 'action' | 'support'
  trigger: EmotionalPattern
  content: string
  duration?: number
}

class InterventionService {
  // Suggest intervention based on pattern
  static async suggestIntervention(
    pattern: EmotionalPattern,
    userPreferences: UserPreferences
  ): Promise<Intervention>
  
  // Track intervention effectiveness
  static async trackOutcome(
    interventionId: string,
    wasHelpful: boolean
  ): Promise<void>
}
```

### 10. Data Persistence Layer

#### Current Issues
- Some features don't save to database
- Inconsistent error handling
- No proper loading states

#### Design Solution

**Unified Data Access Layer**
```typescript
class DataService {
  // User profile operations
  static async getUserProfile(userId: string): Promise<UserProfile>
  static async updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<void>
  
  // Numerology operations
  static async saveNumerologyMap(userId: string, map: NumerologyMap): Promise<void>
  static async getNumerologyMap(userId: string): Promise<NumerologyMap | null>
  
  // Conversation operations
  static async saveConversation(userId: string, messages: Message[]): Promise<string>
  static async getConversationHistory(userId: string, limit?: number): Promise<Message[]>
  
  // Stats operations
  static async updateUserStats(userId: string, updates: Partial<UserStats>): Promise<void>
  static async getUserStats(userId: string): Promise<UserStats>
  
  // Achievement operations
  static async unlockAchievement(userId: string, achievementId: string): Promise<void>
  static async getUserAchievements(userId: string): Promise<Achievement[]>
}
```

**Error Handling Pattern**
```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
}

async function withErrorHandling<T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<ApiResponse<T>> {
  try {
    const data = await operation()
    return { success: true, data }
  } catch (error) {
    console.error('Operation failed:', error)
    return {
      success: false,
      error: {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'An error occurred',
        details: error
      },
      data: fallback
    }
  }
}
```

## Data Models

### Enhanced Prisma Schema

```prisma
// User profile with all dimensions
model UserProfile {
  id                    String    @id @default(cuid())
  userId                String    @unique
  fullName              String
  birthDate             DateTime
  birthTime             String?
  birthPlace            Json?     // { lat, lon, city, country }
  
  // Numerology
  numerologyMap         Json?
  numerologyCalculatedAt DateTime?
  
  // Astrology
  birthChart            Json?
  sunSign               String?
  moonSign              String?
  ascendant             String?
  
  // Psychology
  psychologicalProfile  Json?
  profileAssessedAt     DateTime?
  
  // Preferences
  communicationStyle    String?
  preferredAgent        String?
  
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
}

// Conversation history
model Conversation {
  id          String    @id @default(cuid())
  userId      String
  sessionId   String
  messages    Json      // Array of messages
  agentType   String
  duration    Int       // in seconds
  insightsGenerated Int @default(0)
  createdAt   DateTime  @default(now())
  
  @@index([userId, createdAt])
}

// Goals and accountability
model Goal {
  id                String    @id @default(cuid())
  userId            String
  description       String
  category          String
  deadline          DateTime?
  checkInFrequency  String
  lastCheckIn       DateTime?
  status            String    @default("active")
  progress          Int       @default(0)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([userId, status])
}

// Meditation sessions
model MeditationSession {
  id          String    @id @default(cuid())
  userId      String
  scriptId    String?
  duration    Int       // in seconds
  completed   Boolean   @default(false)
  audioUrl    String?
  createdAt   DateTime  @default(now())
  
  @@index([userId, createdAt])
}

// Devaneio scenarios
model DevaneioScenario {
  id              String    @id @default(cuid())
  userId          String
  title           String
  description     String
  category        String
  timeframe       String
  currentSituation String
  desiredOutcome  String
  scenarioData    Json      // Full scenario with paths
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([userId, createdAt])
}
```

## Error Handling

### Error Categories

1. **Network Errors**: API unavailable, timeout
2. **Authentication Errors**: Invalid token, expired session
3. **Validation Errors**: Invalid input data
4. **Business Logic Errors**: Calculation failures, constraint violations
5. **External Service Errors**: Third-party API failures

### Error Handling Strategy

```typescript
class ErrorHandler {
  static handle(error: Error, context: string): ApiResponse<null> {
    // Log error
    console.error(`[${context}]`, error)
    
    // Categorize error
    const category = this.categorizeError(error)
    
    // Determine user-friendly message
    const message = this.getUserMessage(category, error)
    
    // Determine if retry is possible
    const canRetry = this.canRetry(category)
    
    // Send to monitoring service
    this.reportError(error, context, category)
    
    return {
      success: false,
      error: {
        code: category,
        message,
        details: process.env.NODE_ENV === 'development' ? error : undefined
      }
    }
  }
}
```

### Graceful Degradation

- **Voice unavailable** → Fall back to text
- **AI API down** → Use cached responses or simpler logic
- **Database error** → Use local storage temporarily
- **Astrology API down** → Show cached data with timestamp
- **Payment service down** → Allow access, bill later

## Testing Strategy

### Unit Tests

```typescript
describe('NumerologyCalculator', () => {
  it('should calculate Destino correctly', () => {
    const result = calculateDestino(new Date(1985, 2, 15))
    expect(result).toBe(5)  // Known correct answer
  })
  
  it('should preserve master numbers', () => {
    const result = reduceToEssence(29)
    expect(result).toBe(11)  // 2+9=11, should not reduce to 2
  })
  
  it('should handle special characters', () => {
    const result = calculateMotivacao('José')
    expect(result).toBe(/* expected value */)
  })
})
```

### Integration Tests

```typescript
describe('Voice Streaming', () => {
  it('should establish connection to Live API', async () => {
    const client = new SelfFlowLiveClient(config)
    await client.connect()
    expect(client.connected).toBe(true)
  })
  
  it('should fall back to text when voice unavailable', async () => {
    // Mock Live API failure
    mockLiveAPIFailure()
    
    const client = new SelfFlowLiveClient(config)
    await client.connect()
    
    expect(client.fallbackMode).toBe(true)
  })
})
```

### End-to-End Tests

```typescript
describe('Complete User Flow', () => {
  it('should complete onboarding and generate numerology map', async () => {
    // Navigate to onboarding
    await page.goto('/onboarding')
    
    // Fill form
    await page.fill('[name="fullName"]', 'Test User')
    await page.fill('[name="birthDate"]', '1985-03-15')
    await page.click('button[type="submit"]')
    
    // Wait for numerology calculation
    await page.waitForSelector('[data-testid="numerology-map"]')
    
    // Verify results
    const destino = await page.textContent('[data-testid="destino"]')
    expect(destino).toBe('5')
  })
})
```

### Manual Testing Checklist

- [ ] Voice recording works in Chrome, Firefox, Safari
- [ ] Audio playback works without glitches
- [ ] Numerology calculations match manual calculations
- [ ] Astrology data displays correctly
- [ ] Forum posts save and display
- [ ] Private messages send and receive
- [ ] Achievements unlock at correct times
- [ ] Leaderboard updates in real-time
- [ ] Devaneio scenarios generate properly
- [ ] Meditations play audio correctly
- [ ] Mobile responsive on iOS and Android
- [ ] Works offline (where applicable)

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Load heavy components only when needed
2. **Code Splitting**: Split by route and feature
3. **Caching**: Cache API responses, numerology calculations
4. **Debouncing**: Debounce audio streaming, search inputs
5. **Pagination**: Paginate forum posts, conversation history
6. **Image Optimization**: Use Next.js Image component
7. **Database Indexing**: Index frequently queried fields

### Performance Targets

- **Initial Load**: < 3 seconds
- **Time to Interactive**: < 5 seconds
- **API Response**: < 500ms (p95)
- **Voice Latency**: < 200ms
- **Database Query**: < 100ms (p95)

## Security Considerations

### Authentication & Authorization

- All API routes protected with Clerk authentication
- Row-level security in Supabase
- API keys stored in environment variables
- No sensitive data in client-side code

### Data Privacy

- User data encrypted at rest
- HTTPS for all connections
- No logging of sensitive information
- GDPR compliance (data export, deletion)

### Input Validation

- Validate all user inputs on server
- Sanitize HTML content in forum posts
- Rate limiting on API endpoints
- CSRF protection on forms

## Deployment Strategy

### Environment Setup

```bash
# Development
npm run dev

# Staging
npm run build
vercel --env staging

# Production
npm run build
vercel --prod
```

### Environment Variables

```env
# Required
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
GOOGLE_AI_API_KEY=

# Optional
ELEVENLABS_API_KEY=
ASTROLOGY_API_KEY=
SENTRY_DSN=
```

### Monitoring

- **Error Tracking**: Sentry
- **Analytics**: Vercel Analytics
- **Performance**: Vercel Speed Insights
- **Uptime**: UptimeRobot
- **Logs**: Vercel Logs + Supabase Logs

## Migration Plan

### Phase 1: Critical Fixes (Week 1)
1. Fix voice streaming
2. Validate numerology calculations
3. Implement real astrology API
4. Fix data persistence

### Phase 2: Feature Completion (Week 2)
1. Enhance psychological test
2. Complete gamification persistence
3. Add private messaging
4. Implement goal tracking

### Phase 3: Advanced Features (Week 3)
1. AI-powered Devaneio scenarios
2. Meditation audio generation
3. Emotional pattern detection
4. Mentorship matching

### Phase 4: Polish & Testing (Week 4)
1. Comprehensive testing
2. Performance optimization
3. Bug fixes
4. Documentation
