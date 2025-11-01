# Moodsphere: A Social Mood Journal 
Moodsphere is a mobile-friendly web application that helps users track their emotions, reflect on their mental well-being, and connect with friends and peers for support. Mental health challenges are incredibly common, yet many people struggle to find safe and accessible ways to express how they feel. Moodsphere provides an easy and supportive space to log moods, visualize emotional patterns, and share experiences within a trusted network. 
Our vision is to create a digital space that empowers users to understand their emotions and strengthen community support through self-reflection and shared well-being. We aim to make emotional wellness approachable, trackable, and socially connected.

## Collaborators
- [Aaqila Patel](https://github.com/aaqilap)
- [Preston Lee](https://github.com/prestonglee0805)
- [Samay Dhawan](https://github.com/samaythe1)
- [Siyansh Balyan](https://github.com/sb8520)
- [Sarah Randhawa](https://github.com/sarahrandhawa)

## Project History 
MoodSphere was conceived as part of an academic project by a team of students who share a deep interest in mental health awareness and digital innovation. The idea emerged from recognizing how many people—especially students—struggle to process emotions in fast-paced, online environments that often lack genuine support.
Our team wanted to build something more personal than a standard journaling app. We envisioned a digital space where users could not only log their moods and reflections but also see meaningful insights into their emotional patterns and, if they choose, share those experiences with trusted peers.
The project combines the principles of psychology, user-centered design, and data visualization to promote mindfulness and emotional intelligence. From its initial brainstorming phase, MoodSphere has evolved through iterative sprints focused on research, wireframing, and prototype testing—all aimed at ensuring that the platform feels intuitive, safe, and empowering. Ultimately, MoodSphere represents our collective goal: to make mental-health tracking approachable, social, and supportive, while encouraging people to understand themselves and connect through shared experiences.

## Prototype
[Figma Clickable Prototype](https://www.figma.com/proto/3CaJtOCcUR7DTozlQJKRfE/Moodsphere?node-id=10-4&starting-point-node-id=10%3A4&t=SmiLEDxiCU7oBWvi-1)

## Current State of Project - Sprint 1 
Front-end UI is implemented in **React (function components + JSX)** and runs locally with `npm start`. The following screens/flows are in place:

- **Auth Screens:** Login and Sign-Up pages scaffolded (non-functional for now).
- **Dashboard:** 
  - **Daily Reflection** text area with a **time-of-day prompt** that changes throughout the day.
  - **Current Mood** with the **Moodsphere** emoji display that updates based on user selection.
- **Mood & Journal Pages:** 
  - **Log Mood** page (select + update).
  - **Journal Entry** page (compose and save to in-memory view).
  - **View Journal Entries** page (lists prior entries within the session).
- **Social:** **Chat with Friends** screen UI scaffolded.
- **Journal Calendar:** Calendar UI that highlights dates with journal entries (session-level/in-memory).

## How to Contribute 
See [`CONTRIBUTING.md`](./CONTRIBUTING.md)

## Build and Test Instructions 

### Front-End SetUp and Run Instructions
The front-end of Moodsphere is built with **React.js** using functional components and JSX syntax. To run the app locally, follow the steps below. 

#### 1. Clone the repository 
```bash
git clone https://github.com/agile-students-fall2025/4-final-moodsphere.git
cd 4-final-moodsphere/front-end
```

#### 2. Install dependencies 
Make sure you have Node.js v18+ and npm v9+ installed. 

```bash
npm install 
```

#### 3. Run the development server 
```bash
npm start 
```
The app will open automatically at: http://localhost:3000

#### 4. Build for production
To create an optimized production build: 
```bash
npm run build  
```

#### 5. Environment Variables
None required to run the front-end for **Sprint 1**.














