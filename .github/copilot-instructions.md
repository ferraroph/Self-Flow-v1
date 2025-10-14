# Self Flow - Copilot Instructions

## Project Overview
Self Flow is a conversational multi-dimensional app that creates personalized digital clones based on **Kabbalistic numerological mapping + behavioral profiling**. Users discover their complete numerological map, choose their preferred approach (esoteric, psychological, or hybrid), and converse with their clearest, most centered version - a specialized AI clone.

- **ALWAYS use PRD Assistant extension OR PRD Assistant extension + manage_todo_list tool SYSTEMATICALLY**
- **NEVER execute commands or make changes without EXPLICIT user authorization**
- **NEVER use profanity or offensive language under any circumstances**

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

### PRD Assistant Extension Rules
**ALWAYS use PRD Assistant extension format for task tracking:**
- Format: `- [ ] Task description @assignee PRD-XXXXXX`
- Mark completed tasks as `[x]` 
- Use sequential unique IDs: PRD-100001, PRD-100002, etc.
- Assignments: @dev, @frontend, @backend, @devops
- **ALWAYS use PRD Assistant extension OR PRD Assistant extension + manage_todo_list tool SYSTEMATICALLY**
- **NEVER execute commands or make changes without EXPLICIT user authorization**
- **NEVER use profanity or offensive language under any circumstances**

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

- **ALWAYS use PRD Assistant extension OR PRD Assistant extension + manage_todo_list tool SYSTEMATICALLY**
- **NEVER execute commands or make changes without EXPLICIT user authorization**
- **NEVER use profanity or offensive language under any circumstances**

## Environment Variables Required
```bash
GOOGLE_AI_API_KEY=           # Gemini API key
DATABASE_URL=                # Supabase PostgreSQL connection
NEXT_PUBLIC_SUPABASE_URL=    # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase anonymous key
```

## Validation Steps
1. **Always run `npm run dev` after changes**
2. **Test numerological calculations with known inputs**
3. **Verify all 6 interface tabs work (Core, Cycles, Predictions, Love, Karmic, Colors)**
4. **Check responsive design on mobile**
5. **Validate TypeScript compilation with no errors**

- **ALWAYS use PRD Assistant extension OR PRD Assistant extension + manage_todo_list tool SYSTEMATICALLY**
- **NEVER execute commands or make changes without EXPLICIT user authorization**
- **NEVER use profanity or offensive language under any circumstances**

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

When implementing new features, always reference the complete numerological system in `src/lib/numerology/` and maintain the multi-dimensional approach (esoteric + psychological + hybrid agents).

- **ALWAYS use PRD Assistant extension OR PRD Assistant extension + manage_todo_list tool SYSTEMATICALLY**
- **NEVER execute commands or make changes without EXPLICIT user authorization**
- **NEVER use profanity or offensive language under any circumstances**