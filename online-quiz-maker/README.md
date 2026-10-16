# quizletto

A quiz maker built with React, Express, and MongoDB. Make a multiple-choice quiz, take quizzes one question at a time, and review your score and answers.

## Public demo

Open the [GitHub Pages demo](https://lakshaymohabhoi2006-cmyk.github.io/CODSOFT_TASKSNO/). It starts with sample quizzes and needs no setup. For the demo, accounts, quizzes, and results are saved in the current browser only. They are not shared with other visitors, and demo login is not real authentication.

Changes to this project on the repository's `main` branch automatically build and publish the demo through GitHub Actions.

## Run locally

You need Node.js and a MongoDB connection (a local MongoDB server or MongoDB Atlas).

1. From this folder, install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set `MONGO_URI` and a private `JWT_SECRET`.
3. Start the API in one terminal: `npm run server`
4. Start the React app in another terminal: `npm run dev`
5. Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

The server listens on port 5000 by default. Do not commit `.env`; the repository ignores environment files.

When `VITE_DEMO_MODE=true` is set during the frontend build, the site uses browser storage and does not need the API or database. Leave this variable unset for the database-backed API.

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
