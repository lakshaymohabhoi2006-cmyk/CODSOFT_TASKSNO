# Quizletto

A quiz maker built with React, Express, and MongoDB. Make a multiple-choice quiz, take quizzes one question at a time, and review your score and answers.

## Run locally

You need Node.js and a MongoDB connection (a local MongoDB server or MongoDB Atlas).

1. From this folder, install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set `MONGO_URI` and a private `JWT_SECRET`.
3. Start the API in one terminal: `npm run server`
4. Start the React app in another terminal: `npm run dev`
5. Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

The API listens on `http://localhost:5000` by default. The frontend uses `http://localhost:5000/api` when `VITE_API_URL` is not set. Do not commit `.env`; the repository ignores environment files.

When `VITE_DEMO_MODE=true` is set during the frontend build, the site uses browser storage and does not need the API or database. Leave this variable unset for the database-backed API.

## Deploy the frontend to Vercel

Create a new Vercel project from this repository and set its root directory to `online-quiz-maker`. Vercel will use `vercel.json` to build the Vite client and serve its routes correctly.

For a no-database demo, add this environment variable in Vercel:

```text
VITE_DEMO_MODE=true
```

For the full API-backed version, leave demo mode unset and add:

```text
VITE_API_URL=https://your-api-domain.example/api
```

The Express API still needs to run on a Node host such as Render with `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL` configured. `localhost` is for local development only; Vercel will provide the public frontend domain after deployment.

## API

All quiz and result routes require a bearer token from the login or register endpoint.

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Read the signed-in profile |
| GET | `/api/quizzes` | Browse quizzes |
| GET | `/api/quizzes/mine` | List quizzes you created |
| GET | `/api/quizzes/:id` | Get questions without correct answers |
| POST | `/api/quizzes` | Create a quiz |
| PUT | `/api/quizzes/:id` | Edit a quiz you created |
| DELETE | `/api/quizzes/:id` | Delete your quiz |
| POST | `/api/quizzes/:id/submit` | Submit answers and get a score |
| GET | `/api/results/mine` | List your attempts |
| GET | `/api/results/:id` | Review an attempt you own |

Correct answers are excluded from the quiz-taking response. The server checks submitted answers, saves the result, and only then returns the answer review to that signed-in user.
