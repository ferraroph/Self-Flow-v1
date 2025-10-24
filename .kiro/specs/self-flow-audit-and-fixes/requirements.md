# Requirements Document - Self Flow Audit & Fixes

## Introduction

This specification addresses the comprehensive audit and correction of the Self Flow application. The TODO.md file marks many features as "completed," but a thorough code review reveals that several features are either:
1. Not implemented at all
2. Implemented incorrectly or incompletely
3. Using placeholder/mock data instead of real functionality
4. Missing critical integrations

This spec will systematically verify each claimed feature, identify issues, and implement proper solutions.

## Glossary

- **Self Flow**: The main application - a numerology-based digital clone system
- **Numerology Engine**: The calculation system for numerological mappings
- **Live API**: Google Generative AI integration for voice streaming
- **Devaneio Mode**: Future simulation feature for exploring life scenarios
- **Gamification System**: Points, achievements, and progression system
- **Forum System**: Community interaction platform
- **Astrology Integration**: Birth chart and horoscope features
- **Psychological Test**: User profiling questionnaire
- **Micro-Meditation**: Short guided meditation sessions
- **Audio Streaming**: Real-time voice conversation with AI

## Requirements

### Requirement 1: Voice Streaming System Audit

**User Story:** As a user, I want real voice streaming conversations with my digital clone, so that I can have natural, spoken interactions.

#### Acceptance Criteria

1. WHEN the user activates voice mode in ChatInterface, THE System SHALL establish a real WebRTC connection with Google Generative AI Live API
2. WHEN the user speaks into their microphone, THE System SHALL stream audio data in real-time to the AI service
3. WHEN the AI responds, THE System SHALL play back audio responses without requiring full download
4. IF the Live API connection fails, THEN THE System SHALL fall back to text-based interaction with clear user notification
5. WHERE voice streaming is active, THE System SHALL display real-time audio visualization based on actual audio levels

### Requirement 2: Numerology Calculation Validation

**User Story:** As a user, I want 100% accurate numerology calculations, so that I can trust the insights provided by my digital clone.

#### Acceptance Criteria

1. THE System SHALL calculate all 15 numerology numbers using the correct Kabbalistic method
2. WHEN calculating any numerology number, THE System SHALL perform dual validation using independent algorithms
3. IF validation fails for any calculation, THEN THE System SHALL log the discrepancy and alert administrators
4. THE System SHALL correctly handle special characters (ç, ã, é, etc.) according to the numerology table
5. THE System SHALL preserve master numbers (11, 22, 33) during reduction calculations

### Requirement 3: Astrology Integration Verification

**User Story:** As a user, I want my complete birth chart calculated and displayed, so that I can understand my astrological profile.

#### Acceptance Criteria

1. WHEN a user completes onboarding with birth data, THE System SHALL fetch their complete birth chart from a real astrology API
2. THE System SHALL store the birth chart data in the database for future reference
3. THE System SHALL display the birth chart with visual representations of planetary positions
4. IF the astrology API is unavailable, THEN THE System SHALL display cached data or a clear error message
5. THE System SHALL NOT display placeholder or mock horoscope data

### Requirement 4: Psychological Test Implementation

**User Story:** As a user, I want to complete a comprehensive psychological profile, so that my digital clone can provide personalized guidance.

#### Acceptance Criteria

1. THE System SHALL present a minimum of 20 validated psychological assessment questions
2. WHEN the user completes the test, THE System SHALL calculate personality dimensions using established psychological frameworks
3. THE System SHALL store the psychological profile in the database linked to the user account
4. THE System SHALL integrate psychological profile data into AI conversation context
5. THE System SHALL provide users with a summary of their psychological profile results

### Requirement 5: Gamification System Functionality

**User Story:** As a user, I want to earn points and unlock achievements, so that I stay motivated to use the platform regularly.

#### Acceptance Criteria

1. THE System SHALL track user activities (conversations, meditations, logins) in real-time
2. WHEN a user completes an achievement requirement, THE System SHALL unlock the achievement immediately
3. THE System SHALL calculate XP based on actual user statistics from the database
4. THE System SHALL persist gamification data across sessions
5. THE System SHALL display accurate leaderboard rankings based on real user data

### Requirement 6: Forum and Community Features

**User Story:** As a user, I want to interact with other users through forums and messaging, so that I can share experiences and learn from others.

#### Acceptance Criteria

1. THE System SHALL allow users to create forum posts with title and content
2. WHEN a user views a forum post, THE System SHALL display all comments and replies
3. THE System SHALL implement a private messaging system between users
4. THE System SHALL implement a mentorship matching system based on numerology compatibility
5. THE System SHALL moderate content for inappropriate material

### Requirement 7: Devaneio Mode Simulation

**User Story:** As a user, I want to simulate future scenarios based on my numerology, so that I can make better life decisions.

#### Acceptance Criteria

1. WHEN a user creates a scenario, THE System SHALL generate multiple possible paths using AI analysis
2. THE System SHALL incorporate the user's numerology map into scenario probability calculations
3. THE System SHALL provide step-by-step guidance for each possible path
4. THE System SHALL save scenarios for future reference
5. THE System SHALL allow users to track progress on chosen scenarios

### Requirement 8: Micro-Meditation System

**User Story:** As a user, I want personalized guided meditations, so that I can practice mindfulness aligned with my numerology.

#### Acceptance Criteria

1. THE System SHALL generate meditation scripts personalized to the user's numerology map
2. WHEN a user starts a meditation, THE System SHALL play audio guidance (text-to-speech or pre-recorded)
3. THE System SHALL track meditation completion and duration
4. THE System SHALL offer meditations of varying lengths (3, 5, 10, 15 minutes)
5. WHERE voice cloning is available, THE System SHALL use the user's cloned voice for meditations

### Requirement 9: Advanced Chat Features

**User Story:** As a user, I want intelligent accountability and adaptive interventions, so that my digital clone helps me achieve my goals.

#### Acceptance Criteria

1. THE System SHALL track user-stated goals and commitments during conversations
2. WHEN a user has not checked in on a goal, THE System SHALL proactively ask about progress
3. THE System SHALL detect emotional patterns in user messages and adapt responses accordingly
4. THE System SHALL provide intervention suggestions when detecting negative patterns
5. THE System SHALL maintain conversation context across multiple sessions

### Requirement 10: Data Persistence and API Integration

**User Story:** As a developer, I want all features to use real database storage and API integrations, so that the application functions properly in production.

#### Acceptance Criteria

1. THE System SHALL store all user data (profile, numerology, conversations) in Supabase database
2. THE System SHALL use Prisma ORM for all database operations
3. THE System SHALL implement proper error handling for all API calls
4. THE System SHALL use environment variables for all API keys and secrets
5. THE System SHALL implement proper authentication checks on all protected routes
