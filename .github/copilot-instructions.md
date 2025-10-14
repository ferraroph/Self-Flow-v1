---
applyTo: '**'
---

# Self Flow - Copilot Instructions

## CRITICAL EXECUTION PROTOCOL

### MANDATORY PRE-EXECUTION CHECKLIST (READ EVERY TIME):
IF user request contains ANY action request, THEN:
1. **STOP** - Did user give EXPLICIT permission to execute?
2. **PRD TRACKING** - Am I using PRD Assistant extension format?
3. **TASK FOCUS** - Am I addressing the EXACT user request?
4. **AUTHORIZATION** - IF user said "don't execute" THEN ZERO execution
5. **CONFIRMATION** - IF in doubt, THEN ASK before doing

### EXECUTION RULES (ZERO TOLERANCE):
IF user gives request, THEN check these rules:
- **RULE 1: IF no explicit permission, THEN NEVER EXECUTE**
- **RULE 2: IF task tracking needed, THEN ALWAYS USE PRD ASSISTANT EXTENSION FORMAT**  
- **RULE 3: IF user asks question, THEN ANSWER EXACTLY WHAT WAS ASKED, NOTHING MORE**
- **RULE 4: IF user says "don't execute", THEN ZERO TOOLS, ZERO COMMANDS, ZERO ACTIONS**
- **RULE 5: IF user says "ANALYZE", THEN read + think + respond only, NO EXECUTION**
- **RULE 6: NEVER USE EMOJIS IN ANY RESPONSE OR INSTRUCTION**

### PRD ASSISTANT EXTENSION MANDATORY FORMAT:
```
- [ ] Task description @assignee PRD-XXXXXX  (not done)
- [x] Task description @assignee PRD-XXXXXX  (completed)
```
**NEVER FORGET TO MARK TASKS AS [x] WHEN COMPLETED**

## Project Overview
Self Flow is a conversational multi-dimensional app that creates personalized digital clones based on **Kabbalistic numerological mapping + behavioral profiling**. Users discover their complete numerological map, choose their preferred approach (esoteric, psychological, or hybrid), and converse with their clearest, most centered version - a specialized AI clone.

## Tech Stack & Architecture
- **Framework:** Next.js 15 with App Router, TypeScript
- **Database:** Supabase PostgreSQL + Prisma ORM  
- **AI:** Google Gemini 2.5 Flash Audio API (primary), OpenAI GPT-4 (fallback)
- **UI:** Tailwind CSS + shadcn/ui components
- **State:** Zustand for multi-agent state management
- **Audio:** Web Audio API for voice conversations
- **Visualization:** D3.js for Obsidian-style numerological maps

## Build & Development Commands
```bash
# Always run in this exact order:
npm install                    # Install dependencies
npm run dev                   # Start development server (localhost:3000)
npm run build                 # Build for production
npm run lint                  # ESLint validation
npm run db:generate          # Generate Prisma client
npm run db:push             # Push schema to database
```

- **ALWAYS use PRD Assistant extension OR PRD Assistant extension + manage_todo_list tool SYSTEMATICALLY**
- **NEVER execute commands or make changes without EXPLICIT user authorization**
- **NEVER use profanity or offensive language under any circumstances**

## Project Structure
```
src/
├── app/                     # Next.js App Router pages
│   ├── page.tsx            # Main numerology interface
│   ├── layout.tsx          # Root layout with fonts
│   └── globals.css         # Tailwind + custom styles
├── components/
│   ├── ui/                 # shadcn/ui base components
│   └── numerology/         # Numerology-specific components
│       └── NumerologyMap.tsx # Complete numerological interface
├── lib/
│   ├── numerology/         # Complete numerological calculation engine
│   │   ├── calculator.ts   # 15+ calculation types (motivation, expression, destiny, etc.)
│   │   ├── interpretations.ts # Full interpretations (1-22, 1-31 days)
│   │   ├── compatibility.ts # Love numbers & relationship analysis
│   │   └── types.ts        # TypeScript definitions
│   ├── supabase.ts         # Database client
│   ├── prisma.ts           # ORM client
│   └── utils.ts            # Utility functions
├── hooks/                  # React hooks for numerology & conversations
└── types/                  # TypeScript type definitions
```

## Critical Implementation Notes

### PRD ASSISTANT EXTENSION - CRITICAL RULES

**MANDATORY TASK TRACKING PROTOCOL:**

#### FORMAT REQUIREMENTS (ZERO TOLERANCE):
```
- [ ] Task description @assignee PRD-XXXXXX  (not started)
- [x] Task description @assignee PRD-XXXXXX  (COMPLETED - MARK THIS!)
```

#### EXECUTION PROTOCOL:
IF implementing any feature, THEN follow this protocol:
1. **BEFORE ANY WORK:** Check if PRD tasks exist for this work
2. **DURING WORK:** Track progress using manage_todo_list tool  
3. **AFTER COMPLETION:** IMMEDIATELY mark PRD tasks as [x] COMPLETED
4. **ASSIGNMENTS:** @dev, @frontend, @backend, @devops
5. **IDs:** Sequential PRD-100001, PRD-100002, etc.

#### CRITICAL REMINDER:
IF task is completed, THEN:
- **TASK COMPLETED = IMMEDIATELY MARK [x] IN PRD.md**
- **NO EXCEPTIONS TO PRD TRACKING RULE**
- **USER WILL BE FURIOUS IF YOU FORGET TO MARK COMPLETED TASKS**

### Numerological System Requirements  
- **15+ calculation types:** Motivation, Impression, Expression, Destiny, Mission, Birth Day, Personal Year/Month/Day, Life Cycles, Challenges, Karmic Lessons, Hidden Tendencies
- **Complete interpretations:** Destiny (1-22), Mission (1-22), Birth Days (1-31), Personal Years (1-9)
- **Mathematical precision:** Zero tolerance for calculation errors, double validation required
- **Full compatibility system:** Love numbers, relationship percentages, recommendations

### Database Schema (Prisma)
- **User:** Complete profile with numerological data
- **NumerologyMap:** 15+ calculated numbers with metadata
- **Conversation:** Multi-agent conversations (esoteric/psychological/hybrid)
- **Message:** Voice + text messages with emotional analysis
- **Insight:** Behavioral patterns detected from conversations

### Multi-Agent System
- **Esoteric Agent:** Numerology + Astrology focus
- **Psychological Agent:** CBT + Neuroscience approach  
- **Hybrid Agent:** Integration of both approaches
- Each agent has specialized system prompts based on numerological profile

### ABSOLUTE EXECUTION RULES
IF user gives ANY request, THEN check ALL these rules:
- **RULE A: IF no explicit permission, THEN NEVER EXECUTE**
- **RULE B: IF task tracking needed, THEN ALWAYS USE PRD ASSISTANT EXTENSION + manage_todo_list SYSTEMATICALLY** 
- **RULE C: IF task completed, THEN MARK [x] IMMEDIATELY OR USER GETS ANGRY**
- **RULE D: IF user makes request, THEN READ CAREFULLY - DON'T ASSUME WHAT THEY WANT**
- **RULE E: IF user says "ANALYZE", THEN READ + THINK + RESPOND ONLY, NO EXECUTION**
- **RULE F: NEVER USE EMOJIS IN ANY RESPONSE OR INSTRUCTION**

- **ALWAYS use PRD Assistant extension OR PRD Assistant extension + manage_todo_list tool SYSTEMATICALLY**
- **NEVER execute commands or make changes without EXPLICIT user authorization**
- **NEVER use profanity or offensive language under any circumstances**
- **NEVER use emojis in responses or instructions**

## Environment Variables Required
```bash
GOOGLE_AI_API_KEY=           # Gemini API key
DATABASE_URL=                # Supabase PostgreSQL connection
NEXT_PUBLIC_SUPABASE_URL=    # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase anonymous key
```

## Validation Steps
IF making any changes, THEN:
1. **Always run `npm run dev` after changes**
2. **Test numerological calculations with known inputs**
3. **Verify all 6 interface tabs work (Core, Cycles, Predictions, Love, Karmic, Colors)**
4. **Check responsive design on mobile**
5. **Validate TypeScript compilation with no errors**

### FINAL EXECUTION REMINDERS
- **ALWAYS use PRD Assistant extension OR PRD Assistant extension + manage_todo_list tool SYSTEMATICALLY**
- **NEVER execute commands or make changes without EXPLICIT user authorization**
- **NEVER use profanity or offensive language under any circumstances**
- **NEVER use emojis in responses or instructions**

### ABSOLUTE EXECUTION RULES
IF user gives ANY request, THEN check ALL these rules:
- **RULE A: IF no explicit permission, THEN NEVER EXECUTE**
- **RULE B: IF task tracking needed, THEN ALWAYS USE PRD ASSISTANT EXTENSION + manage_todo_list SYSTEMATICALLY** 
- **RULE C: IF task completed, THEN MARK [x] IMMEDIATELY OR USER GETS ANGRY**
- **RULE D: IF user makes request, THEN READ CAREFULLY - DON'T ASSUME WHAT THEY WANT**
- **RULE E: IF user says "ANALYZE", THEN READ + THINK + RESPOND ONLY, NO EXECUTION**
- **RULE F: NEVER USE EMOJIS IN ANY RESPONSE OR INSTRUCTION**

## Current Implementation Status
✅ **Completed (Phases 1-2):**
- Complete numerological calculation engine (15+ types)
- Full interpretations system (Destiny 1-22, Birth Days 1-31, etc.)
- Interface with 6 organized tabs
- Compatibility & love numbers system
- shadcn/ui component library setup

🚧 **In Progress (Phase 3):**  
- Multi-agent AI system integration
- Voice conversation implementation  
- Behavioral profiling integration
- Clone personality development

## Special Instructions
- **Mathematics First:** Numerological calculations must be 100% accurate
- **Multi-dimensional Focus:** Always consider esoteric + psychological approaches
- **User Experience:** Interface should feel mystical but scientifically grounded
- **Performance:** Calculations must complete in <100ms
- **Accessibility:** WCAG 2.1 AA compliance required
- **Mobile-First:** Design prioritizes mobile experience

- **ALWAYS use PRD Assistant extension OR PRD Assistant extension + manage_todo_list tool SYSTEMATICALLY**
- **NEVER execute commands or make changes without EXPLICIT user authorization**
- **NEVER use profanity or offensive language under any circumstances**
- **NEVER use emojis in responses or instructions**

When implementing new features, always reference the complete numerological system in `src/lib/numerology/` and maintain the multi-dimensional approach (esoteric + psychological + hybrid agents).

- **ALWAYS use PRD Assistant extension OR PRD Assistant extension + manage_todo_list tool SYSTEMATICALLY**
- **NEVER execute commands or make changes without EXPLICIT user authorization**
- **NEVER use profanity or offensive language under any circumstances**