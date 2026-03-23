// ─── CHAPTER 6: DATABASE DESIGN & ERD ──────────────────────────────────────

const NEW_LESSONS = [
  {
    id: 'erd',
    chapter: 6,
    chapterTitle: 'Database Design & ERD',
    title: 'Entity Relationship Diagrams',
    icon: '🗺️',
    isERDLesson: true,
    theory: `
      <h2>Entity Relationship Diagrams</h2>
      <p>An <strong>ERD</strong> is a blueprint of your database. It shows tables (entities), their columns (attributes), and how they connect to each other (relationships) — all before you write a single line of SQL.</p>

      <h3>How to read an ERD</h3>
      <div class="concept-grid">
        <div class="concept-card">
          <span class="concept-icon">📋</span>
          <strong>Entity (Table)</strong>
          <span>A rectangle — each table in your database</span>
        </div>
        <div class="concept-card">
          <span class="concept-icon">🏷️</span>
          <strong>Attribute (Column)</strong>
          <span>Listed inside the entity box with its data type</span>
        </div>
        <div class="concept-card">
          <span class="concept-icon">🔑</span>
          <strong>Primary Key (PK)</strong>
          <span>The unique identifier — marked with 🔑</span>
        </div>
        <div class="concept-card">
          <span class="concept-icon">🔗</span>
          <strong>Foreign Key (FK)</strong>
          <span>Links to another table's primary key</span>
        </div>
      </div>

      <h3>Crow's Foot Notation</h3>
      <p>Lines between entities show the <strong>cardinality</strong> — how many rows on each side can be related:</p>
      <table class="lesson-table">
        <tr><th>Symbol</th><th>Meaning</th><th>Example</th></tr>
        <tr><td><code>||</code></td><td>Exactly one</td><td>One student</td></tr>
        <tr><td><code>|&lt;</code></td><td>One or many</td><td>One or many enrollments</td></tr>
        <tr><td><code>o|</code></td><td>Zero or one</td><td>Optional relationship</td></tr>
        <tr><td><code>o&lt;</code></td><td>Zero or many</td><td>Optional, many allowed</td></tr>
      </table>

      <h3>How to design an ERD from scratch</h3>
      <ol>
        <li><strong>Identify entities</strong> — nouns in your requirements (Student, Course, Teacher)</li>
        <li><strong>Add attributes</strong> — what do you need to store about each? (name, email, credits)</li>
        <li><strong>Choose primary keys</strong> — usually an auto-increment <code>id</code></li>
        <li><strong>Define relationships</strong> — which entities connect? (Student <em>enrolls in</em> Course)</li>
        <li><strong>Determine cardinality</strong> — can a student enroll in many courses? Yes → many-to-many</li>
        <li><strong>Resolve many-to-many</strong> — add a junction table (<code>enrollments</code>) with two foreign keys</li>
      </ol>

      <p>The interactive diagram on the right shows our school database. <strong>Click any table</strong> to highlight its relationships.</p>
    `,
    erdHTML: `
      <div class="erd-wrapper">
        <div class="erd-toolbar">
          <span class="erd-label">school_db — Interactive Schema</span>
          <div class="erd-legend">
            <span class="legend-pk">🔑 PK</span>
            <span class="legend-fk">🔗 FK</span>
            <span class="legend-line">── Relationship</span>
          </div>
        </div>
        <div class="erd-canvas" id="erd-canvas">
          <svg id="erd-svg" width="100%" viewBox="0 0 680 480" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="crow-many" viewBox="0 0 16 16" refX="14" refY="8" markerWidth="10" markerHeight="10" orient="auto">
                <path d="M2 2 L14 8 L2 14" fill="none" stroke="#58a6ff" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="2" y1="2" x2="2" y2="14" stroke="#58a6ff" stroke-width="1.5" stroke-linecap="round"/>
              </marker>
              <marker id="crow-one" viewBox="0 0 16 16" refX="14" refY="8" markerWidth="10" markerHeight="10" orient="auto">
                <line x1="12" y1="2" x2="12" y2="14" stroke="#58a6ff" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="14" y1="2" x2="14" y2="14" stroke="#58a6ff" stroke-width="1.5" stroke-linecap="round"/>
              </marker>
            </defs>

            <!-- Relationship lines -->
            <!-- students (1) ──< enrollments (many) -->
            <line class="erd-rel" id="rel-students-enroll"
                  x1="196" y1="170" x2="296" y2="230"
                  stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="none"
                  marker-end="url(#crow-many)" marker-start="url(#crow-one)"/>

            <!-- courses (1) ──< enrollments (many) -->
            <line class="erd-rel" id="rel-courses-enroll"
                  x1="484" y1="170" x2="406" y2="230"
                  stroke="#58a6ff" stroke-width="1.5"
                  marker-end="url(#crow-many)" marker-start="url(#crow-one)"/>

            <!-- STUDENTS table -->
            <g class="erd-table" id="tbl-students" onclick="ERD.toggle('students')" style="cursor:pointer">
              <rect class="erd-table-bg" x="20" y="40" width="176" height="210" rx="8"/>
              <rect class="erd-table-header" x="20" y="40" width="176" height="36" rx="8"/>
              <rect x="20" y="68" width="176" height="8" rx="0"/>
              <text class="erd-table-name" x="108" y="63" text-anchor="middle">students</text>
              <!-- rows -->
              <g class="erd-row erd-pk-row">
                <rect x="20" y="76" width="176" height="26"/>
                <text class="erd-col-icon" x="36" y="93">🔑</text>
                <text class="erd-col-name" x="56" y="93">id</text>
                <text class="erd-col-type" x="192" y="93" text-anchor="end">INT</text>
              </g>
              <g class="erd-row"><rect x="20" y="102" width="176" height="26"/>
                <text class="erd-col-name" x="36" y="119">name</text>
                <text class="erd-col-type" x="192" y="119" text-anchor="end">VARCHAR(100)</text>
              </g>
              <g class="erd-row"><rect x="20" y="128" width="176" height="26"/>
                <text class="erd-col-name" x="36" y="145">age</text>
                <text class="erd-col-type" x="192" y="145" text-anchor="end">INT</text>
              </g>
              <g class="erd-row"><rect x="20" y="154" width="176" height="26"/>
                <text class="erd-col-name" x="36" y="171">email</text>
                <text class="erd-col-type" x="192" y="171" text-anchor="end">VARCHAR(150)</text>
              </g>
              <g class="erd-row"><rect x="20" y="180" width="176" height="26"/>
                <text class="erd-col-name" x="36" y="197">grade</text>
                <text class="erd-col-type" x="192" y="197" text-anchor="end">CHAR(1)</text>
              </g>
              <g class="erd-row last-row"><rect x="20" y="206" width="176" height="26"/>
                <text class="erd-col-name" x="36" y="223">enrolled_at</text>
                <text class="erd-col-type" x="192" y="223" text-anchor="end">DATETIME</text>
              </g>
            </g>

            <!-- ENROLLMENTS table (junction) -->
            <g class="erd-table erd-junction" id="tbl-enrollments" onclick="ERD.toggle('enrollments')" style="cursor:pointer">
              <rect class="erd-table-bg" x="296" y="220" width="176" height="158" rx="8"/>
              <rect class="erd-table-header erd-header-junction" x="296" y="220" width="176" height="36" rx="8"/>
              <rect x="296" y="248" width="176" height="8" rx="0" class="erd-header-junction"/>
              <text class="erd-table-name" x="384" y="243" text-anchor="middle">enrollments</text>
              <g class="erd-row erd-pk-row">
                <rect x="296" y="256" width="176" height="26"/>
                <text class="erd-col-icon" x="312" y="273">🔑</text>
                <text class="erd-col-name" x="332" y="273">id</text>
                <text class="erd-col-type" x="468" y="273" text-anchor="end">INT</text>
              </g>
              <g class="erd-row">
                <rect x="296" y="282" width="176" height="26"/>
                <text class="erd-col-icon" x="312" y="299">🔗</text>
                <text class="erd-col-name" x="332" y="299">student_id</text>
                <text class="erd-col-type" x="468" y="299" text-anchor="end">INT FK</text>
              </g>
              <g class="erd-row">
                <rect x="296" y="308" width="176" height="26"/>
                <text class="erd-col-icon" x="312" y="325">🔗</text>
                <text class="erd-col-name" x="332" y="325">course_id</text>
                <text class="erd-col-type" x="468" y="325" text-anchor="end">INT FK</text>
              </g>
              <g class="erd-row last-row">
                <rect x="296" y="334" width="176" height="26"/>
                <text class="erd-col-name" x="312" y="351">score</text>
                <text class="erd-col-type" x="468" y="351" text-anchor="end">INT</text>
              </g>
            </g>

            <!-- COURSES table -->
            <g class="erd-table" id="tbl-courses" onclick="ERD.toggle('courses')" style="cursor:pointer">
              <rect class="erd-table-bg" x="484" y="40" width="176" height="184" rx="8"/>
              <rect class="erd-table-header" x="484" y="40" width="176" height="36" rx="8"/>
              <rect x="484" y="68" width="176" height="8" rx="0"/>
              <text class="erd-table-name" x="572" y="63" text-anchor="middle">courses</text>
              <g class="erd-row erd-pk-row">
                <rect x="484" y="76" width="176" height="26"/>
                <text class="erd-col-icon" x="500" y="93">🔑</text>
                <text class="erd-col-name" x="520" y="93">id</text>
                <text class="erd-col-type" x="656" y="93" text-anchor="end">INT</text>
              </g>
              <g class="erd-row"><rect x="484" y="102" width="176" height="26"/>
                <text class="erd-col-name" x="500" y="119">title</text>
                <text class="erd-col-type" x="656" y="119" text-anchor="end">VARCHAR(150)</text>
              </g>
              <g class="erd-row"><rect x="484" y="128" width="176" height="26"/>
                <text class="erd-col-name" x="500" y="145">credits</text>
                <text class="erd-col-type" x="656" y="145" text-anchor="end">INT</text>
              </g>
              <g class="erd-row last-row"><rect x="484" y="154" width="176" height="26"/>
                <text class="erd-col-name" x="500" y="171">instructor</text>
                <text class="erd-col-type" x="656" y="171" text-anchor="end">VARCHAR(100)</text>
              </g>
            </g>

            <!-- Cardinality labels -->
            <text class="erd-card" x="204" y="192">1</text>
            <text class="erd-card" x="280" y="224">N</text>
            <text class="erd-card" x="476" y="192">1</text>
            <text class="erd-card" x="420" y="224">N</text>

            <!-- Relationship labels -->
            <text class="erd-rel-label" x="235" y="207">enrolls in</text>
            <text class="erd-rel-label" x="430" y="207">belongs to</text>
          </svg>
        </div>
        <div class="erd-info-bar" id="erd-info-bar">
          <span id="erd-info-text">Click a table to see its details and relationships</span>
        </div>
      </div>
    `,
    erdInit: function() {
      window.ERD = {
        active: null,
        tables: {
          students: {
            desc: 'Stores one row per student. The primary key <code>id</code> is referenced by <code>enrollments.student_id</code>.',
            rel: 'One student → many enrollments (1:N)',
            color: '#58a6ff'
          },
          courses: {
            desc: 'Stores available courses. The primary key <code>id</code> is referenced by <code>enrollments.course_id</code>.',
            rel: 'One course → many enrollments (1:N)',
            color: '#f78166'
          },
          enrollments: {
            desc: 'Junction table that resolves the many-to-many relationship between students and courses. Each row = one student enrolled in one course.',
            rel: 'Many students ↔ many courses (M:N resolved via junction table)',
            color: '#3fb950'
          }
        },
        toggle(name) {
          const info = document.getElementById('erd-info-text');
          const t = this.tables[name];
          if (!t) return;

          // Reset all tables
          document.querySelectorAll('.erd-table').forEach(el => el.classList.remove('erd-active'));
          document.querySelectorAll('.erd-rel').forEach(el => el.classList.remove('erd-rel-active'));

          if (this.active === name) {
            this.active = null;
            info.innerHTML = 'Click a table to see its details and relationships';
            return;
          }
          this.active = name;
          document.getElementById('tbl-' + name).classList.add('erd-active');

          // Highlight related lines
          if (name === 'students' || name === 'enrollments') {
            document.getElementById('rel-students-enroll').classList.add('erd-rel-active');
          }
          if (name === 'courses' || name === 'enrollments') {
            document.getElementById('rel-courses-enroll').classList.add('erd-rel-active');
          }

          info.innerHTML = `<strong>${name}</strong> — ${t.desc} &nbsp;|&nbsp; <em>${t.rel}</em>`;
        }
      };
    }
  },

  // ─── CHAPTER 7: ADVANCED SQL ───────────────────────────────────────────────

  {
    id: 'subqueries',
    chapter: 7,
    chapterTitle: 'Advanced SQL',
    title: 'Subqueries',
    icon: '🔁',
    theory: `
      <h2>Subqueries</h2>
      <p>A <strong>subquery</strong> is a query nested inside another query. It lets you use the result of one SELECT as input to another — without needing temporary tables or multiple round-trips.</p>

      <h3>Three places to use a subquery</h3>
      <table class="lesson-table">
        <tr><th>Where</th><th>Use it for</th></tr>
        <tr><td><code>WHERE</code></td><td>Filter based on a computed value</td></tr>
        <tr><td><code>FROM</code></td><td>Treat a query result as a table (derived table)</td></tr>
        <tr><td><code>SELECT</code></td><td>Compute a scalar value per row</td></tr>
      </table>

      <div class="syntax-box">
        <div class="syntax-label">WHERE subquery — students above average age</div>
        <pre>SELECT name, age FROM students
WHERE age > (SELECT AVG(age) FROM students);</pre>
      </div>

      <div class="syntax-box">
        <div class="syntax-label">IN subquery — students enrolled in 'Database Design'</div>
        <pre>SELECT name FROM students
WHERE id IN (
  SELECT student_id FROM enrollments
  WHERE course_id = (
    SELECT id FROM courses WHERE title = 'Database Design'
  )
);</pre>
      </div>

      <div class="syntax-box">
        <div class="syntax-label">FROM subquery (derived table) — avg score per student</div>
        <pre>SELECT s.name, sub.avg_score
FROM students s
JOIN (
  SELECT student_id, ROUND(AVG(score), 1) AS avg_score
  FROM enrollments
  GROUP BY student_id
) AS sub ON s.id = sub.student_id
ORDER BY sub.avg_score DESC;</pre>
      </div>

      <div class="info-box">
        <strong>EXISTS vs IN:</strong> Use <code>EXISTS</code> when you only care <em>whether</em> a match exists (not the value), and the subquery could return many rows — it short-circuits as soon as one match is found.
        <pre>SELECT name FROM students s
WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.id);</pre>
      </div>
    `,
    defaultQuery: `-- Students older than the average age
SELECT name, age
FROM students
WHERE age > (SELECT AVG(age) FROM students)
ORDER BY age DESC;`,
    hint: 'Try the derived table example — JOIN on a subquery in FROM.',
    tasks: [
      { label: 'Above average age', query: 'SELECT name, age FROM students\nWHERE age > (SELECT AVG(age) FROM students);' },
      { label: 'Students with any enrollment', query: 'SELECT name FROM students s\nWHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.id);' },
      { label: 'Avg score per student (derived)', query: 'SELECT s.name, sub.avg_score\nFROM students s\nJOIN (\n  SELECT student_id, ROUND(AVG(score),1) AS avg_score\n  FROM enrollments GROUP BY student_id\n) AS sub ON s.id = sub.student_id\nORDER BY sub.avg_score DESC;' }
    ]
  },

  {
    id: 'null-functions',
    chapter: 7,
    chapterTitle: 'Advanced SQL',
    title: 'NULL Handling & Functions',
    icon: '∅',
    theory: `
      <h2>NULL Handling & Useful Functions</h2>
      <p><code>NULL</code> means <em>unknown / missing</em> — it is <strong>not</strong> zero or an empty string. This trips up many beginners.</p>

      <h3>NULL rules</h3>
      <div class="warning-box">
        <strong>NULL != NULL</strong> — you cannot compare NULL with = or !=.<br>
        Use <code>IS NULL</code> and <code>IS NOT NULL</code> instead.
        <pre>-- Wrong:  WHERE email = NULL
-- Right:  WHERE email IS NULL</pre>
      </div>

      <h3>COALESCE — provide a fallback value</h3>
      <div class="syntax-box">
        <div class="syntax-label">COALESCE returns the first non-NULL value</div>
        <pre>SELECT name, COALESCE(grade, 'N/A') AS grade FROM students;
-- If grade is NULL, shows 'N/A' instead</pre>
      </div>

      <h3>String functions</h3>
      <table class="lesson-table">
        <tr><th>Function</th><th>Example</th><th>Result</th></tr>
        <tr><td><code>UPPER()</code></td><td><code>UPPER('alice')</code></td><td>ALICE</td></tr>
        <tr><td><code>LOWER()</code></td><td><code>LOWER('ALICE')</code></td><td>alice</td></tr>
        <tr><td><code>LENGTH()</code></td><td><code>LENGTH('Alice')</code></td><td>5</td></tr>
        <tr><td><code>TRIM()</code></td><td><code>TRIM('  hi  ')</code></td><td>hi</td></tr>
        <tr><td><code>CONCAT()</code></td><td><code>CONCAT(first, ' ', last)</code></td><td>Alice Smith</td></tr>
        <tr><td><code>SUBSTRING()</code></td><td><code>SUBSTRING('hello', 2, 3)</code></td><td>ell</td></tr>
        <tr><td><code>REPLACE()</code></td><td><code>REPLACE('a.b', '.', '_')</code></td><td>a_b</td></tr>
      </table>

      <h3>Date functions</h3>
      <table class="lesson-table">
        <tr><th>Function</th><th>Returns</th></tr>
        <tr><td><code>NOW()</code></td><td>Current date and time</td></tr>
        <tr><td><code>CURDATE()</code></td><td>Current date only</td></tr>
        <tr><td><code>YEAR(date)</code></td><td>Year part</td></tr>
        <tr><td><code>DATEDIFF(d1, d2)</code></td><td>Days between two dates</td></tr>
        <tr><td><code>DATE_FORMAT(date, fmt)</code></td><td>Format a date: <code>'%d/%m/%Y'</code></td></tr>
      </table>
    `,
    defaultQuery: `-- COALESCE: handle NULLs gracefully
SELECT
  name,
  COALESCE(grade, 'Not graded') AS grade,
  UPPER(name) AS name_upper,
  LENGTH(name) AS name_length
FROM students
ORDER BY name;`,
    hint: 'Try: SELECT name, CONCAT(name, " — Grade: ", COALESCE(grade,"?")) AS info FROM students;',
    tasks: [
      { label: 'COALESCE grade fallback', query: "SELECT name, COALESCE(grade,'N/A') AS grade FROM students;" },
      { label: 'String functions', query: "SELECT name, UPPER(name) AS upper, LENGTH(name) AS len, SUBSTRING(name,1,5) AS short FROM students;" },
      { label: 'CONCAT full info', query: "SELECT CONCAT(name, ' (age ', age, ')') AS summary, grade FROM students ORDER BY grade;" }
    ]
  },

  {
    id: 'string-date-functions',
    chapter: 7,
    chapterTitle: 'Advanced SQL',
    title: 'String & Date Functions',
    icon: '📅',
    theory: `
      <h2>String & Date Functions — Deep Dive</h2>
      <p>MySQL has a rich library of built-in functions. Knowing them saves you from doing string/date manipulation in application code — letting the database do the heavy lifting.</p>

      <h3>CASE — conditional logic in SQL</h3>
      <div class="syntax-box">
        <div class="syntax-label">CASE expression</div>
        <pre>SELECT name,
  grade,
  CASE grade
    WHEN 'A' THEN 'Distinction'
    WHEN 'B' THEN 'Merit'
    WHEN 'C' THEN 'Pass'
    ELSE 'Unknown'
  END AS grade_label
FROM students;</pre>
      </div>

      <h3>IF — shorthand conditional</h3>
      <div class="syntax-box">
        <div class="syntax-label">IF(condition, true_val, false_val)</div>
        <pre>SELECT name, age,
  IF(age >= 21, 'Senior', 'Junior') AS year_group
FROM students;</pre>
      </div>

      <h3>ROUND, CEIL, FLOOR</h3>
      <div class="syntax-box">
        <div class="syntax-label">Rounding functions</div>
        <pre>SELECT
  ROUND(AVG(score), 1)  AS avg_rounded,
  CEIL(AVG(score))      AS avg_ceiling,
  FLOOR(AVG(score))     AS avg_floor
FROM enrollments;</pre>
      </div>

      <h3>GROUP_CONCAT — collapse multiple rows into one string</h3>
      <div class="syntax-box">
        <div class="syntax-label">Combine all courses a student takes into one cell</div>
        <pre>SELECT s.name,
  GROUP_CONCAT(c.title ORDER BY c.title SEPARATOR ', ') AS courses
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c     ON c.id = e.course_id
GROUP BY s.name;</pre>
      </div>
    `,
    defaultQuery: `SELECT name, grade,
  CASE grade
    WHEN 'A' THEN 'Distinction'
    WHEN 'B' THEN 'Merit'
    WHEN 'C' THEN 'Pass'
    ELSE 'Ungraded'
  END AS grade_label,
  IF(age >= 21, 'Senior', 'Junior') AS year_group
FROM students
ORDER BY grade;`,
    hint: 'Try GROUP_CONCAT to see all courses per student in one row.',
    tasks: [
      { label: 'CASE grade labels', query: "SELECT name, grade, CASE grade WHEN 'A' THEN 'Distinction' WHEN 'B' THEN 'Merit' ELSE 'Pass' END AS label FROM students;" },
      { label: 'IF senior/junior', query: "SELECT name, age, IF(age >= 21, 'Senior', 'Junior') AS year_group FROM students;" },
      { label: 'GROUP_CONCAT courses', query: "SELECT s.name, GROUP_CONCAT(c.title SEPARATOR ', ') AS courses\nFROM students s JOIN enrollments e ON s.id=e.student_id JOIN courses c ON c.id=e.course_id\nGROUP BY s.name;" }
    ]
  },

  {
    id: 'indexes',
    chapter: 7,
    chapterTitle: 'Advanced SQL',
    title: 'Indexes & Performance',
    icon: '⚡',
    theory: `
      <h2>Indexes & Query Performance</h2>
      <p>An <strong>index</strong> is a separate data structure (like a book's index) that MySQL maintains to make lookups faster. Without one, MySQL scans every row — a <em>full table scan</em>.</p>

      <div class="concept-grid">
        <div class="concept-card">
          <span class="concept-icon">🚀</span>
          <strong>With index</strong>
          <span>Find a row in O(log n) — instant even on millions of rows</span>
        </div>
        <div class="concept-card">
          <span class="concept-icon">🐢</span>
          <strong>Without index</strong>
          <span>Full scan O(n) — reads every row, gets slower as data grows</span>
        </div>
      </div>

      <h3>Creating indexes</h3>
      <div class="syntax-box">
        <div class="syntax-label">Syntax</div>
        <pre>-- Single column index
CREATE INDEX idx_email ON students(email);

-- Composite index (multiple columns)
CREATE INDEX idx_grade_age ON students(grade, age);

-- Unique index (enforces uniqueness + speeds lookups)
CREATE UNIQUE INDEX idx_email_unique ON students(email);

-- See all indexes on a table
SHOW INDEX FROM students;</pre>
      </div>

      <h3>When to add an index</h3>
      <table class="lesson-table">
        <tr><th>Good candidates</th><th>Poor candidates</th></tr>
        <tr><td>Columns in WHERE clauses</td><td>Columns rarely used in queries</td></tr>
        <tr><td>Columns in JOIN ON conditions</td><td>Very small tables (full scan is fine)</td></tr>
        <tr><td>Columns in ORDER BY</td><td>Columns with very few distinct values (e.g. boolean)</td></tr>
        <tr><td>Foreign key columns</td><td>Tables with very frequent INSERTs (index overhead)</td></tr>
      </table>

      <h3>EXPLAIN — see how MySQL runs your query</h3>
      <div class="syntax-box">
        <div class="syntax-label">EXPLAIN shows the query execution plan</div>
        <pre>EXPLAIN SELECT * FROM students WHERE email = 'alice@example.com';
-- Look at the 'type' column:
-- ALL = full scan (bad) | ref/range = index used (good) | const = perfect</pre>
      </div>

      <div class="warning-box">
        <strong>Don't over-index!</strong> Every index slows down INSERT, UPDATE, and DELETE because MySQL must update the index too. Only add indexes for queries that are actually slow.
      </div>
    `,
    defaultQuery: `-- Check existing indexes
-- (SHOW INDEX not supported in this sandbox — use CREATE INDEX below)

-- Create an index on email
CREATE INDEX idx_student_email ON students(email);

-- Now query using that indexed column
SELECT * FROM students WHERE email = 'alice@example.com';`,
    hint: 'In a real MySQL server, run EXPLAIN before and after creating an index to see the difference.',
    tasks: [
      { label: 'Create index on grade', query: "CREATE INDEX idx_grade ON students(grade);\nSELECT name, grade FROM students WHERE grade = 'A';" },
      { label: 'Composite index', query: "CREATE INDEX idx_grade_age ON students(grade, age);\nSELECT * FROM students WHERE grade='A' AND age=21;" }
    ]
  },

  {
    id: 'views',
    chapter: 7,
    chapterTitle: 'Advanced SQL',
    title: 'Views & Stored Procedures',
    icon: '👁️',
    theory: `
      <h2>Views</h2>
      <p>A <strong>view</strong> is a saved SELECT query that behaves like a virtual table. You query it just like a real table — but its data always reflects the current state of the underlying tables.</p>

      <div class="syntax-box">
        <div class="syntax-label">Create a view</div>
        <pre>CREATE VIEW student_enrollments AS
  SELECT s.name AS student, c.title AS course, e.score
  FROM enrollments e
  JOIN students s ON e.student_id = s.id
  JOIN courses  c ON e.course_id  = c.id;

-- Now use it like a table:
SELECT * FROM student_enrollments WHERE score >= 85;</pre>
      </div>

      <h3>Why use views?</h3>
      <ul>
        <li><strong>Simplify complex queries</strong> — write the JOIN once, reuse everywhere</li>
        <li><strong>Security</strong> — expose only certain columns to users (e.g. hide salary)</li>
        <li><strong>Consistency</strong> — one source of truth for business logic</li>
      </ul>

      <h3>Stored Procedures</h3>
      <p>A <strong>stored procedure</strong> is a named, reusable block of SQL saved in the database. It can accept parameters, contain logic (IF, LOOP), and execute multiple statements.</p>

      <div class="syntax-box">
        <div class="syntax-label">Create and call a stored procedure</div>
        <pre>DELIMITER $$
CREATE PROCEDURE GetStudentsByGrade(IN p_grade CHAR(1))
BEGIN
  SELECT name, age, email
  FROM students
  WHERE grade = p_grade
  ORDER BY name;
END $$
DELIMITER ;

-- Call it:
CALL GetStudentsByGrade('A');</pre>
      </div>

      <div class="info-box">
        <strong>Views vs Stored Procedures:</strong><br>
        Views = saved SELECT (read-only logic). Stored Procedures = saved programs that can do anything — INSERT, UPDATE, DELETE, conditionals, loops.
      </div>
    `,
    defaultQuery: `-- Create a view joining all three tables
CREATE VIEW student_scores AS
  SELECT s.name AS student, c.title AS course,
         e.score,
         CASE WHEN e.score >= 90 THEN 'A'
              WHEN e.score >= 80 THEN 'B'
              WHEN e.score >= 70 THEN 'C'
              ELSE 'D' END AS letter_grade
  FROM enrollments e
  JOIN students s ON e.student_id = s.id
  JOIN courses  c ON e.course_id  = c.id;

-- Query the view
SELECT * FROM student_scores ORDER BY score DESC;`,
    hint: 'After creating the view, try: SELECT student, AVG(score) as avg FROM student_scores GROUP BY student;',
    tasks: [
      { label: 'Create & query view', query: "CREATE VIEW v_top_students AS SELECT name, grade FROM students WHERE grade='A';\nSELECT * FROM v_top_students;" },
      { label: 'View with score grades', query: "CREATE VIEW student_scores2 AS SELECT s.name, e.score, CASE WHEN e.score>=90 THEN 'A' WHEN e.score>=80 THEN 'B' ELSE 'C' END AS grade FROM enrollments e JOIN students s ON s.id=e.student_id;\nSELECT * FROM student_scores2 ORDER BY score DESC;" }
    ]
  },

  {
    id: 'transactions',
    chapter: 7,
    chapterTitle: 'Advanced SQL',
    title: 'Transactions & ACID',
    icon: '🔒',
    theory: `
      <h2>Transactions & ACID</h2>
      <p>A <strong>transaction</strong> is a group of SQL statements that execute as a single unit. Either <em>all succeed</em> (COMMIT) or <em>all are undone</em> (ROLLBACK). This is what keeps your data safe.</p>

      <h3>ACID Properties</h3>
      <div class="concept-grid">
        <div class="concept-card">
          <span class="concept-icon">⚛️</span>
          <strong>Atomicity</strong>
          <span>All statements succeed or none do — no partial updates</span>
        </div>
        <div class="concept-card">
          <span class="concept-icon">✅</span>
          <strong>Consistency</strong>
          <span>Database moves from one valid state to another — constraints always hold</span>
        </div>
        <div class="concept-card">
          <span class="concept-icon">🏝️</span>
          <strong>Isolation</strong>
          <span>Concurrent transactions don't see each other's uncommitted changes</span>
        </div>
        <div class="concept-card">
          <span class="concept-icon">💾</span>
          <strong>Durability</strong>
          <span>Once committed, data survives crashes and power failures</span>
        </div>
      </div>

      <h3>Transaction syntax</h3>
      <div class="syntax-box">
        <div class="syntax-label">Basic transaction</div>
        <pre>START TRANSACTION;

  UPDATE students SET grade = 'A' WHERE id = 2;
  INSERT INTO enrollments (student_id, course_id, score) VALUES (2, 3, 95);

COMMIT;  -- save both changes permanently</pre>
      </div>

      <div class="syntax-box">
        <div class="syntax-label">Rollback on error</div>
        <pre>START TRANSACTION;

  DELETE FROM students WHERE id = 1;
  -- Oops — we changed our mind:

ROLLBACK;  -- undo everything since START TRANSACTION
SELECT * FROM students;  -- row still exists!</pre>
      </div>

      <div class="info-box">
        <strong>Classic example — bank transfer:</strong><br>
        Deduct £500 from Account A, add £500 to Account B. If the credit fails, you must also undo the debit. Without a transaction, Account A loses £500 with nowhere for it to go.
      </div>

      <h3>SAVEPOINT — partial rollback</h3>
      <div class="syntax-box">
        <div class="syntax-label">Roll back to a named point</div>
        <pre>START TRANSACTION;
  INSERT INTO students (name, age, email, grade) VALUES ('Test', 20, 'test@x.com', 'B');
  SAVEPOINT after_insert;

  DELETE FROM students WHERE grade = 'C';  -- risky step

ROLLBACK TO after_insert;  -- undo only the DELETE, keep the INSERT
COMMIT;</pre>
      </div>
    `,
    defaultQuery: `-- Safe transaction: update a grade + add an enrollment together
START TRANSACTION;

UPDATE students SET grade = 'A' WHERE id = 4;
INSERT INTO enrollments (student_id, course_id, score) VALUES (4, 2, 91);

COMMIT;

-- Verify both changes happened
SELECT id, name, grade FROM students WHERE id = 4;
SELECT * FROM enrollments WHERE student_id = 4;`,
    hint: 'Try replacing COMMIT with ROLLBACK — then check if the changes were saved.',
    tasks: [
      { label: 'Commit a transaction', query: "START TRANSACTION;\nUPDATE students SET grade = 'A' WHERE id = 2;\nCOMMIT;\nSELECT name, grade FROM students WHERE id = 2;" },
      { label: 'Rollback demo', query: "START TRANSACTION;\nDELETE FROM students WHERE id = 1;\nROLLBACK;\nSELECT * FROM students;" },
      { label: 'SAVEPOINT partial rollback', query: "START TRANSACTION;\nINSERT INTO students (name,age,email,grade) VALUES ('Temp',20,'tmp@x.com','B');\nSAVEPOINT sp1;\nDELETE FROM students WHERE grade='C';\nROLLBACK TO sp1;\nCOMMIT;\nSELECT name, grade FROM students ORDER BY id;" }
    ]
  }
];

// Merge into LESSONS array
window.LESSONS = [...(window.LESSONS || []), ...NEW_LESSONS];
