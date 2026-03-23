# 🗄️ MySQL Masterclass — Interactive Tutorial Platform

A student-focused, self-hosted database tutorial platform. Learn MySQL by writing real SQL queries in the browser, then apply what you've learned with PHP, Node.js, and Python code examples.

> **Phase 1** (this repo): MySQL fundamentals + PHP, Node.js, Python integration  
> **Phase 2** (coming soon): Firebase, Supabase, and modern cloud databases

## 🚀 Live Demo

Deploy to GitHub Pages — just push and enable Pages from the `main` branch.

## 📚 What's Covered

### Chapter 1 — MySQL Basics
| Lesson | Topics |
|--------|--------|
| What is MySQL? | Databases, tables, rows, columns |
| SELECT | Querying, WHERE, comparison operators, LIKE, BETWEEN, IN |
| ORDER BY & LIMIT | Sorting, pagination, OFFSET |
| Aggregate Functions | COUNT, SUM, AVG, MAX, MIN, GROUP BY, HAVING |

### Chapter 2 — Working with Tables
| Lesson | Topics |
|--------|--------|
| CREATE TABLE | Data types (INT, VARCHAR, TEXT, DECIMAL, DATE, BOOL), constraints |
| INSERT | Single row, multiple rows, data type rules |
| UPDATE & DELETE | Modifying and removing rows safely |
| JOINs | INNER JOIN, LEFT JOIN, table aliases, multi-table queries |

### Chapter 3 — MySQL with PHP
| Lesson | Topics |
|--------|--------|
| PHP + MySQL | PDO connection, credentials, error handling |
| PHP CRUD | Prepared statements, INSERT/SELECT/UPDATE/DELETE functions |

### Chapter 4 — MySQL with Node.js
| Lesson | Topics |
|--------|--------|
| Node.js + mysql2 | Connection pools, async/await, prepared statements |
| REST API with Express | Full CRUD REST endpoints, query params, transactions |

### Chapter 5 — MySQL with Python
| Lesson | Topics |
|--------|--------|
| Python + mysql-connector | Dictionary cursors, prepared statements, executemany |

## ✨ Features

- **Live SQL Editor** — Run real queries in-browser, powered by [sql.js](https://sql-wasm.js.org/) (SQLite engine)
- **Pre-seeded database** — `students`, `courses`, and `enrollments` tables ready to query
- **Quick Tasks** — One-click example queries for each lesson
- **Code Lessons** — PHP, Node.js, Python code with detailed line-by-line explanations
- **Progress tracking** — Saved in `localStorage`; sidebar shows completed lessons
- **Reset database** — Restore to default state at any time
- **Dark theme** — Easy on the eyes for long study sessions
- **Responsive** — Works on tablets and mobile too

## 🏗️ Project Structure

```
mysql-tutorial/
├── index.html          # App shell, CDN imports
├── css/
│   └── style.css       # Full dark theme stylesheet
├── js/
│   ├── sql-engine.js   # sql.js wrapper + default database seed
│   ├── lessons.js      # All lesson content (theory, queries, code)
│   └── app.js          # UI controller, rendering, state management
└── README.md
```

## 🔧 Running Locally

No build step needed! Just serve the files with any static server:

```bash
# Python (built-in)
python -m http.server 8080

# Node.js
npx serve .

# Or simply open index.html in your browser
# (some browsers block WASM from file:// — use a local server)
```

## 📦 Deploying to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set Source to `Deploy from branch` → `main` → `/ (root)`
4. Your site is live at `https://yourusername.github.io/mysql-tutorial/`

## 🛠️ Adding New Lessons

Add an object to the `LESSONS` array in `js/lessons.js`:

```javascript
{
  id: 'unique-id',          // used for progress tracking
  chapter: 2,               // chapter number
  chapterTitle: 'Chapter name',
  title: 'Lesson Title',
  icon: '📌',
  theory: `<h2>...</h2>`,   // HTML content for the left panel

  // For SQL lessons:
  defaultQuery: 'SELECT ...',
  hint: 'Try: ...',
  tasks: [
    { label: 'Quick task label', query: 'SELECT ...' }
  ],

  // For code lessons:
  isCodeLesson: true,
  language: 'php',          // 'php' | 'javascript' | 'python'
  codeExample: `<?php ...`, // the code to display
  explainPoints: [
    { line: 'keyword', text: 'What it does' }
  ]
}
```

## 🗺️ Phase 2 Roadmap

- [ ] Firebase Firestore — NoSQL document model, real-time updates
- [ ] Supabase — PostgreSQL with REST API, auth, storage
- [ ] MongoDB — Document database, aggregation pipeline
- [ ] Redis — Key-value store, caching strategies
- [ ] Side-by-side comparisons: SQL vs NoSQL

## 🤝 Contributing

Pull requests welcome! To add a lesson, improve existing content, or fix a bug:

1. Fork the repo
2. Create a branch: `git checkout -b feature/new-lesson`
3. Commit your changes
4. Open a PR with a description of what you've added

## 📄 Licence

MIT — free to use, modify, and distribute for education.
