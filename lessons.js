const LESSONS = [
  // ─── CHAPTER 1: MYSQL BASICS ───────────────────────────────────────────────
  {
    id: 'intro',
    chapter: 1,
    chapterTitle: 'MySQL Basics',
    title: 'What is MySQL?',
    icon: '🗄️',
    theory: `
      <h2>What is MySQL?</h2>
      <p>MySQL is the world's most popular open-source <strong>relational database management system (RDBMS)</strong>. 
      It stores data in <em>tables</em> — just like spreadsheets — with rows (records) and columns (fields).</p>
      
      <div class="info-box">
        <strong>Why MySQL?</strong>
        <ul>
          <li>Powers millions of websites including Facebook, Twitter, YouTube</li>
          <li>Free & open-source with commercial options</li>
          <li>Works with PHP, Node.js, Python, Java, and more</li>
          <li>ACID compliant — your data is safe</li>
        </ul>
      </div>

      <h3>How data is organised</h3>
      <p>Think of MySQL like this:</p>
      <div class="concept-grid">
        <div class="concept-card">
          <span class="concept-icon">🏢</span>
          <strong>Database</strong>
          <span>A container for related tables (e.g. <code>school_db</code>)</span>
        </div>
        <div class="concept-card">
          <span class="concept-icon">📋</span>
          <strong>Table</strong>
          <span>Rows &amp; columns of data (e.g. <code>students</code>)</span>
        </div>
        <div class="concept-card">
          <span class="concept-icon">📝</span>
          <strong>Row</strong>
          <span>A single record (one student)</span>
        </div>
        <div class="concept-card">
          <span class="concept-icon">🏷️</span>
          <strong>Column</strong>
          <span>A field / attribute (e.g. <code>name</code>, <code>age</code>)</span>
        </div>
      </div>

      <p>Try the query on the right — it shows all students in our practice database!</p>
    `,
    defaultQuery: 'SELECT * FROM students;',
    hint: 'Run SELECT * FROM students; to see your first query in action!',
    tasks: [
      { label: 'View all students', query: 'SELECT * FROM students;' },
      { label: 'View all courses', query: 'SELECT * FROM courses;' }
    ]
  },

  {
    id: 'select',
    chapter: 1,
    chapterTitle: 'MySQL Basics',
    title: 'SELECT — Reading Data',
    icon: '🔍',
    theory: `
      <h2>The SELECT Statement</h2>
      <p>SELECT is the most used SQL command. It retrieves data from one or more tables.</p>

      <div class="syntax-box">
        <div class="syntax-label">Syntax</div>
        <pre>SELECT column1, column2 FROM table_name;
SELECT * FROM table_name;  -- * means ALL columns</pre>
      </div>

      <h3>Filtering with WHERE</h3>
      <p>Add a <code>WHERE</code> clause to filter rows:</p>
      <div class="syntax-box">
        <div class="syntax-label">Example</div>
        <pre>SELECT name, grade FROM students WHERE grade = 'A';
SELECT name, age  FROM students WHERE age > 21;</pre>
      </div>

      <h3>Comparison operators</h3>
      <table class="lesson-table">
        <tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
        <tr><td><code>=</code></td><td>Equal</td><td><code>grade = 'A'</code></td></tr>
        <tr><td><code>!= / &lt;&gt;</code></td><td>Not equal</td><td><code>grade != 'C'</code></td></tr>
        <tr><td><code>&gt; / &lt;</code></td><td>Greater/Less than</td><td><code>age &gt; 21</code></td></tr>
        <tr><td><code>LIKE</code></td><td>Pattern match</td><td><code>name LIKE 'A%'</code></td></tr>
        <tr><td><code>BETWEEN</code></td><td>Range</td><td><code>age BETWEEN 20 AND 22</code></td></tr>
        <tr><td><code>IN</code></td><td>List match</td><td><code>grade IN ('A','B')</code></td></tr>
      </table>
    `,
    defaultQuery: "SELECT name, age, grade FROM students WHERE grade = 'A';",
    hint: "Try: SELECT name, grade FROM students WHERE age > 21;",
    tasks: [
      { label: 'All A-grade students', query: "SELECT * FROM students WHERE grade = 'A';" },
      { label: 'Students aged 21', query: "SELECT name, email FROM students WHERE age = 21;" },
      { label: 'Names starting with A', query: "SELECT * FROM students WHERE name LIKE 'A%';" }
    ]
  },

  {
    id: 'sorting',
    chapter: 1,
    chapterTitle: 'MySQL Basics',
    title: 'ORDER BY & LIMIT',
    icon: '↕️',
    theory: `
      <h2>Sorting & Limiting Results</h2>
      
      <h3>ORDER BY</h3>
      <p>Sort results by one or more columns. Default is ascending (ASC).</p>
      <div class="syntax-box">
        <div class="syntax-label">Syntax</div>
        <pre>SELECT * FROM students ORDER BY age ASC;
SELECT * FROM students ORDER BY name DESC;
SELECT * FROM students ORDER BY grade ASC, age DESC;</pre>
      </div>

      <h3>LIMIT</h3>
      <p>Restrict the number of rows returned. Great for pagination!</p>
      <div class="syntax-box">
        <div class="syntax-label">Syntax</div>
        <pre>SELECT * FROM students LIMIT 3;
SELECT * FROM students LIMIT 3 OFFSET 2;  -- skip 2, take 3</pre>
      </div>

      <div class="info-box">
        <strong>💡 Pro Tip:</strong> Combine ORDER BY and LIMIT to get the "top N" records:
        <pre>SELECT name, age FROM students ORDER BY age DESC LIMIT 3;</pre>
        This gives you the 3 oldest students.
      </div>
    `,
    defaultQuery: 'SELECT * FROM students ORDER BY age DESC LIMIT 3;',
    hint: 'Try: SELECT name, grade FROM students ORDER BY grade ASC, name ASC;',
    tasks: [
      { label: 'Youngest first', query: 'SELECT name, age FROM students ORDER BY age ASC;' },
      { label: 'Top 2 by name', query: 'SELECT * FROM students ORDER BY name ASC LIMIT 2;' },
      { label: 'Skip first, show 3', query: 'SELECT * FROM students LIMIT 3 OFFSET 1;' }
    ]
  },

  {
    id: 'aggregate',
    chapter: 1,
    chapterTitle: 'MySQL Basics',
    title: 'Aggregate Functions',
    icon: '🔢',
    theory: `
      <h2>Aggregate Functions</h2>
      <p>Aggregate functions perform calculations on a set of rows and return a single value.</p>

      <table class="lesson-table">
        <tr><th>Function</th><th>Returns</th><th>Example</th></tr>
        <tr><td><code>COUNT()</code></td><td>Number of rows</td><td><code>COUNT(*)</code></td></tr>
        <tr><td><code>SUM()</code></td><td>Total</td><td><code>SUM(credits)</code></td></tr>
        <tr><td><code>AVG()</code></td><td>Average</td><td><code>AVG(age)</code></td></tr>
        <tr><td><code>MAX()</code></td><td>Highest value</td><td><code>MAX(age)</code></td></tr>
        <tr><td><code>MIN()</code></td><td>Lowest value</td><td><code>MIN(age)</code></td></tr>
      </table>

      <h3>GROUP BY</h3>
      <p>Group rows sharing a value before applying an aggregate function:</p>
      <div class="syntax-box">
        <div class="syntax-label">Example</div>
        <pre>SELECT grade, COUNT(*) AS total_students
FROM students
GROUP BY grade
ORDER BY grade;</pre>
      </div>

      <h3>HAVING — filter groups</h3>
      <p>Like WHERE but for groups. Use after GROUP BY:</p>
      <div class="syntax-box">
        <div class="syntax-label">Example</div>
        <pre>SELECT grade, COUNT(*) AS total
FROM students
GROUP BY grade
HAVING COUNT(*) > 1;</pre>
      </div>
    `,
    defaultQuery: "SELECT grade, COUNT(*) AS total_students FROM students GROUP BY grade ORDER BY grade;",
    hint: 'Try: SELECT AVG(age) AS average_age, MAX(age) AS oldest FROM students;',
    tasks: [
      { label: 'Count students per grade', query: 'SELECT grade, COUNT(*) as total FROM students GROUP BY grade;' },
      { label: 'Average & max age', query: 'SELECT AVG(age) AS avg_age, MAX(age) AS max_age FROM students;' },
      { label: 'Total course credits', query: 'SELECT SUM(credits) AS total_credits FROM courses;' }
    ]
  },

  // ─── CHAPTER 2: WORKING WITH TABLES ────────────────────────────────────────
  {
    id: 'create-table',
    chapter: 2,
    chapterTitle: 'Working with Tables',
    title: 'CREATE TABLE',
    icon: '🏗️',
    theory: `
      <h2>Creating Tables</h2>
      <p>A table must be defined before you can store data. You specify each column's name and data type.</p>

      <div class="syntax-box">
        <div class="syntax-label">Syntax</div>
        <pre>CREATE TABLE table_name (
    column1 datatype constraints,
    column2 datatype constraints,
    ...
);</pre>
      </div>

      <h3>Common Data Types</h3>
      <table class="lesson-table">
        <tr><th>Type</th><th>Use for</th><th>Example</th></tr>
        <tr><td><code>INT</code></td><td>Whole numbers</td><td><code>age INT</code></td></tr>
        <tr><td><code>VARCHAR(n)</code></td><td>Short text</td><td><code>name VARCHAR(100)</code></td></tr>
        <tr><td><code>TEXT</code></td><td>Long text</td><td><code>bio TEXT</code></td></tr>
        <tr><td><code>DECIMAL(p,s)</code></td><td>Exact decimals</td><td><code>price DECIMAL(10,2)</code></td></tr>
        <tr><td><code>DATE</code></td><td>Date only</td><td><code>2024-01-15</code></td></tr>
        <tr><td><code>DATETIME</code></td><td>Date + time</td><td><code>2024-01-15 09:30:00</code></td></tr>
        <tr><td><code>BOOLEAN</code></td><td>True/False</td><td><code>is_active BOOLEAN</code></td></tr>
      </table>

      <h3>Constraints</h3>
      <table class="lesson-table">
        <tr><th>Constraint</th><th>Purpose</th></tr>
        <tr><td><code>PRIMARY KEY</code></td><td>Unique identifier for each row</td></tr>
        <tr><td><code>AUTO_INCREMENT</code></td><td>Automatically assign next number</td></tr>
        <tr><td><code>NOT NULL</code></td><td>Column cannot be empty</td></tr>
        <tr><td><code>UNIQUE</code></td><td>All values must be different</td></tr>
        <tr><td><code>DEFAULT value</code></td><td>Fallback if no value given</td></tr>
      </table>
    `,
    defaultQuery: `CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price DECIMAL(10,2),
  stock INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
-- Now insert a row:
INSERT INTO products (name, price, stock) VALUES ('Laptop', 999.99, 50);
SELECT * FROM products;`,
    hint: 'Create the table, insert a row, then SELECT to verify.',
    tasks: [
      { label: 'Create & view products', query: "CREATE TABLE products2 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price DECIMAL(10,2));\nINSERT INTO products2 (name, price) VALUES ('Phone', 499.99);\nSELECT * FROM products2;" }
    ]
  },

  {
    id: 'insert',
    chapter: 2,
    chapterTitle: 'Working with Tables',
    title: 'INSERT — Adding Data',
    icon: '➕',
    theory: `
      <h2>Inserting Data</h2>
      <p>The INSERT statement adds new rows to a table.</p>

      <div class="syntax-box">
        <div class="syntax-label">Single row</div>
        <pre>INSERT INTO students (name, age, email, grade)
VALUES ('Frank Lee', 22, 'frank@example.com', 'B');</pre>
      </div>

      <div class="syntax-box">
        <div class="syntax-label">Multiple rows at once</div>
        <pre>INSERT INTO students (name, age, email, grade) VALUES
  ('Grace Kim', 20, 'grace@example.com', 'A'),
  ('Henry Park', 24, 'henry@example.com', 'C'),
  ('Iris Chen', 21, 'iris@example.com', 'B');</pre>
      </div>

      <div class="info-box">
        <strong>⚠️ Important rules:</strong>
        <ul>
          <li>Text values must be wrapped in single quotes: <code>'Alice'</code></li>
          <li>Numbers go without quotes: <code>22</code></li>
          <li>Columns with DEFAULT or AUTO_INCREMENT can be omitted</li>
          <li>NOT NULL columns without a DEFAULT must be included</li>
        </ul>
      </div>
    `,
    defaultQuery: `INSERT INTO students (name, age, email, grade)
VALUES ('Frank Lee', 22, 'frank@example.com', 'B');

SELECT * FROM students;`,
    hint: 'After inserting, run SELECT * FROM students to see the new row.',
    tasks: [
      { label: 'Insert one student', query: "INSERT INTO students (name, age, email, grade) VALUES ('Zoe Adams', 20, 'zoe@example.com', 'A');\nSELECT * FROM students;" },
      { label: 'Insert multiple', query: "INSERT INTO students (name, age, email, grade) VALUES ('Tom B', 22, 'tomb@example.com', 'B'), ('Nina C', 21, 'nina@example.com', 'A');\nSELECT name, grade FROM students ORDER BY name;" }
    ]
  },

  {
    id: 'update-delete',
    chapter: 2,
    chapterTitle: 'Working with Tables',
    title: 'UPDATE & DELETE',
    icon: '✏️',
    theory: `
      <h2>Modifying & Removing Data</h2>

      <h3>UPDATE — Change existing rows</h3>
      <div class="syntax-box">
        <div class="syntax-label">Syntax</div>
        <pre>UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;</pre>
      </div>

      <div class="syntax-box">
        <div class="syntax-label">Examples</div>
        <pre>-- Update one student's grade
UPDATE students SET grade = 'A' WHERE id = 4;

-- Give everyone a birthday
UPDATE students SET age = age + 1;</pre>
      </div>

      <h3>DELETE — Remove rows</h3>
      <div class="syntax-box">
        <div class="syntax-label">Syntax</div>
        <pre>DELETE FROM table_name WHERE condition;
DELETE FROM students WHERE grade = 'C'; -- removes C-grade students</pre>
      </div>

      <div class="warning-box">
        <strong>🚨 DANGER ZONE</strong><br>
        Always include a <code>WHERE</code> clause with UPDATE and DELETE!<br>
        <code>DELETE FROM students;</code> will delete <strong>ALL</strong> rows with no undo!<br>
        A safe habit: run a <code>SELECT</code> with the same WHERE first to preview affected rows.
      </div>
    `,
    defaultQuery: `-- First, see current data
SELECT id, name, grade FROM students;

-- Update David's grade from C to B
UPDATE students SET grade = 'B' WHERE name = 'David Brown';

-- Verify the change
SELECT id, name, grade FROM students;`,
    hint: 'Always use WHERE with UPDATE and DELETE to avoid changing/deleting everything!',
    tasks: [
      { label: 'Update a grade', query: "UPDATE students SET grade = 'A' WHERE id = 2;\nSELECT name, grade FROM students;" },
      { label: 'Delete one student', query: "DELETE FROM students WHERE name = 'David Brown';\nSELECT * FROM students;" }
    ]
  },

  {
    id: 'joins',
    chapter: 2,
    chapterTitle: 'Working with Tables',
    title: 'JOINs — Combining Tables',
    icon: '🔗',
    theory: `
      <h2>SQL JOINs</h2>
      <p>JOINs let you combine rows from two or more tables based on a related column.</p>

      <h3>Types of JOINs</h3>
      <div class="concept-grid">
        <div class="concept-card">
          <strong>INNER JOIN</strong>
          <span>Only rows that match in <em>both</em> tables</span>
        </div>
        <div class="concept-card">
          <strong>LEFT JOIN</strong>
          <span>All rows from the left table, matching from right (or NULL)</span>
        </div>
        <div class="concept-card">
          <strong>RIGHT JOIN</strong>
          <span>All rows from the right table, matching from left (or NULL)</span>
        </div>
      </div>

      <div class="syntax-box">
        <div class="syntax-label">INNER JOIN example</div>
        <pre>SELECT s.name, c.title, e.score
FROM enrollments e
INNER JOIN students s ON e.student_id = s.id
INNER JOIN courses c ON e.course_id = c.id
ORDER BY s.name;</pre>
      </div>

      <div class="info-box">
        <strong>💡 Table aliases</strong> — use short aliases to keep queries readable:
        <code>FROM enrollments e</code> — now use <code>e.column</code> instead of <code>enrollments.column</code>
      </div>

      <p>Our practice database has 3 related tables: <strong>students</strong>, <strong>courses</strong>, and <strong>enrollments</strong>.</p>
    `,
    defaultQuery: `SELECT s.name AS student, c.title AS course, e.score
FROM enrollments e
INNER JOIN students s ON e.student_id = s.id
INNER JOIN courses c  ON e.course_id  = c.id
ORDER BY s.name, e.score DESC;`,
    hint: 'The enrollments table links students and courses. Try changing INNER to LEFT JOIN.',
    tasks: [
      { label: 'Student + course names', query: "SELECT s.name, c.title, e.score FROM enrollments e JOIN students s ON e.student_id = s.id JOIN courses c ON e.course_id = c.id;" },
      { label: 'Average score per student', query: "SELECT s.name, ROUND(AVG(e.score),1) AS avg_score FROM enrollments e JOIN students s ON e.student_id = s.id GROUP BY s.name ORDER BY avg_score DESC;" }
    ]
  },

  // ─── CHAPTER 3: MYSQL WITH PHP ─────────────────────────────────────────────
  {
    id: 'php-intro',
    chapter: 3,
    chapterTitle: 'MySQL with PHP',
    title: 'PHP + MySQL: Getting Started',
    icon: '🐘',
    isCodeLesson: true,
    language: 'php',
    theory: `
      <h2>Connecting PHP to MySQL</h2>
      <p>PHP and MySQL are a classic combination — they power WordPress, Laravel, and millions of other apps.</p>
      <p>PHP offers two ways to connect: <strong>PDO</strong> (recommended) and <strong>MySQLi</strong>.</p>

      <div class="info-box">
        <strong>Why PDO?</strong> PDO (PHP Data Objects) works with multiple databases (MySQL, PostgreSQL, SQLite). 
        It uses prepared statements natively — protecting you from SQL injection.
      </div>
    `,
    codeExample: `<?php
// 1. Database credentials
$host     = 'localhost';
$dbname   = 'school_db';
$username = 'root';
$password = 'yourpassword';

// 2. Create PDO connection
try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
    echo "Connected successfully!";
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// 3. Simple query
$stmt = $pdo->query("SELECT name, grade FROM students ORDER BY name");
$students = $stmt->fetchAll();

foreach ($students as $student) {
    echo $student['name'] . " — Grade: " . $student['grade'] . "\\n";
}
?>`,
    explainPoints: [
      { line: '1–5', text: 'Store credentials in variables (use .env files in production — never hardcode passwords in public code).' },
      { line: 'new PDO(...)', text: 'The DSN string format is: driver:host=HOST;dbname=DBNAME;charset=utf8mb4' },
      { line: 'PDO::ERRMODE_EXCEPTION', text: 'Throws exceptions on errors instead of silently failing — essential for debugging.' },
      { line: '$pdo->query()', text: 'For queries with NO user input. Returns a statement you can fetchAll() or fetch() from.' },
      { line: 'fetchAll()', text: 'Returns all rows as an array of associative arrays. Each row is accessed like $row["column_name"].' }
    ]
  },

  {
    id: 'php-crud',
    chapter: 3,
    chapterTitle: 'MySQL with PHP',
    title: 'PHP CRUD Operations',
    icon: '🐘',
    isCodeLesson: true,
    language: 'php',
    theory: `
      <h2>CRUD with PHP & PDO</h2>
      <p><strong>CRUD</strong> = Create, Read, Update, Delete — the four fundamental database operations.</p>
      <p>Always use <strong>prepared statements</strong> with user input to prevent SQL injection attacks.</p>
    `,
    codeExample: `<?php
// ── CREATE ──────────────────────────────────────────────────────
function addStudent(PDO $pdo, string $name, int $age, string $email, string $grade): int
{
    $stmt = $pdo->prepare(
        "INSERT INTO students (name, age, email, grade) VALUES (:name, :age, :email, :grade)"
    );
    $stmt->execute([
        ':name'  => $name,
        ':age'   => $age,
        ':email' => $email,
        ':grade' => $grade,
    ]);
    return (int) $pdo->lastInsertId();
}

// ── READ ─────────────────────────────────────────────────────────
function getStudentsByGrade(PDO $pdo, string $grade): array
{
    $stmt = $pdo->prepare("SELECT * FROM students WHERE grade = :grade ORDER BY name");
    $stmt->execute([':grade' => $grade]);
    return $stmt->fetchAll();
}

// ── UPDATE ───────────────────────────────────────────────────────
function updateGrade(PDO $pdo, int $id, string $newGrade): bool
{
    $stmt = $pdo->prepare("UPDATE students SET grade = :grade WHERE id = :id");
    return $stmt->execute([':grade' => $newGrade, ':id' => $id]);
}

// ── DELETE ───────────────────────────────────────────────────────
function deleteStudent(PDO $pdo, int $id): bool
{
    $stmt = $pdo->prepare("DELETE FROM students WHERE id = :id");
    return $stmt->execute([':id' => $id]);
}

// ── USAGE ────────────────────────────────────────────────────────
$newId = addStudent($pdo, 'Frank Lee', 22, 'frank@example.com', 'B');
echo "Created student with ID: $newId\\n";

$aStudents = getStudentsByGrade($pdo, 'A');
foreach ($aStudents as $s) {
    echo "{$s['name']} ({$s['age']})\\n";
}

updateGrade($pdo, $newId, 'A');
deleteStudent($pdo, $newId);
?>`,
    explainPoints: [
      { line: '$pdo->prepare()', text: 'Prepare separates the SQL from the data — the database never sees user input as code.' },
      { line: ':name, :age', text: 'Named placeholders. More readable than ? positional placeholders in complex queries.' },
      { line: '$stmt->execute([...])', text: 'Pass the actual values here. PDO handles escaping automatically.' },
      { line: 'lastInsertId()', text: 'Returns the auto-generated primary key of the row you just inserted.' },
      { line: 'fetchAll()', text: 'Returns all matching rows. Use fetch() in a loop for large datasets to save memory.' }
    ]
  },

  // ─── CHAPTER 4: MYSQL WITH NODE.JS ─────────────────────────────────────────
  {
    id: 'nodejs-intro',
    chapter: 4,
    chapterTitle: 'MySQL with Node.js',
    title: 'Node.js + MySQL2',
    icon: '🟢',
    isCodeLesson: true,
    language: 'javascript',
    theory: `
      <h2>MySQL in Node.js</h2>
      <p>The most popular MySQL package for Node.js is <code>mysql2</code> — it's fast, modern, and supports async/await and prepared statements.</p>
      
      <div class="syntax-box">
        <div class="syntax-label">Install</div>
        <pre>npm install mysql2</pre>
      </div>
    `,
    codeExample: `// db.js — reusable connection pool
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'school_db',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

// ── Basic query ──────────────────────────────────────────────────
async function getAllStudents() {
  const [rows] = await pool.query('SELECT * FROM students ORDER BY name');
  return rows;
}

// ── Prepared statement (safe with user input) ─────────────────────
async function getStudentByEmail(email) {
  const [rows] = await pool.execute(
    'SELECT * FROM students WHERE email = ?',
    [email]
  );
  return rows[0] ?? null;
}

// ── Insert & get new ID ──────────────────────────────────────────
async function createStudent({ name, age, email, grade }) {
  const [result] = await pool.execute(
    'INSERT INTO students (name, age, email, grade) VALUES (?, ?, ?, ?)',
    [name, age, email, grade]
  );
  return result.insertId;
}

// ── Transactions ─────────────────────────────────────────────────
async function enrollStudent(studentId, courseId, score) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute(
      'INSERT INTO enrollments (student_id, course_id, score) VALUES (?, ?, ?)',
      [studentId, courseId, score]
    );
    // Could do other operations here — all commit or all rollback
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

module.exports = { pool, getAllStudents, getStudentByEmail, createStudent, enrollStudent };`,
    explainPoints: [
      { line: 'mysql2/promise', text: 'Import the promise-based version so you can use async/await instead of callbacks.' },
      { line: 'createPool()', text: 'A pool reuses connections instead of opening a new one for each query — much more efficient for web apps.' },
      { line: 'pool.query()', text: 'For static queries with no user input. Returns [rows, fields] — destructure to get just rows.' },
      { line: 'pool.execute()', text: 'For queries with user input. Uses prepared statements server-side — prevents SQL injection.' },
      { line: '?', text: 'Positional placeholder. mysql2 maps array items to each ? in order.' },
      { line: 'beginTransaction / commit / rollback', text: 'Wrap related queries in a transaction — if any step fails, all changes are undone.' }
    ]
  },

  {
    id: 'nodejs-express',
    chapter: 4,
    chapterTitle: 'MySQL with Node.js',
    title: 'REST API with Express',
    icon: '🚂',
    isCodeLesson: true,
    language: 'javascript',
    theory: `
      <h2>Building a REST API</h2>
      <p>Combine Express.js with MySQL to build a full REST API. This is the foundation for any web or mobile backend.</p>

      <div class="syntax-box">
        <div class="syntax-label">Install</div>
        <pre>npm install express mysql2 dotenv
npm install -D nodemon</pre>
      </div>

      <h3>REST conventions</h3>
      <table class="lesson-table">
        <tr><th>Method</th><th>Route</th><th>Action</th></tr>
        <tr><td><code>GET</code></td><td>/students</td><td>List all students</td></tr>
        <tr><td><code>GET</code></td><td>/students/:id</td><td>Get one student</td></tr>
        <tr><td><code>POST</code></td><td>/students</td><td>Create a student</td></tr>
        <tr><td><code>PUT</code></td><td>/students/:id</td><td>Update a student</td></tr>
        <tr><td><code>DELETE</code></td><td>/students/:id</td><td>Delete a student</td></tr>
      </table>
    `,
    codeExample: `// server.js
require('dotenv').config();
const express = require('express');
const mysql   = require('mysql2/promise');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ── GET /students ─────────────────────────────────────────────────
app.get('/students', async (req, res) => {
  try {
    const { grade } = req.query;                   // ?grade=A
    let   sql    = 'SELECT * FROM students';
    const params = [];
    if (grade) {
      sql += ' WHERE grade = ?';
      params.push(grade);
    }
    const [rows] = await pool.execute(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /students/:id ─────────────────────────────────────────────
app.get('/students/:id', async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT * FROM students WHERE id = ?',
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

// ── POST /students ────────────────────────────────────────────────
app.post('/students', async (req, res) => {
  const { name, age, email, grade } = req.body;
  const [result] = await pool.execute(
    'INSERT INTO students (name, age, email, grade) VALUES (?, ?, ?, ?)',
    [name, age, email, grade]
  );
  res.status(201).json({ id: result.insertId, name, age, email, grade });
});

// ── PUT /students/:id ─────────────────────────────────────────────
app.put('/students/:id', async (req, res) => {
  const { name, age, grade } = req.body;
  await pool.execute(
    'UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?',
    [name, age, grade, req.params.id]
  );
  res.json({ message: 'Updated successfully' });
});

// ── DELETE /students/:id ──────────────────────────────────────────
app.delete('/students/:id', async (req, res) => {
  await pool.execute('DELETE FROM students WHERE id = ?', [req.params.id]);
  res.json({ message: 'Deleted successfully' });
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));`,
    explainPoints: [
      { line: 'dotenv', text: 'Loads DB credentials from a .env file — never commit .env to git!' },
      { line: 'express.json()', text: 'Middleware that parses JSON request bodies (for POST/PUT requests).' },
      { line: 'req.query', text: 'URL query parameters like ?grade=A. Great for optional filters.' },
      { line: 'req.params.id', text: 'Route parameters from /students/:id. Always a string — cast with parseInt() if needed.' },
      { line: 'status(201)', text: '201 Created is the correct HTTP status when you successfully create a resource.' },
      { line: 'try/catch', text: 'Always wrap async DB calls in try/catch and return a 500 error on failure.' }
    ]
  },

  // ─── CHAPTER 5: MYSQL WITH PYTHON ──────────────────────────────────────────
  {
    id: 'python-intro',
    chapter: 5,
    chapterTitle: 'MySQL with Python',
    title: 'Python + mysql-connector',
    icon: '🐍',
    isCodeLesson: true,
    language: 'python',
    theory: `
      <h2>MySQL in Python</h2>
      <p>Python has two popular MySQL libraries: <code>mysql-connector-python</code> (official, by Oracle) and <code>PyMySQL</code>. 
      For ORM-style access, use <strong>SQLAlchemy</strong>.</p>

      <div class="syntax-box">
        <div class="syntax-label">Install</div>
        <pre>pip install mysql-connector-python
# OR
pip install pymysql sqlalchemy</pre>
      </div>
    `,
    codeExample: `import mysql.connector
from mysql.connector import Error
import os

# ── Connect ───────────────────────────────────────────────────────
def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        database=os.getenv("DB_NAME", "school_db"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
    )

# ── Read all students ─────────────────────────────────────────────
def get_students(grade=None):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)  # returns dicts, not tuples
    try:
        if grade:
            cursor.execute(
                "SELECT * FROM students WHERE grade = %s ORDER BY name",
                (grade,)   # always pass a tuple, even for one value
            )
        else:
            cursor.execute("SELECT * FROM students ORDER BY name")
        return cursor.fetchall()
    finally:
        cursor.close()
        conn.close()

# ── Insert ────────────────────────────────────────────────────────
def add_student(name: str, age: int, email: str, grade: str) -> int:
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO students (name, age, email, grade) VALUES (%s, %s, %s, %s)",
            (name, age, email, grade)
        )
        conn.commit()           # required for INSERT / UPDATE / DELETE
        return cursor.lastrowid
    except Error as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()

# ── Bulk insert with executemany ──────────────────────────────────
def add_many_students(students: list[tuple]):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.executemany(
            "INSERT INTO students (name, age, email, grade) VALUES (%s, %s, %s, %s)",
            students
        )
        conn.commit()
        print(f"Inserted {cursor.rowcount} rows")
    finally:
        cursor.close()
        conn.close()

# ── Example usage ─────────────────────────────────────────────────
if __name__ == "__main__":
    students = get_students(grade="A")
    for s in students:
        print(f"{s['name']} — Age: {s['age']}")

    new_id = add_student("Li Wei", 22, "li@example.com", "A")
    print(f"New student ID: {new_id}")`,
    explainPoints: [
      { line: 'cursor(dictionary=True)', text: 'Returns rows as dictionaries ({col: value}) instead of tuples — much easier to work with.' },
      { line: '%s', text: "Python's MySQL placeholder is always %s, even for numbers. Never use f-strings to build SQL — that's an injection risk." },
      { line: '(grade,)', text: 'Parameters must be a tuple. Single-item tuples need a trailing comma: (value,).' },
      { line: 'conn.commit()', text: 'Required after INSERT, UPDATE, DELETE. Without it, changes are rolled back when the connection closes.' },
      { line: 'executemany()', text: 'Efficiently inserts a list of rows in a single operation — much faster than looping execute().' },
      { line: 'finally:', text: 'Always close the cursor and connection, even if an error occurs. Use context managers (with) in production.' }
    ]
  }
];

window.LESSONS = LESSONS;
