# Coy – Discovery Tab

A full-stack, swipe-based profile discovery application inspired by dating platforms like Tinder and Bumble. Built as part of the Coy SDE Intern Assignment, the application introduces a Discover experience where users can explore profiles, like or pass on people, and connect through mutual matches.

The application focuses on a smooth discovery experience, reliable swipe persistence, mutual matching logic, and user privacy.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend API Documentation](#backend-api-documentation)
- [Database Design](#database-design)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Part A – Product Feature Suggestions](#part-a--product-feature-suggestions)

---

## Project Overview

Coy Discover is a standalone application featuring a swipe-based profile discovery system.

Users can browse profiles one at a time, swipe right to like someone or left to pass, and get matched when both users express mutual interest.

The application uses a single predefined demo user and seeded mock profiles, eliminating the need for external authentication.

The project consists of two independently running applications:

- **Web:** React-based frontend responsible for the discovery interface and user interactions.
- **API:** Express-based backend responsible for profile retrieval, swipe processing, matching logic, and persistent data storage.

MySQL is used as the database and runs inside Docker.

## Features

### 1. Profile Discovery

- Seeded database containing at least 30 mock user profiles.
- Each profile includes:
  - Name
  - Age
  - Profile photo
  - Short bio
  - City and college
  - Interests
- Profiles are displayed one at a time.
- Profiles already swiped on are automatically excluded from the discovery feed.
- Some profiles have pre-existing likes for the demo user to demonstrate mutual matching.

### 2. Swipe Experience

- **Swipe Right:** Like a profile.
- **Swipe Left:** Pass on a profile.
- Drag-based swipe gestures for mobile devices.
- Like and Pass buttons for desktop users.
- Smooth card animations and visual feedback.
- Previously swiped profiles never reappear.
- A dedicated empty state is displayed when no more profiles are available.

### 3. Mutual Matching

A match is created only when two users have liked each other.

- When a user likes someone, the backend checks whether that profile has already liked the current user.
- If both users have liked each other, a match is created.
- An "It's a Match!" screen is displayed when a mutual match occurs.
- A dedicated Matches view displays all mutual matches.

### 4. Privacy

Privacy is a core requirement of the application.

- Incoming likes are never revealed unless they become mutual.
- Passing on someone does not reveal whether they liked the current user.
- The discovery feed and Matches API expose only the information required by their respective functionalities.
- Non-mutual incoming likes are never displayed in the Matches view.

### 5. Data Persistence

- Swipe actions are stored in MySQL.
- Match records are persisted in the database.
- Previously swiped profiles remain excluded after refreshing the page.
- Existing matches remain available after page reloads.
- Backend data is maintained independently of frontend state.

---

## Tech Stack

| Technology              | Purpose                             |
| ----------------------- | ----------------------------------- |
| React.js                | Frontend application                |
| TypeScript              | Type safety in frontend development |
| Tailwind CSS            | Styling and responsive UI           |
| Node.js                 | Backend runtime                     |
| Express.js              | REST API development                |
| MySQL                   | Relational database                 |
| Docker & Docker Compose | Running the MySQL database          |
| npm                     | Package management                  |

---

## Project Structure

The project is divided into two main directories: `API` and `Web`.

```text
Coy_Assignment/
│
├── API/
│   ├── src/
│   │   ├── Controller/
│   │   │   └── Request handling and business logic
│   │   │
│   │   ├── Database/
│   │   │   └── Database connection and queries
│   │   │
│   │   ├── Middleware/
│   │   │   └── Request processing and validation
│   │   │
│   │   ├── Routes/
│   │   │   └── API route definitions
│   │   │
│   │   └── index.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── Web/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── Component/
│   │   ├── hooks/
│   │   ├── Pages/
│   │   ├── Service/
│   │   ├── Types/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

### Backend (API)

- **Controller:** Handles incoming requests and application business logic.
- **Database:** Manages the MySQL database connection and database operations.
- **Middleware:** A mock middleware for current user.
- **Routes:** Defines and maps API endpoints to their respective controllers.
- **index.js:** Backend application entry point.

### Frontend (Web)

- **Component:** Reusable UI components such as profile cards and match components.
- **hooks:** Custom React hooks for reusable application logic.
- **Pages:** Application pages, including Home, Discover, and Matches.
- **Service:** API service functions responsible for communicating with the backend.
- **Types:** TypeScript interfaces and type definitions.
- **App.tsx:** Main application component and navigation.
- **main.tsx:** Frontend entry point.

---

## Backend API Documentation

The backend exposes three primary REST API endpoints.

### 1. Get Discovery Feed

**GET `/feed`**

Returns profiles that the logged-in user has not previously swiped on.

**Functionality:**

- Retrieves available profiles.
- Excludes profiles that have already received a Like or Pass action.
- Returns the remaining profiles for discovery.

**Example Response:**

```json
{
    "user_id": "93014a12-e35e-11f1-bc24-2a30f3d0139a",
    "name": "Shreya Pillai",
    "photoUrl": "https://randomuser.me/api/portraits/women/30.jpg",
    "bio": "Food blogger and amateur photographer.",
    "city": "Kochi",
    "college": "Mahatma Gandhi University",
    "interests": [
        "Food",
        "Photography",
        "Travel"
    ]
},
```

### 2. Record a Swipe

**POST `/swipe`**

Records the user's Like or Pass action on a profile and determines whether a mutual match has occurred.

**Request Body:**

```json
{
  "swipedId": "3a5df0b2-e344-11f1-a957-4a7be110ae05",
  "action": "LIKE"
}
```

Supported actions:

- `LIKE`
- `PASS`

**Functionality:**

- Validates the target profile and swipe action.
- Prevents duplicate swipe actions.
- Persists the swipe in the database.
- Checks for an existing reciprocal like when the action is `LIKE`.
- Creates a match if both users have liked each other.
- Returns the matching status to the frontend.

### 3. Get Matches

**GET `/matches`**

Returns all mutual matches belonging to the logged-in user.

**Functionality:**

- Retrieves confirmed mutual matches.
- Returns the corresponding profile information.
- Excludes all non-mutual incoming likes.

**Example Response:**

```json
{
  "success": true,
  "count": 1,
  "matches": [
    {
      "match_id": "7fa4cfcd-e35f-11f1-bc24-2a30f3d0139a",
      "user_id": "93014927-e35e-11f1-bc24-2a30f3d0139a",
      "name": "Yash Thakur",
      "photoUrl": "https://randomuser.me/api/portraits/men/29.jpg"
    }
  ]
}
```

---

## Database Design

The application uses MySQL as its relational database.

The database runs inside a Docker container using Docker Compose, allowing the backend to connect to a consistent database environment without requiring a local MySQL installation.

The database stores:

- **User Profiles:** Mock user information, including names, ages, photos, bios, locations, and interests.
- **Swipes:** Records of Like and Pass actions performed by users.
- **Matches:** Records of confirmed mutual matches.

Swipe records are used to determine which profiles should be excluded from the feed, while match records ensure that confirmed matches persist across sessions and page reloads.

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js and npm
- Docker Desktop
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/VinayPratap07/CoyDiscoveryTab

cd Coy_Assignment
```

### 2. Install Backend Dependencies

```bash
cd API

npm install
```

### 3. Install Frontend Dependencies

Open another terminal:

```bash
cd Web

npm install
```

### 4. Configure Environment Variables

Create or configure the `.env` files in both `API` and `Web` directories.

**API/.env**

Configure the MySQL connection details and backend port according to the application's database configuration.

**Web/.env**

Configure the backend API base URL according to the frontend API service configuration.

Refer to the environment variables used in the source code when configuring these files.

### 5. Start MySQL Using Docker

From the project root directory:

```bash
docker compose up -d
```

This starts the MySQL database container in the background.

Make sure the database is healthy and accessible before starting the backend.

---

## Running the Application

The frontend and backend run independently.

### Start the Backend

Open a terminal:

```bash
cd API

npm run dev
```

### Start the Frontend

Open another terminal:

```bash
cd Web

npm run dev
```

Once both development servers are running, open the local URL provided by Vite in your browser.

The frontend will communicate with the Express backend, which handles API requests and interacts with the MySQL database.

### Stopping the Database

When you finish working on the project:

```bash
docker compose down
```

This stops and removes the database container. The database volume is retained if configured as a persistent Docker volume.

---

## Part A – Product Feature Suggestions

This section contains two proposed core features based on exploring the existing Coy application.

### Feature 1: Anonymous Chat

**Description:**

Introduce an anonymous chat feature that allows users to communicate with someone they are interested in without revealing their identity. Once a user sends a crush, they can initiate an anonymous conversation with that person, allowing both individuals to interact without knowing who is on the other side.

The conversation would remain anonymous unless the sender chooses to reveal their identity or both users agree to reveal it.

**Why is this feature required?**

One of the biggest barriers to expressing romantic interest is the fear of rejection or awkwardness. Users might hesitate to interact with someone they like because they are worried about revealing their identity.

Anonymous chat would help eliminate this hesitation by providing a comfortable, low-pressure environment where users can get to know each other before deciding whether to reveal themselves.

It would also make Coy more interactive and engaging by encouraging conversations rather than limiting the experience to simply sending and receiving crushes.

### Feature 2: Anonymous Sender Profile

**Description:**

Allow users sending a crush to create a basic anonymous profile that the recipient can view. Instead of receiving only a notification that someone has a crush on them, the recipient would also get access to a small profile containing information provided by the sender.

The anonymous profile could include:

- Anonymous Hint: A clue about who the sender might be, such as "We attend the same college" or "We have met at a college event."
- Personal Message: A short message expressing something they want the recipient to know.
- Question: A question to spark curiosity or encourage the recipient to respond.
- Short Bio: A brief introduction describing their personality, interests, or hobbies without revealing their identity.

The sender's actual identity would remain hidden, allowing the recipient to learn a little about their admirer without knowing exactly who they are.

**Why is this feature required?**

Currently, simply knowing that someone has a crush on you might not provide enough information to make the experience engaging or encourage further interaction.

An anonymous profile would add a personal touch to the experience and create curiosity about the person behind the crush. Instead of receiving just an anonymous notification, recipients would have clues, messages, or questions that could help them connect with their admirer.

This would make sending and receiving crushes more interactive, give senders a way to express their personality, and encourage recipients to engage with the platform to discover who their admirer might be.

---

## Assignment Details

**Assignment:** Coy SDE Intern Assignment

**Part A:** Product exploration and two core feature suggestions.

**Part B:** Development of a standalone swipe-based Discover application.

**Repository:** https://github.com/VinayPratap07/CoyDiscoveryTab

---

Built as part of the Coy SDE Intern Assignment.
