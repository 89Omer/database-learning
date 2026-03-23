// SQL Engine - wraps sql.js to simulate a MySQL-like environment
class SQLEngine {
  constructor() {
    this.db = null;
    this.ready = false;
    this.onReady = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const config = {
        locateFile: filename => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${filename}`
      };
      initSqlJs(config).then(SQL => {
        this.db = new SQL.Database();
        this.ready = true;
        this._seedDatabase();
        resolve(this);
      }).catch(reject);
    });
  }

  _seedDatabase() {
    // Pre-seed with sample data for tutorials
    this.exec(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        email TEXT UNIQUE,
        grade TEXT,
        enrolled_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
      INSERT INTO students (name, age, email, grade) VALUES
        ('Alice Johnson', 21, 'alice@example.com', 'A'),
        ('Bob Smith', 22, 'bob@example.com', 'B'),
        ('Carol White', 20, 'carol@example.com', 'A'),
        ('David Brown', 23, 'david@example.com', 'C'),
        ('Eva Martinez', 21, 'eva@example.com', 'B');

      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        credits INTEGER,
        instructor TEXT
      );
      INSERT INTO courses (title, credits, instructor) VALUES
        ('Database Design', 3, 'Prof. Chen'),
        ('Web Development', 4, 'Prof. Smith'),
        ('Data Structures', 3, 'Prof. Johnson'),
        ('Python Programming', 3, 'Prof. Williams');

      CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        course_id INTEGER,
        score INTEGER,
        FOREIGN KEY(student_id) REFERENCES students(id),
        FOREIGN KEY(course_id) REFERENCES courses(id)
      );
      INSERT INTO enrollments (student_id, course_id, score) VALUES
        (1, 1, 92), (1, 2, 88), (2, 1, 75), (2, 3, 80),
        (3, 2, 95), (3, 4, 91), (4, 1, 65), (5, 3, 78);
    `);
  }

  exec(sql) {
    if (!this.ready) throw new Error('Database not initialized');
    try {
      const results = [];
      const stmts = sql.trim().split(';').filter(s => s.trim());
      for (const stmt of stmts) {
        if (!stmt.trim()) continue;
        const res = this.db.exec(stmt);
        if (res.length > 0) results.push(...res);
      }
      return { success: true, results };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  reset() {
    if (this.db) this.db.close();
    this.db = new (this.db.constructor)();
    this._seedDatabase();
  }
}

window.SQLEngine = SQLEngine;
