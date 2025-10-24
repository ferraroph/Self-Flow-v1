# Implementation Plan - Self Flow Audit & Fixes

## Phase 1: Critical Infrastructure & Voice Streaming

- [ ] 1. Fix Voice Streaming System
  - Implement real WebRTC connection to Google Live API
  - Replace placeholder audio streaming with actual MediaRecorder implementation
  - Add real-time audio visualization using Web Audio API AnalyserNode
  - Implement proper error handling and fallback to text mode
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 1.1 Update LiveAPIContext with real WebSocket connection
  - Create WebSocket connection to Google Generative AI Live API
  - Implement connection state management (connecting, connected, disconnected, error)
  - Add reconnection logic with exponential backoff
  - Handle authentication with API key
  - _Requirements: 1.1, 1.4_

- [ ] 1.2 Implement real audio capture and streaming
  - Request microphone permissions using navigator.mediaDevices.getUserMedia
  - Create MediaRecorder with appropriate audio codec (webm/opus)
  - Chunk audio data every 100ms for streaming
  - Send audio chunks to Live API via WebSocket
  - Handle audio format conversion if needed
  - _Requirements: 1.2_

- [ ] 1.3 Implement audio playback from AI responses
  - Receive audio response chunks from Live API
  - Create AudioContext for playback
  - Queue audio chunks for smooth playback
  - Handle audio buffering and latency
  - _Requirements: 1.3_

- [ ] 1.4 Add real-time audio visualization
  - Create AnalyserNode from MediaRecorder stream
  - Calculate frequency data for visualization
  - Update AudioVisualizer component with real audio levels
  - Add smooth animation transitions
  - _Requirements: 1.5_

- [ ] 1.5 Implement fallback mechanisms
  - Detect when Live API is unavailable
  - Fall back to standard Gemini text API
  - Show clear user notification of fallback mode
  - Maintain conversation context during fallback
  - _Requirements: 1.4_

- [ ] 2. Validate and Fix Numerology Calculations
  - Implement dual validation system for all calculations
  - Add comprehensive test cases with known correct answers
  - Fix special character handling (ç, ã, é, etc.)
  - Ensure master numbers (11, 22, 33) are preserved correctly
  - Add audit logging for all calculations
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 2.1 Create NumerologyValidator class
  - Implement secondary calculation algorithm (independent from primary)
  - Add cross-validation method comparing both results
  - Create ValidationResult interface with discrepancy tracking
  - Add confidence scoring based on validation results
  - _Requirements: 2.2_

- [ ] 2.2 Add comprehensive test suite
  - Create test cases with verified numerology examples
  - Test edge cases: special characters, leap years, master numbers
  - Test all 15 numerology number types
  - Add regression tests for any bugs found
  - _Requirements: 2.1, 2.4, 2.5_

- [ ] 2.3 Fix special character handling
  - Verify LETTER_VALUES mapping for all Portuguese characters
  - Test UTF-8 encoding handling
  - Add normalization for different character encodings
  - Document character mapping table
  - _Requirements: 2.4_

- [ ] 2.4 Implement audit logging system
  - Create database table for calculation audit logs
  - Log all calculations with input, output, and validation results
  - Add admin interface to review audit logs
  - Set up alerts for validation failures
  - _Requirements: 2.3_

- [ ] 3. Implement Real Astrology Integration
  - Replace mock horoscope data with real API integration
  - Fetch and store complete birth chart data
  - Create visual birth chart representation
  - Implement caching strategy for astrology data
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 3.1 Integrate astrology API
  - Research and select astrology API (Astro-Seek or Aztro)
  - Implement AstrologyService class with API methods
  - Add error handling for API failures
  - Implement rate limiting and caching
  - _Requirements: 3.1, 3.4_

- [ ] 3.2 Create birth chart data model
  - Define BirthChartData interface with all planetary positions
  - Create Prisma schema for storing birth charts
  - Implement saveBirthChart and getBirthChart methods
  - Add data validation for birth chart data
  - _Requirements: 3.2_

- [ ] 3.3 Build birth chart visualization
  - Use D3.js or similar library to render chart wheel
  - Display planetary positions with symbols
  - Show aspect lines between planets
  - Add interactive tooltips for each element
  - Make responsive for mobile devices
  - _Requirements: 3.3_

- [ ] 3.4 Update astrology page to use real data
  - Remove mock horoscope data
  - Fetch birth chart from database or API
  - Display comprehensive birth chart information
  - Show daily horoscope from real API
  - Add loading states and error handling
  - _Requirements: 3.5_

## Phase 2: Data Persistence & Gamification

- [ ] 4. Fix Data Persistence Layer
  - Update Prisma schema with all required models
  - Implement DataService class for unified data access
  - Add proper error handling to all database operations
  - Implement loading states in all components
  - _Requirements: 10.1, 10.2, 10.3, 10.5_

- [ ] 4.1 Update Prisma schema
  - Add UserProfile model with all dimensions
  - Add Conversation model for chat history
  - Add Goal model for accountability tracking
  - Add MeditationSession model
  - Add DevaneioScenario model
  - Run database migration
  - _Requirements: 10.1, 10.2_

- [ ] 4.2 Create DataService class
  - Implement getUserProfile and updateUserProfile methods
  - Implement saveNumerologyMap and getNumerologyMap methods
  - Implement conversation history methods
  - Implement user stats methods
  - Implement achievement methods
  - Add proper TypeScript types for all methods
  - _Requirements: 10.2_

- [ ] 4.3 Add error handling wrapper
  - Create withErrorHandling utility function
  - Implement ApiResponse interface
  - Add error categorization logic
  - Add user-friendly error messages
  - _Requirements: 10.3_

- [ ] 4.4 Update all components to use DataService
  - Replace direct Supabase calls with DataService methods
  - Add loading states to all data-fetching components
  - Add error states with retry buttons
  - Implement optimistic updates where appropriate
  - _Requirements: 10.5_

- [ ] 5. Complete Gamification System
  - Implement database persistence for XP and achievements
  - Create real-time leaderboard with Supabase subscriptions
  - Add achievement unlock notifications
  - Implement quest system with progress tracking
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 5.1 Create gamification database tables
  - Add UserStats model to Prisma schema
  - Add Achievement model with userId and achievementId
  - Add Quest model with progress tracking
  - Run database migration
  - _Requirements: 5.4_

- [ ] 5.2 Implement stat tracking system
  - Create updateUserStats method in DataService
  - Track conversations, meditations, devaneios in real-time
  - Calculate consecutive days based on lastActiveDate
  - Update XP based on activities
  - _Requirements: 5.1_

- [ ] 5.3 Implement achievement system
  - Create achievement checking logic triggered by stat updates
  - Implement unlockAchievement method in DataService
  - Add toast notifications for achievement unlocks
  - Store achievement unlock timestamp
  - _Requirements: 5.2_

- [ ] 5.4 Build leaderboard component
  - Fetch top users by XP from database
  - Implement real-time updates using Supabase subscriptions
  - Add filtering by timeframe (daily, weekly, all-time)
  - Show user's rank and nearby users
  - _Requirements: 5.5_

- [ ] 5.5 Update GamificationSystem component
  - Replace prop-based stats with database queries
  - Add loading states while fetching data
  - Implement real-time updates for XP and achievements
  - Add animations for level-ups and unlocks
  - _Requirements: 5.3_

- [ ] 6. Enhance Psychological Test
  - Expand question bank to 40 questions covering Big Five traits
  - Implement proper scoring algorithm for personality dimensions
  - Store psychological profile in database
  - Integrate profile into AI conversation context
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 6.1 Create comprehensive question bank
  - Write 5 questions per Big Five trait (25 questions)
  - Write 5 questions for decision-making style
  - Write 5 questions for stress response
  - Write 5 questions for motivation drivers
  - Implement question randomization
  - _Requirements: 4.1_

- [ ] 6.2 Implement scoring algorithm
  - Calculate Big Five trait scores (0-100 scale)
  - Determine decision-making style from responses
  - Determine stress response pattern
  - Identify top motivation drivers
  - Create PsychologicalProfile interface
  - _Requirements: 4.2_

- [ ] 6.3 Update psychological test page
  - Display all 40 questions with proper UI
  - Add progress indicator
  - Implement answer validation
  - Show results summary after completion
  - _Requirements: 4.5_

- [ ] 6.4 Store profile in database
  - Add psychologicalProfile field to UserProfile model
  - Save profile after test completion
  - Add profileAssessedAt timestamp
  - Implement profile re-assessment after 6 months
  - _Requirements: 4.3_

- [ ] 6.5 Integrate profile into AI context
  - Include psychological profile in system prompt
  - Adapt communication style based on preferences
  - Provide insights aligned with personality traits
  - Use profile data in Devaneio scenario generation
  - _Requirements: 4.4_

## Phase 3: Community & Advanced Features

- [ ] 7. Complete Forum and Community Features
  - Implement nested comments and replies
  - Add upvoting system for posts and comments
  - Build private messaging system
  - Create mentorship matching algorithm
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 7.1 Enhance forum post system
  - Add Comment model with parentCommentId for nesting
  - Implement upvoting functionality
  - Add post categories and tags
  - Implement post search and filtering
  - _Requirements: 6.2_

- [ ] 7.2 Build private messaging system
  - Create Message and Conversation models
  - Implement sendMessage and getConversations methods
  - Build messaging UI component
  - Add real-time message notifications
  - Implement unread message counter
  - _Requirements: 6.3_

- [ ] 7.3 Create mentorship system
  - Create MentorProfile model
  - Implement mentor registration flow
  - Build mentorship matching algorithm based on numerology
  - Create mentor-mentee connection interface
  - Add mentor rating system
  - _Requirements: 6.4_

- [ ] 7.4 Add content moderation
  - Implement profanity filter for posts and messages
  - Add report functionality for inappropriate content
  - Create admin moderation interface
  - Implement automatic flagging of suspicious content
  - _Requirements: 6.5_

- [ ] 8. Implement AI-Powered Devaneio Mode
  - Integrate Gemini AI for scenario generation
  - Generate personalized paths based on numerology and psychology
  - Create actionable step-by-step plans
  - Implement scenario saving and tracking
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 8.1 Create DevaneioAIService class
  - Implement generateScenario method using Gemini API
  - Create comprehensive system prompt with user context
  - Parse AI response into structured DevaneioScenario
  - Add error handling for API failures
  - _Requirements: 7.1_

- [ ] 8.2 Implement probability analysis
  - Create analyzeProbability method
  - Consider numerology alignment in probability calculation
  - Factor in psychological profile traits
  - Consider current life circumstances (Ano Pessoal)
  - _Requirements: 7.2_

- [ ] 8.3 Generate actionable steps
  - Implement generateSteps method
  - Create specific, time-bound action items
  - Include numerology support for each step
  - Assign difficulty levels to steps
  - _Requirements: 7.3_

- [ ] 8.4 Update DevaneioMode component
  - Replace hardcoded scenario generation with AI service
  - Add loading states during AI generation
  - Implement scenario saving to database
  - Add scenario progress tracking
  - _Requirements: 7.4, 7.5_

- [ ] 9. Build Micro-Meditation System
  - Generate personalized meditation scripts using AI
  - Implement text-to-speech audio generation
  - Create meditation player component
  - Track meditation sessions in database
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 9.1 Create MeditationScriptGenerator class
  - Implement generateScript method using Gemini API
  - Create meditation templates for different focuses
  - Personalize scripts with numerology insights
  - Support multiple duration options (3, 5, 10, 15 min)
  - _Requirements: 8.1_

- [ ] 9.2 Implement audio generation
  - Integrate Web Speech API for free tier
  - Add ElevenLabs integration for premium tier (optional)
  - Create MeditationAudioService class
  - Generate and cache audio files
  - _Requirements: 8.2, 8.5_

- [ ] 9.3 Build meditation player component
  - Create audio player with play/pause controls
  - Add progress bar and time display
  - Implement background audio playback
  - Add meditation completion tracking
  - _Requirements: 8.2_

- [ ] 9.4 Update MicroMeditation component
  - Replace placeholder with real meditation generation
  - Add meditation library with saved sessions
  - Implement meditation history tracking
  - Add statistics (total time, sessions completed)
  - _Requirements: 8.3, 8.4_

## Phase 4: Advanced Chat & Accountability

- [ ] 10. Implement Goal Tracking and Accountability
  - Extract goals from conversation using AI
  - Track goal progress and check-in frequency
  - Generate proactive accountability prompts
  - Display goal dashboard
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 10.1 Create GoalTrackingService class
  - Implement extractGoals method using Gemini API
  - Create Goal model in database
  - Implement shouldPromptCheckIn logic
  - Generate accountability prompts based on numerology
  - _Requirements: 9.1, 9.2_

- [ ] 10.2 Build goal dashboard component
  - Display active goals with progress bars
  - Show upcoming check-ins
  - Add goal completion interface
  - Implement goal editing and deletion
  - _Requirements: 9.4_

- [ ] 10.3 Integrate goal tracking into chat
  - Automatically detect goal mentions in conversation
  - Prompt user to confirm goal creation
  - Show goal context in chat sidebar
  - Send proactive check-in messages
  - _Requirements: 9.3_

- [ ] 11. Implement Emotional Pattern Detection
  - Analyze messages for emotional content
  - Detect patterns over time
  - Generate adaptive responses
  - Suggest interventions when needed
  - _Requirements: 9.3, 9.4_

- [ ] 11.1 Create EmotionalAnalysisService class
  - Implement analyzeEmotion method using Gemini API
  - Detect anxiety, stress, depression, excitement patterns
  - Calculate confidence scores for detections
  - Track patterns over conversation history
  - _Requirements: 9.3_

- [ ] 11.2 Implement adaptive response system
  - Generate responses adapted to emotional state
  - Adjust tone and language based on emotion
  - Incorporate numerology insights into responses
  - Maintain empathy while being helpful
  - _Requirements: 9.4_

- [ ] 11.3 Build intervention system
  - Create InterventionService class
  - Suggest appropriate interventions (meditation, breathing, reframe)
  - Track intervention effectiveness
  - Learn from user feedback on interventions
  - _Requirements: 9.4_

- [ ] 11.4 Update ChatInterface with emotional awareness
  - Display detected emotional tone in messages
  - Show intervention suggestions when appropriate
  - Add quick access to meditation/breathing exercises
  - Implement feedback mechanism for interventions
  - _Requirements: 9.3, 9.4_

## Phase 5: Testing, Optimization & Polish

- [ ] 12. Comprehensive Testing
  - Write unit tests for all calculation functions
  - Write integration tests for API routes
  - Write E2E tests for critical user flows
  - Perform manual testing across browsers and devices
  - _Requirements: All_

- [ ] 12.1 Write unit tests
  - Test all numerology calculation functions
  - Test validation algorithms
  - Test data transformation utilities
  - Test error handling functions
  - Achieve >80% code coverage
  - _Requirements: 2.1, 2.2_

- [ ] 12.2 Write integration tests
  - Test API routes with real database
  - Test authentication flows
  - Test external API integrations (with mocks)
  - Test real-time subscriptions
  - _Requirements: All API-related requirements_

- [ ] 12.3 Write E2E tests
  - Test complete onboarding flow
  - Test voice conversation flow
  - Test forum post creation and interaction
  - Test goal creation and tracking
  - Test meditation session completion
  - _Requirements: All user-facing requirements_

- [ ] 12.4 Perform manual testing
  - Test on Chrome, Firefox, Safari
  - Test on iOS and Android devices
  - Test with slow network conditions
  - Test with API failures
  - Create bug reports for issues found
  - _Requirements: All_

- [ ] 13. Performance Optimization
  - Implement code splitting and lazy loading
  - Optimize database queries with proper indexing
  - Add caching for expensive operations
  - Optimize images and assets
  - _Requirements: All_

- [ ] 13.1 Implement code splitting
  - Split routes into separate bundles
  - Lazy load heavy components (D3 charts, audio players)
  - Use dynamic imports for optional features
  - Measure bundle size improvements
  - _Requirements: All_

- [ ] 13.2 Optimize database queries
  - Add indexes to frequently queried fields
  - Implement pagination for large result sets
  - Use database views for complex queries
  - Optimize N+1 query problems
  - _Requirements: 10.1, 10.2_

- [ ] 13.3 Implement caching strategy
  - Cache numerology calculations (rarely change)
  - Cache astrology data (30-day TTL)
  - Cache AI-generated content (with invalidation)
  - Use React Query for client-side caching
  - _Requirements: All_

- [ ] 13.4 Optimize assets
  - Compress images using Next.js Image component
  - Minify CSS and JavaScript
  - Use WebP format for images
  - Implement lazy loading for images
  - _Requirements: All_

- [ ] 14. Documentation and Deployment
  - Write API documentation
  - Create user guide
  - Set up monitoring and error tracking
  - Deploy to production
  - _Requirements: All_

- [ ] 14.1 Write technical documentation
  - Document all API endpoints
  - Document database schema
  - Document environment variables
  - Create developer setup guide
  - _Requirements: All_

- [ ] 14.2 Create user documentation
  - Write user guide for all features
  - Create video tutorials for complex features
  - Write FAQ section
  - Create troubleshooting guide
  - _Requirements: All_

- [ ] 14.3 Set up monitoring
  - Integrate Sentry for error tracking
  - Set up Vercel Analytics
  - Configure uptime monitoring
  - Set up performance monitoring
  - Create alert rules for critical errors
  - _Requirements: All_

- [ ] 14.4 Deploy to production
  - Set up production environment variables
  - Run database migrations on production
  - Deploy to Vercel
  - Verify all features work in production
  - Monitor for errors after deployment
  - _Requirements: All_
