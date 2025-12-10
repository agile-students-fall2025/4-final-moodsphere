# Moodsphere: A Social Mood Journal 
Moodsphere is a mobile-friendly web application that helps users track their emotions and reflect on their mental well-being through mood logging, journaling, and daily reflections. Mental health challenges are incredibly common, yet many people struggle to find safe and accessible ways to express how they feel. Moodsphere provides an easy and supportive space to log moods, visualize emotional patterns, and reflect consistently.
Our vision is to create a digital space that empowers users to understand their emotions through self reflection and habit tracking. We aim to make emotional wellness approachable, trackable, and sustainable.

## Collaborators
- [Aaqila Patel](https://github.com/aaqilap)
- [Preston Lee](https://github.com/prestonglee0805)
- [Samay Dhawan](https://github.com/samaythe1)
- [Siyansh Balyan](https://github.com/sb8520)
- [Sarah Randhawa](https://github.com/sarahrandhawa)

## Project History 
MoodSphere was conceived as part of an academic project by a team of students who share a deep interest in mental health awareness and digital innovation. The idea emerged from recognizing how many people, especially students, struggle to process emotions in fast-paced, online environments that often lack genuine support.
Our team wanted to build something more personal than a standard journaling app. We envisioned a digital space where users could not only log their moods and reflections but also see meaningful insights into their emotional patterns and, if they choose, analyze those experiences through meaningful emotional patterns over time.
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
- **Journal Calendar:** Calendar UI that highlights dates with journal entries (session-level/in-memory).

## Current State of Project – Sprint 2

Sprint 2 focused on building and integrating the Express.js back-end with the existing React front-end.

**Back-end integration:**
- Built with Express.js and organized into separate route handlers.
- Provides RESTful endpoints for authentication, moods, journal entries, and calendar data (see API Endpoints below).
- Uses in-memory mock data for now (no database yet).
- Includes Mocha/Chai unit tests and c8 coverage (≥ 10% coverage, meeting the sprint requirement).

**Front-end integration:**
- Front-end now fetches data from the Express API instead of using purely in-memory state.
- Mood logging, journal entry creation, and calendar views are wired to the corresponding back-end routes.
- The app can be run with both servers (front-end and back-end) running locally.

## Current State of Project - Sprint 3

Sprint 3 focused on fully integrating a cloud-hosted MongoDB database, securing all authentication with JWT, and safely handling credentials through environmental variables. All Sprint 3 technical requirements were completed.

**Database Integration (MongoDB & Mongoose):**
* Connected the backend to a cloud-hosted MongoDB Atlas instance.
* Integrated database access using Mongoose.
* Implemented the User model for authenticating registered users.
* In-memory mock data from Sprint 2 is now being migrated into persistent MongoDB collections. All user accounts are now stored persistently in MongoDB, not in memory.

**Secure Auth + JWT:**
* JWT is stored by the frontend and automatically attached to protected API requests via:

```bash
Authorization: Bearer <token>
```

* Backend routes requiring logged-in access are protected with a custom requireAuth middleware, which verifies the JWT before allowing access.


**Environment Variables:**
* Sensitive credentials (MongoDB URI and JWT secret) are stored in a .env file and loaded with dotenv.
* .env is excluded from Git via .gitignore.
* A .env.example file is included to guide setup without exposing real credentials.

**Data Validation:**
* All /auth/register and /auth/login requests use express-validator to validate user input before interacting with the database.
* Prevents malformed data and enforces password/email rules.

**Protected Backend Routes:**
* Routes for moods, reflections, journal entries, and calendar access now require authentication.
* Any request missing or carrying an invalid token returns an HTTP 401 Unauthorized response.

Overall, the application now uses secure credential management, persistent cloud data, and token-based authentication for all protected functionality.


## Current State of Project - Sprint 4
Sprint 4 focused on deploying the full Moodsphere application (front end + back-end) to a live cloud server using a DigitalOcean Droplet. This sprint completed the transition from local development to a publicly accessible production environment. 

### Live Deployment 
This application is now live and publicly accessible at: 

```bash
http://159.203.68.83
```

Users can register, log in, log moods, write reflections, and view their dashboard using the deployed system. 

### Cloud Infrastructure (DigitalOcean)
* The application is hosted on a DigitalOcean Ubuntu Droplet 
* The back-end is deployed using: 
    * Node.js 
    * PM2 for process management and persistence 
* The front-end deployed using: 
    * A React production build 
    * Served as a static site via the server 


### Security and Environmental Variables 
* All sensitive credentials are stored in a private .env file on the server 
* The .env file is: 
    * NOT committed to Github 
    * Shared only with admins/graders via the team messenger (per course policy)
* A .env.example file remains in the repository for setup reference 

### Front-End and Back-End Communication 
* All front-end API requests were updated from: 
```bash
http://localhost:5001
```

to 
```bash
/api/...
```

This allows the deployed front-end to correctly communicate with the deployed back-end without relying on localhost. 

### Deployment Status 
* Front-end successfully deployed 
* Back-end successfully deployed 
* MongoDB Atlas connected in production 
* JWT authentication fully functional in production
* PM2 process manager running and stable: 
* Full user flow verified: 
    * Signup 
    * Login 
    * Mood logging 
    * Reflections 
    * Dashboard 
    * Sign out 

### Summary - Sprint 4 successfully transitioned Moodsphere from a fully local development application to a live, production-ready cloud hosted platform. This completed the full stack, deployment lifecycle, including environment security, authentication, database, persistence, and real-world accessibility. 




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
- `POST /api/auth/signup` – Create a new user account (stored in MongoDB)
- `POST /api/auth/login` – Log in an existing user and return a JWT
- `POST /api/auth/signout` – Sign out user (mock route; front-end clears token/local state)

> Note: The front-end stores the JWT in `localStorage` and sends it as  
> `Authorization: Bearer <token>`

**Moods**
- `POST /api/moods` **(Protected)** – Log a new mood (requires valid JWT)
- `GET /api/moods` **(Protected)** – Get all logged moods (requires valid JWT)

**Journal Entries**
- `POST /api/entries` **(Protected)** – Create a new journal entry (title, content, createdAt)
- `GET /api/entries` **(Protected)** – Get all journal entries (requires valid JWT)

**Calendar**
- `GET /api/calendar` **(Protected)** – Get all dates that have either a mood or journal entry recorded (requires valid JWT)

**Reflections**
- `GET /api/reflections` **(Protected)** – Get all reflection entries (prompt + text; requires valid JWT)
- `POST /api/reflections` **(Protected)** – Create a new reflection entry (requires valid JWT)


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
To run the backend with database and authentication enabled, a .env file must be created inside the /back-end directory.
This file contains private credentials and must not be committed.

##### 1. Copy the example file 
Inside the back-end directory follow the instructions from the example .env file. In other words, run: 
```bash
cp .env.example .env
```

##### 2. Insert the credentials 
Open .env and provide the values for the following fields. 
```bash

MONGODB_URI=<your MongoDB Atlas connection URI>
JWT_SECRET=<your JWT signing key>
PORT=5001
```

##### 3. Start the backend normally 
```bash
cd back-end
npm install 
npm start
```

If the .env is set correctly, you should see the following: 
```bash
Mongoose connected to MongoDB Altas. 
Moodsphere backend listening on http://localhost:5001
```

#### Security Notes 
* .env must never be committed to Github
* .env is already listed in .gitignore 
* MongoDB Atlas is cloud-hosted (no local installations)
* All stored data is now persistent in the database 
* All protected routes check for a valid JWT in: 
```bash
Authorization: Bearer <token>
```


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














