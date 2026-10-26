# CodSoft Web Development Internship

**Level 2 · Tasks 1 and 2**

This repository holds two web development projects built for the CodSoft internship: a job board and an online quiz maker. Each has its own setup instructions below.

## Task 1: Job Board

The job board is the Next.js app at the repository root. It has a landing page, searchable job listings, job details, an application form, login and registration screens, and candidate and employer dashboards.

**Public demo:** [Open the job board](https://codsoft-tasksno-theta.vercel.app/)

**Current scope:** This is a frontend prototype with sample job and application data. Login, registration, and submitting an application are demonstrations; they do not save data to a backend.

### Run it

You'll need Node.js and npm.

```
npm install
npm run dev
```

Open <http://localhost:3000>.

## Task 2: Online Quiz Maker

The quiz maker is a React and Express app in [`online-quiz-maker`](online-quiz-maker/README.md). You can create an account, build a multiple-choice quiz, take quizzes one question at a time, and review your score and answers. MongoDB stores accounts, quizzes, and results, and the API checks answers after submission.

**Public demo:** [Open quizletto](https://lakshaymohabhoi2006-cmyk.github.io/CODSOFT_TASKSNO/). The demo is static. Sample quizzes work right away, while accounts, created quizzes, and scores are saved only in the visitor's browser. It does not use shared accounts or the database API.

### Run it

You'll need Node.js, npm, and a MongoDB connection, either local or on MongoDB Atlas.

In a terminal, from `online-quiz-maker`:

```
npm install
```

Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`. Keep `.env` private; Git ignores it.

Start the API:

```
npm run server
```

In a second terminal, also from `online-quiz-maker`, start the React app:

```
npm run dev
```

The app runs at <http://localhost:5173> and the API listens on port `5000`.

### Deployment options

The public demo deploys to GitHub Pages whenever changes to `online-quiz-maker` are pushed to `main`. Its URL is [lakshaymohabhoi2006-cmyk.github.io/CODSOFT_TASKSNO](https://lakshaymohabhoi2006-cmyk.github.io/CODSOFT_TASKSNO/).

To deploy the full database-backed version instead, the repo includes [`netlify.toml`](netlify.toml) for the frontend and [`render.yaml`](render.yaml) for the Express API. This setup needs a MongoDB Atlas database and private `MONGO_URI` and `JWT_SECRET` values in the hosting provider.

1. Create a MongoDB Atlas cluster and a database user. Copy the connection string and allow connections from your API host.
2. In Render, create a Blueprint from this repository and select `render.yaml`. Set the secret `MONGO_URI` to the Atlas connection string and `JWT_SECRET` to a long random value.
3. Import this repository into Netlify. Netlify reads `netlify.toml`; set the build environment variable `VITE_API_URL` to `https://<your-render-service>.onrender.com/api`.
4. Set Render's `CLIENT_URL` to your Netlify site's origin, such as `https://<your-site>.netlify.app`, then redeploy the API.

Keep database credentials and signing secrets in the hosting providers' environment settings, never in committed files. A public site needs both the Netlify frontend and the Render API connected to MongoDB.

## Project layout

```
src/                  Job Board (Task 1)
online-quiz-maker/    Online Quiz Maker (Task 2)
```
