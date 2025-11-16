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

## Current State of Project – Sprint 2

Sprint 2 focused on building and integrating the Express.js back-end with the existing React front-end.

**Back-end:**
- Built with Express.js and organized into separate route handlers.
- Provides RESTful endpoints for authentication, moods, journal entries, and calendar data (see API Endpoints below).
- Uses in-memory mock data for now (no database yet).
- Includes Mocha/Chai unit tests and c8 coverage (≥ 10% coverage, meeting the sprint requirement).

**Front-end integration:**
- Front-end now fetches data from the Express API instead of using purely in-memory state.
- Mood logging, journal entry creation, and calendar views are wired to the corresponding back-end routes.
- The app can be run with both servers (front-end and back-end) running locally.

## How to Contribute 
See [`CONTRIBUTING.md`](./CONTRIBUTING.md)

## Build and Test Instructions 

### Front-End Set Up and Run Instructions
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

---

### Back-End Setup and Run Instructions
The back-end of Moodsphere is built with **Express.js** and provides RESTful API endpoints for authentication, mood tracking, journal entries, and calendar data.

#### 1. Navigate to the back-end directory
```bash
cd back-end
```

#### 2. Install dependencies
Make sure you have Node.js v18+ and npm v9+ installed.

```bash
npm install
```

This installs:
- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **mocha** - Test framework (dev)
- **chai** - Assertion library (dev)
- **supertest** - HTTP testing (dev)
- **c8** - Code coverage tool (dev)

#### 3. Start the development server
```bash
npm start
```

The backend server will start at: **http://localhost:5001**

You should see: `Moodsphere backend listening on http://localhost:5001`

#### 4. Available API Endpoints

**Health Check**
- `GET /api/health` – Check server status (used to verify the backend is running)

**Authentication**
- `POST /api/auth/signup` – Create a new user account (stored in in-memory array)
- `POST /api/auth/login` – Log in an existing user (validates against in-memory users)
- `POST /api/auth/signout` – Sign out user (mock route; would invalidate session/token in a real app)

**Moods**
- `POST /api/moods` – Log a new mood (mood + timestamp)
- `GET /api/moods` – Get all logged moods

**Journal Entries**
- `POST /api/entries` – Create a new journal entry (title, content, createdAt)
- `GET /api/entries` – Get all journal entries

**Calendar**
- `GET /api/calendar` – Get all dates that have either a mood or journal entry recorded

**Chat**
- `GET /api/chat` – Get all chat messages (mock in-memory conversation)
- `POST /api/chat` – Post a new chat message

**Reflections**
- `GET /api/reflections` – Get all reflection entries (prompt + text)
- `POST /api/reflections` – Create a new reflection entry


#### 5. Running Tests
Run all unit tests with mocha:
```bash
npm test
```

Run tests with code coverage report:
```bash
npm run coverage
```

The coverage report shows the percentage of code covered by tests. The project meets the requirement of **10%+ code coverage**.

#### 6. Testing the API Manually

You can test endpoints using curl:

**Test Signup:**
```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Test Login:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Test Calendar:**
```bash
curl http://localhost:5001/api/calendar
```

#### 7. Environment Variables
None required for **Sprint 2**. Mock data is stored in-memory and will be replaced with a database in Sprint 3.

#### 8. Running Front-End and Back-End Together

**Terminal 1 - Backend:**
```bash
cd back-end
npm start
```

**Terminal 2 - Frontend:**
```bash
cd front-end/moodsphere-frontend
npm start
```

The frontend will automatically connect to the backend at `http://localhost:5001`.














