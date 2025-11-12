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

## Current State of Project – Sprint 2

This sprint focused on connecting the frontend to a functioning backend built with Express .js and introducing test coverage using Mocha, Chai, Supertest, and C8.

#### Implemented Features

- **Reflections Page:** Users can now submit daily reflections that save through the backend.
- **Journal Entries Page:** Connected to Express routes for creating and fetching entries.
- **Log Mood Page:** Integrated with backend `/api/moods` endpoint.
- **Routing:** Dashboard ↔ Reflections ↔ Journal ↔ Log Mood now linked via React Router.
- **Testing:** Added unit and integration tests for mood and journal routes; coverage > 10%.
- **Documentation:** Updated README, task board, and user stories for Sprint 2.

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

---

### Back-End Setup and Run Instructions

The back-end of Moodsphere is built with **Express.js** and provides RESTful API endpoints for authentication, mood tracking, journal entries, and calendar data.

#### 1. Navigate to the back-end directory

```bash
cd /Users/prestonlee/Desktop/Agile/4-final-moodsphere/back-end
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

**Authentication:**

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login existing user
- `POST /api/auth/signout` - Sign out user

**Moods:**

- `POST /api/moods` - Log a new mood
- `GET /api/moods` - Get all moods

**Journal Entries:**

- `POST /api/entries` - Create a journal entry
- `GET /api/entries` - Get all journal entries

**Calendar:**

- `GET /api/calendar` - Get dates with mood/journal entries

**Health Check:**

- `GET /api/health` - Check server status

**Reflections:**

- `GET/POST /api/reflections` - Get and save reflections

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
