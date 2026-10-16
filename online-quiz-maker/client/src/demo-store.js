const STORAGE = {
  user: 'quiz-user',
  quizzes: 'quiz-demo-quizzes',
  results: 'quiz-demo-results',
};

const starterQuizzes = [
  {
    id: 'starter-space',
    title: 'A tiny trip through space',
    description: 'Planets, stars, and a few things worth looking up at night.',
    createdBy: 'Quizletto',
    createdById: 'quizletto',
    questions: [
      { text: 'Which planet is known for its striking rings?', options: ['Mars', 'Saturn', 'Venus', 'Mercury'], correctIndex: 1 },
      { text: 'What is the name of the galaxy Earth belongs to?', options: ['Andromeda', 'Whirlpool', 'Milky Way', 'Sombrero'], correctIndex: 2 },
      { text: 'Which star is closest to Earth?', options: ['Sirius', 'Polaris', 'The Sun', 'Vega'], correctIndex: 2 },
    ],
    createdAt: '2026-10-01T09:00:00.000Z',
  },
  {
    id: 'starter-food',
    title: 'Good food, quick questions',
    description: 'A few tasty facts from kitchens around the world.',
    createdBy: 'Quizletto',
    createdById: 'quizletto',
    questions: [
      { text: 'Sushi is most closely associated with which country?', options: ['Thailand', 'Japan', 'India', 'Greece'], correctIndex: 1 },
      { text: 'Which spice gives many curries their bright yellow colour?', options: ['Cinnamon', 'Paprika', 'Turmeric', 'Cardamom'], correctIndex: 2 },
      { text: 'Guacamole is made mainly from which fruit?', options: ['Mango', 'Avocado', 'Papaya', 'Lime'], correctIndex: 1 },
    ],
    createdAt: '2026-10-02T09:00:00.000Z',
  },
  {
    id: 'starter-web',
    title: 'The web basics',
    description: 'HTML, CSS, and the building blocks behind a website.',
    createdBy: 'Quizletto',
    createdById: 'quizletto',
    questions: [
      { text: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High Transfer Machine Link', 'Home Tool Markup Language', 'Hyperlink Text Making Language'], correctIndex: 0 },
      { text: 'Which language is primarily used to style web pages?', options: ['SQL', 'CSS', 'Python', 'Bash'], correctIndex: 1 },
      { text: 'What does CSS stand for?', options: ['Creative Styling System', 'Computer Style Sheets', 'Cascading Style Sheets', 'Colourful Site Syntax'], correctIndex: 2 },
    ],
    createdAt: '2026-10-03T09:00:00.000Z',
  },
];

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    if (!value) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    const parsed = JSON.parse(value);
    return Array.isArray(fallback) ? (Array.isArray(parsed) ? parsed : fallback) : parsed;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    throw new Error('This browser could not save your demo data. Check your storage settings.');
  }
}

function currentUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE.user) || 'null');
  } catch {
    return null;
  }
}

function makeId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function fail(status, message) {
  const error = new Error(message);
  error.response = { status, data: { message } };
  throw error;
}

function requireUser() {
  const user = currentUser();
  if (!user) fail(401, 'Please log in to continue.');
  return user;
}

function quizSummary(quiz) {
  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    questionCount: quiz.questions.length,
    createdBy: quiz.createdBy,
    createdAt: quiz.createdAt,
  };
}

function quizDetail(quiz) {
  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    createdBy: quiz.createdBy,
    questions: quiz.questions.map(({ text, options }) => ({ text, options })),
  };
}

function respond(data, status = 200) {
  return { data, status };
}

export async function demoRequest(method, path, body = {}) {
  const route = path.split('?')[0];

  if (method === 'POST' && route === '/auth/register') {
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    if (!name || !email || !body.password || body.password.length < 8) {
      fail(400, 'Add your name, a valid email, and a password of at least 8 characters.');
    }
    const user = { id: makeId(), name, email };
    write(STORAGE.user, user);
    return respond({ token: 'browser-demo-session', user }, 201);
  }

  if (method === 'POST' && route === '/auth/login') {
    const email = body.email?.trim().toLowerCase();
    if (!email || !body.password) fail(401, 'Enter an email and password to continue.');
    let user;
    try {
      user = JSON.parse(localStorage.getItem(STORAGE.user) || 'null');
    } catch {
      user = null;
    }
    if (!user || user.email !== email) {
      user = { id: makeId(), name: email.split('@')[0], email };
      write(STORAGE.user, user);
    }
    return respond({ token: 'browser-demo-session', user });
  }

  if (method === 'GET' && route === '/auth/me') {
    const user = requireUser();
    return respond({ user });
  }

  const quizzes = read(STORAGE.quizzes, starterQuizzes);

  if (method === 'GET' && route === '/quizzes') {
    return respond({ quizzes: quizzes.map(quizSummary) });
  }

  if (method === 'GET' && route === '/quizzes/mine') {
    const user = requireUser();
    return respond({
      quizzes: quizzes
        .filter((quiz) => quiz.createdById === user.id)
        .map((quiz) => ({ ...quiz, _id: quiz.id })),
    });
  }

  const submitMatch = route.match(/^\/quizzes\/([^/]+)\/submit$/);
  if (method === 'POST' && submitMatch) {
    const user = requireUser();
    const quiz = quizzes.find((item) => item.id === submitMatch[1]);
    if (!quiz) fail(404, 'Quiz not found.');
    const answers = body.answers;
    if (
      !Array.isArray(answers) ||
      answers.length !== quiz.questions.length ||
      answers.some((answer, index) => !Number.isInteger(answer) || answer < 0 || answer >= quiz.questions[index].options.length)
    ) {
      fail(400, 'Submit one valid answer for every question.');
    }
    const score = answers.reduce((sum, answer, index) => sum + Number(answer === quiz.questions[index].correctIndex), 0);
    const result = {
      id: makeId(),
      userId: user.id,
      quizId: quiz.id,
      quizTitle: quiz.title,
      answers,
      score,
      total: quiz.questions.length,
      questions: quiz.questions,
      createdAt: new Date().toISOString(),
    };
    write(STORAGE.results, [result, ...read(STORAGE.results, [])]);
    return respond({ resultId: result.id, score, total: result.total }, 201);
  }

  const quizMatch = route.match(/^\/quizzes\/([^/]+)$/);
  if (method === 'GET' && quizMatch) {
    const quiz = quizzes.find((item) => item.id === quizMatch[1]);
    if (!quiz) fail(404, 'Quiz not found.');
    return respond({ quiz: quizDetail(quiz) });
  }

  if (method === 'POST' && route === '/quizzes') {
    const user = requireUser();
    if (!body.title?.trim() || !Array.isArray(body.questions) || body.questions.length === 0) {
      fail(400, 'Add a title and at least one question.');
    }
    const quiz = {
      id: makeId(),
      title: body.title.trim(),
      description: body.description?.trim() || '',
      createdBy: user.name,
      createdById: user.id,
      questions: body.questions.map((question) => ({
        text: question.text.trim(),
        options: question.options.map((option) => option.trim()),
        correctIndex: question.correctIndex,
      })),
      createdAt: new Date().toISOString(),
    };
    write(STORAGE.quizzes, [quiz, ...quizzes]);
    return respond({ quiz: { id: quiz.id, title: quiz.title } }, 201);
  }

  const quizIdMatch = route.match(/^\/quizzes\/([^/]+)$/);
  if (method === 'PUT' && quizIdMatch) {
    const user = requireUser();
    const index = quizzes.findIndex((item) => item.id === quizIdMatch[1]);
    if (index < 0) fail(404, 'Quiz not found.');
    if (quizzes[index].createdById !== user.id) fail(403, 'Only the quiz creator can edit this quiz.');
    const quiz = {
      ...quizzes[index],
      title: body.title.trim(),
      description: body.description?.trim() || '',
      questions: body.questions,
    };
    quizzes[index] = quiz;
    write(STORAGE.quizzes, quizzes);
    return respond({ quiz: { id: quiz.id, title: quiz.title } });
  }

  if (method === 'DELETE' && quizIdMatch) {
    const user = requireUser();
    const quiz = quizzes.find((item) => item.id === quizIdMatch[1]);
    if (!quiz) fail(404, 'Quiz not found.');
    if (quiz.createdById !== user.id) fail(403, 'Only the quiz creator can delete this quiz.');
    write(STORAGE.quizzes, quizzes.filter((item) => item.id !== quiz.id));
    write(STORAGE.results, read(STORAGE.results, []).filter((item) => item.quizId !== quiz.id));
    return respond({ message: 'Quiz deleted.' });
  }

  if (method === 'GET' && route === '/results/mine') {
    const user = requireUser();
    return respond({
      results: read(STORAGE.results, [])
        .filter((result) => result.userId === user.id)
        .map(({ id, quizTitle, score, total, createdAt }) => ({ id, quizTitle, score, total, createdAt })),
    });
  }

  const resultMatch = route.match(/^\/results\/([^/]+)$/);
  if (method === 'GET' && resultMatch) {
    const user = requireUser();
    const result = read(STORAGE.results, []).find((item) => item.id === resultMatch[1] && item.userId === user.id);
    if (!result) fail(404, 'Result not found.');
    return respond({
      result: {
        id: result.id,
        quizTitle: result.quizTitle,
        score: result.score,
        total: result.total,
        questions: result.questions.map((question, index) => ({
          text: question.text,
          options: question.options,
          selectedIndex: result.answers[index],
          correctIndex: question.correctIndex,
        })),
      },
    });
  }

  fail(404, 'This demo route was not found.');
}
