# Moodsphere: A Social Mood Journal 
Moodsphere is a mobile-friendly web application that helps users track their emotions, reflect on their mental well-being, and connect with friends and peers for support. Mental health challenges are incredibly common, yet many people struggle to find safe and accessible ways to express how they feel. Moodsphere provides an easy and supportive space to log moods, visualize emotional patterns, and share experiences within a trusted network. 
Our vision is to create a digital space that empowers users to understand their emotions and strengthen community support through self-reflection and shared well-being. We aim to make emotional wellness approachable, trackable, and socially connected.

## Live Deployment 
Try Moodsphere now: 
[Access the live deployment here](http://159.203.68.83/)
Deployed on DigitalOcean with a full production-ready front-end, back-end, MongoDB Atlas database, and JWT authentication.

## Collaborators
- [Aaqila Patel](https://github.com/aaqilap)
- [Preston Lee](https://github.com/prestonglee0805)
- [Samay Dhawan](https://github.com/samaythe1)
- [Siyansh Balyan](https://github.com/sb8520)
- [Sarah Randhawa](https://github.com/sarahrandhawa)

## Project History 
MoodSphere was conceived as part of an academic project by a team of students who share a deep interest in mental health awareness and digital innovation. The idea emerged from recognizing how many people, especially students, struggle to process emotions in fast-paced, online environments that often lack genuine support.
Our team wanted to build something more personal than a standard journaling app. We envisioned a digital space where users could not only log their moods and reflections but also see meaningful insights into their emotional patterns and, if they choose, share those experiences with trusted peers in a unique manner.
The project combines the principles of psychology, user-centered design, and data visualization to promote mindfulness and emotional intelligence. From its initial brainstorming phase, MoodSphere has evolved through iterative sprints focused on research, wireframing, and prototype testing—all aimed at ensuring that the platform feels intuitive, safe, and empowering. Ultimately, MoodSphere represents our collective goal: to make mental-health tracking approachable, social, and supportive, while encouraging people to understand themselves and connect through shared experiences. 

## Prototype
[Figma Clickable Prototype](https://www.figma.com/proto/3CaJtOCcUR7DTozlQJKRfE/Moodsphere?node-id=10-4&starting-point-node-id=10%3A4&t=SmiLEDxiCU7oBWvi-1)


## Key Features 
* **User Authentication and Security**
    * Secure JWT-based login and registration
    * Protected API routes
    * Environment-variable-based credential management
* **Mood and Reflection Tracking**
    * Daily mood logging with interactive emoji-based Moodsphere display
    * Guided daily reflections
    * View personal emotional history
* **Journal System**
    * Create journal entries
    * Persist entries across sessions
    * View historical entries in a structured list
* **Calendar View**
    * Visual calendar highlights days with moods or journal entries
    * Enables emotional pattern tracking over time
* **Database**
    * MongoDB Atlas stores all user data
    * Full Mongoose ODM integration
    * Strict data validation using express-validator
  * **Live Production Deployment**
      * Front-end and back-end deployed on DigitalOcean
      * Production build served via Node.js
      * Secure environment variable management (.env)
      * PM2 process manager ensures uptime

## Setup Instructions 

**Prerequisites**
To run or deploy Moodsphere, you will need:
```bash
* Node.js v18+
* npm v9+
* MongoDB Atlas account (for production)
* DigitalOcean account (for deployment only)
```

### Quickstart

#### Back-end
```bash
cd back-end
npm install
npm start
```
Runs at http://localhost:5001/

#### Front-end
```bash
cd front-end/moodsphere-frontend
npm install
npm start
```

### Detailed Setup

#### Backend Setup
1. Navigate to the back-end directory
```bash
cd back-end
```

2. Install dependencies:
3. ```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env
```

4. Add the following to .env:
```bash
PORT=5001
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
```

5. Start the server
```bash
npm start
```

#### Frontend Setup
1. Navigate to the front-end directory
```bash
cd front-end/moodsphere-frontend
```

2. Install dependencies:
3. ```bash
npm install
```

3. Start the deployment server 
```bash
npm start
```

4. Build for production
```bash
npm run build
```

## API Endpoints 

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



## Security and Environmental Variables 
Place in back-end/.env
```bash
PORT=5001
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
```

* All sensitive credentials are stored in a private .env file on the server 
* The .env file is: 
    * NOT committed to Github 
    * Shared only with admins/graders via the team messenger (per course policy)
* A .env.example file remains in the repository for setup reference
  

## Testing Procedure 

 Run tests 
```bash
npm test
```

Run coverage 
```bash
npm run coverage
```
**Testing Stack**
* Mocha
* Chai
* Supertest
* c8 code coverage
Meets the required ≥10% back-end coverage

## Technical Implementation

### Back-End Architecture
* Node.js + Express.js
* RESTful routes
* Mongoose for MongoDB
* JWT authentication
* express-validator for validation

### Front-End Architecture
* React.js (function components + JSX)
* State-driven UI
* Secure token handling via localStorage

### Security 
* JWT-based protected routes
* Password hashing
* Safe environment variable handling


## Deployment to DigitalOcean

### Production Environment Includes:
* Ubuntu Droplet
* PM2 process manager
* Node.js backend server
* React production build served statically
* Environment variables securely stored
* Persistent connection to MongoDB Atlas

### Deployment Status
* ✔ Front-end deployed
* ✔ Back-end deployed
* ✔ MongoDB connected
* ✔ Full user flow verified
* ✔ JWT authentication operational


## How to Contribute 
See [`CONTRIBUTING.md`](./CONTRIBUTING.md)

