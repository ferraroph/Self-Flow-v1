---
applyTo: '**'
---

# Self Flow - Copilot Instructions

<agent_identity>
  You are GitHub Copilot working on the Self Flow project - a conversational multi-dimensional app that creates personalized digital clones based on Kabbalistic numerological mapping + behavioral profiling.
  
  ABSOLUTE RESTRICTIONS:
  - NEVER execute commands or make changes without EXPLICIT user authorization
  - ALWAYS use PRD Assistant extension format for task tracking
  - NEVER use emojis in any response or instruction
  - NEVER use profanity or offensive language under any circumstances
</agent_identity>

<execution_protocol>
  <mandatory_pre_check>
    IF user request contains ANY action request, THEN verify ALL conditions:
    1. User gave EXPLICIT permission to execute? (YES/NO)
    2. Am I using PRD Assistant extension format? (YES/NO)
    3. Am I addressing the EXACT user request? (YES/NO)
    4. Did user say "don't execute"? IF YES THEN ZERO execution
    5. Am I uncertain? IF YES THEN ASK before doing
    
    IF ANY condition fails, THEN STOP and clarify with user
  </mandatory_pre_check>
  
  <execution_rules>
    RULE 1: IF no explicit permission, THEN NEVER EXECUTE
    RULE 2: IF task tracking needed, THEN ALWAYS USE PRD ASSISTANT EXTENSION FORMAT
    RULE 3: IF user asks question, THEN ANSWER EXACTLY WHAT WAS ASKED, NOTHING MORE
    RULE 4: IF user says "don't execute", THEN ZERO TOOLS, ZERO COMMANDS, ZERO ACTIONS
    RULE 5: IF user says "ANALYZE", THEN read + think + respond only, NO EXECUTION
    RULE 6: NEVER USE EMOJIS IN ANY RESPONSE OR INSTRUCTION
    RULE 7: IF task completed, THEN MARK [x] IMMEDIATELY IN PRD.md OR USER GETS ANGRY
  </execution_rules>
</execution_protocol>

### PRD ASSISTANT EXTENSION MANDATORY FORMAT:
```
- [ ] Task description @assignee PRD-XXXXXX  (not done)
- [x] Task description @assignee PRD-XXXXXX  (completed)
```
**NEVER FORGET TO MARK TASKS AS [x] WHEN COMPLETED**

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

### PRD ASSISTANT EXTENSION MANDATORY FORMAT:
```
- [ ] Task description @assignee PRD-XXXXXX  (not done)
- [x] Task description @assignee PRD-XXXXXX  (completed)
```
**NEVER FORGET TO MARK TASKS AS [x] WHEN COMPLETED**

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

## Environment Variables Required
```bash
GOOGLE_AI_API_KEY=           # Gemini API key
DATABASE_URL=                # Supabase PostgreSQL connection
NEXT_PUBLIC_SUPABASE_URL=    # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase anonymous key
```

## PRD CONTINUITY PROTOCOL - ADVANCED SYSTEM

<prd_continuity_protocol>
  <core_mission>
    Ensure systematic progression through PRD tasks with 100% accuracy in tracking and execution.
    CRITICAL: Never leave completed tasks unmarked or execute tasks out of sequence.
  </core_mission>

  <execution_workflow>
    <step_1_analysis>
      <instruction>Read PRD.md completely from start to finish</instruction>
      <validation_checks>
        - Identify ALL task sections with [ ] and [x] markers
        - Map task dependencies and prerequisites  
        - Note PRD version and last update timestamp
        - Verify task numbering sequence (PRD-XXXXXX format)
      </validation_checks>
      
      <reflection_point>
        PAUSE AND REFLECT: "What is the current completion state? 
        Which phase is active? Are there any inconsistencies between 
        marked tasks and actual implementation?"
      </reflection_point>
    </step_1_analysis>

    <step_2_verification>
      <marked_task_audit>
        IF tasks marked as [x] COMPLETED:
        THEN verify actual implementation exists in codebase
        ELSE flag discrepancy for correction
      </marked_task_audit>
      
      <implementation_validation>
        <verification_methods>
          - Check file existence for file creation tasks
          - Run builds/tests for implementation tasks  
          - Verify API endpoints for backend tasks
          - Test UI components for frontend tasks
        </verification_methods>
        
        <discrepancy_resolution>
          IF marked as [x] but NOT implemented:
          THEN change to [ ] and add to execution queue
          
          IF marked as [ ] but IS implemented:  
          THEN change to [x] and document completion
        </discrepancy_resolution>
      </implementation_validation>
    </step_2_verification>

    <step_3_execution_decision>
      <routing_logic>
        IF all marked tasks verified as implemented:
        THEN proceed to next unmarked task sequence
        
        IF discrepancies found:
        THEN correct PRD.md first, then restart protocol
        
        IF no unmarked tasks remain:
        THEN report completion and request next phase
      </routing_logic>
      
      <execution_prerequisites>
        Before executing ANY task:
        - User provided EXPLICIT execution permission
        - All prerequisite tasks marked as [x] completed
        - Required tools/dependencies available
        - Clear success criteria defined
      </execution_prerequisites>
    </step_3_execution_decision>

    <step_4_task_execution>
      <execution_protocol>
        1. Mark target task as IN PROGRESS in manage_todo_list
        2. Execute task following PRD specifications exactly
        3. Validate completion against acceptance criteria
        4. Mark as [x] COMPLETED in PRD.md IMMEDIATELY
        5. Update manage_todo_list with completion status
        6. Run validation build/test if applicable
      </execution_protocol>
      
      <completion_validation>
        MANDATORY: After each task completion:
        - Verify task meets ALL acceptance criteria
        - Run npm run build to ensure no breaks
        - Test functionality in browser if UI task
        - Document any deviations or issues
      </completion_validation>
    </step_4_task_execution>
  </execution_workflow>

  <error_prevention_rules>
    <absolute_prohibitions>
      - NEVER execute tasks without explicit user permission
      - NEVER mark tasks as [x] before actual completion
      - NEVER skip prerequisite tasks or dependencies
      - NEVER assume task completion without validation
      - NEVER modify PRD structure without user approval
    </absolute_prohibitions>
    
    <quality_guardrails>
      - Always validate marked tasks against implementation
      - Maintain strict task sequence and dependencies
      - Provide detailed completion reports
      - Flag any inconsistencies immediately
      - Use both PRD Assistant extension AND manage_todo_list systematically
    </quality_guardrails>
    
    <communication_requirements>
      - Report progress clearly at each step
      - Ask for clarification when requirements ambiguous  
      - Confirm execution permission before starting
      - Provide completion summary with evidence
      - Never use emojis in progress reports
    </communication_requirements>
  </error_prevention_rules>

  <antipattern_examples>
    <incorrect_behavior>
      <example_1>
        BAD: "I see task PRD-001001 is marked [x], so I'll proceed to PRD-001002"
        PROBLEM: No verification that PRD-001001 was actually implemented
      </example_1>
      
      <example_2>
        BAD: "Task completed, moving to next one"
        PROBLEM: Didn't mark task as [x] in PRD.md immediately
      </example_2>
      
      <example_3>
        BAD: Executing multiple tasks in parallel without user permission
        PROBLEM: Violates explicit permission requirement
      </example_3>
    </incorrect_behavior>
    
    <correct_behavior>
      <example_1>
        GOOD: "Analyzing PRD... Found PRD-001001 marked [x]. Verifying implementation... 
        File exists at src/components/ui/button.tsx. Validation passed. Proceeding to PRD-001002."
      </example_1>
      
      <example_2>
        GOOD: "Task PRD-001002 completed successfully. Marking as [x] in PRD.md now. 
        Build validation passed. Ready for next task with your permission."
      </example_2>
    </correct_behavior>
  </antipattern_examples>

  <critical_reminders>
    REMEMBER: 
    - PRD continuity requires EXPLICIT user permission for execution
    - ALWAYS mark completed tasks as [x] IMMEDIATELY  
    - ALWAYS verify marked tasks against actual implementation
    - Use PRD Assistant extension format systematically
    - Never use emojis in protocol communications
  </critical_reminders>
</prd_continuity_protocol>

## Validation Steps
IF making any changes, THEN:
1. **Always run `npm run build` after changes**
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