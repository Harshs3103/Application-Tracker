# Job Application Tracker

A full stack web app to track job applications in one place. Users can sign up, log in, add the jobs they applied to, and update each job's status (Applied, Interview, Rejected, Offer).

**Live demo:** https://application-tracker-eq2t.vercel.app

> The backend runs on a free Render plan, so the first request after a period of inactivity can take around 50 seconds.

## Features

- Signup and login with JWT authentication
- Passwords are hashed with bcrypt
- Add, view, edit and delete job applications
- Change the status of a job (Applied, Interview, Rejected, Offer)
- Filter jobs by status
- Each user can only see and change their own jobs
- Protected routes on the frontend and backend
- Responsive design

## Tech Stack

| Part | Technology |
|---|---|
| Frontend | React.js, React Router, Axios, Tailwind CSS, DaisyUI |
| Backend | Node.js, Express.js |
| Database | PostgreSQL (Neon) with Prisma ORM |
| Auth and validation | JWT, bcrypt, Zod |
| Deployment | Vercel (frontend), Render (backend), Neon (database) |

## API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/signup` | Create a new user | No |
| POST | `/api/auth/login` | Log in and get a JWT token | No |
| GET | `/api/jobs` | Get all jobs of the logged-in user | Yes |
| POST | `/api/jobs` | Add a new job | Yes |
| PUT | `/api/jobs/:id` | Update a job | Yes |
| DELETE | `/api/jobs/:id` | Delete a job | Yes |

Protected routes need the header `Authorization: Bearer <token>`.

## Database Design

Two tables with a one-to-many relation: one user has many jobs.

- **User:** `id` (primary key), `email` (unique), `password` (hashed)
- **Job:** `id` (primary key), `company`, `role`, `link`, `status`, `appliedDate`, `userId` (foreign key to User)

## How Security Works

- Passwords are never stored as plain text. They are hashed with bcrypt.
- After login, the server sends a JWT. The client sends it with every request.
- An auth middleware checks the token on every job route.
- Every job query uses the `userId` from the token, so a user cannot read, update or delete another user's jobs.
- All input is validated on the server with Zod.

## Run Locally

**Requirements:** Node.js and a PostgreSQL database (a free Neon database works).

```bash
git clone https://github.com/Harshs3103/Application-Tracker.git
cd Application-Tracker
```

**Backend**

```bash
cd server
npm install
```

Create `server/.env`:

```
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=a_long_random_text
CLIENT_URL=http://localhost:5173
```

Then run:

```bash
npx prisma migrate dev
npm run dev
```

The server runs on `http://localhost:5000`.

**Frontend**

```bash
cd client
npm install
```

Create `client/.env`:

```
VITE_API_URL=http://localhost:5000/api
```

Then run:

```bash
npm run dev
```

The app runs on `http://localhost:5173`.

## Project Structure

```
server/
  index.js
  prisma.js
  validators.js
  prisma/schema.prisma
  routes/
  controllers/
  middleware/
client/
  src/
    api.js
    pages/
    components/
```

## What I Learned

- Designing a relational database with a foreign key and using it with Prisma
- Building JWT authentication and protecting routes with middleware
- Making sure users can only access their own data
- Deploying a full stack app across Vercel, Render and Neon, and fixing CORS and environment variable problems

## Future Improvements

- Dashboard with job counts per status
- Edit all fields of a job
- Search and sort
- Reminders for follow-ups

## Author

Harsh Kumar
[GitHub](https://github.com/Harshs3103) | [LinkedIn](https://www.linkedin.com/in/harsh-kumar)
