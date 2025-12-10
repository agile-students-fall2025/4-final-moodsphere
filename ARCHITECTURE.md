# Moodsphere Architecture

This document provides an overview of the Moodsphere project architecture, including the frontend, backend, and database structure.

---

## 1. Project Overview

Moodsphere is a journaling web app that allows users to log their moods and journal entries. Key features include:

- User authentication (JWT-based)
- Daily mood tracking
- Journal entry creation, editing, and viewing
- Dashboard overview of moods over time

---

## 2. Folder Structure

4-final-moodsphere/
│
├── client/ # Frontend React app
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components (Dashboard, JournalEntry, JournalEditor)
│ │ ├── App.js # Main app routing
│ │ └── index.js # Entry point
│
├── server/ # Backend Node.js app
│ ├── routes/ # Express API routes
│ ├── controllers/ # Route handlers
│ ├── models/ # MongoDB schemas
│ ├── middleware/ # Auth and error handling
│ └── server.js # Server entry point
│
├── docker-compose.yml # Docker configuration
├── package.json
└── README.md


---

## 3. Tech Stack

- **Frontend:** React, React Router, CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT tokens  
- **DevOps:** Docker for local development  

---

## 4. Data Flow

1. User interacts with frontend (React).  
2. API requests are sent to Express backend.  
3. Backend queries MongoDB and returns results.  
4. Frontend displays entries, mood stats, and dashboards.  

---

## 5. Key Components

- **JournalEntry Page:** Displays entries for a selected date.  
- **JournalEditor Page:** Allows creating or editing a journal entry.  
- **Dashboard:** Shows mood trends and recent entries.  
- **Auth Middleware:** Verifies JWT tokens on protected routes.  

---

## 6. API Endpoints (Summary)

- `GET /api/entries?date=YYYY-MM-DD` → Fetch journal entries for a specific date  
- `POST /api/entries` → Create a new journal entry  
- `PUT /api/entries/:id` → Edit an existing entry  
- `DELETE /api/entries/:id` → Delete a journal entry  

---

## 7. Notes

- All API endpoints require authentication.  
- The app is responsive and works on desktop and mobile.  
- Docker ensures consistent environment for development and deployment.
