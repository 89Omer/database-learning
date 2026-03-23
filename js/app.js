// app.js — Main application controller
class TutorialApp {
  constructor() {
    this.engine       = new SQLEngine();
    this.currentLesson = null;
    this.completedLessons = this._loadProgress();
    this.editor       = null;
  }

  async init() {
    this._showLoadingState();
    await this.engine.init();
    this._buildSidebar();
    this._setupEventListeners();
    // Load first lesson by default
    const firstId = LESSONS[0].id;
    this.loadLesson(firstId);
    this._hideLoadingState();
  }

  _loadProgress() {
    try {
      return new Set(JSON.parse(localStorage.getItem('mysql_progress') || '[]'));
    } catch { return new Set(); }
  }

  _saveProgress() {
    localStorage.setItem('mysql_progress', JSON.stringify([...this.completedLessons]));
  }

  _showLoadingState() {
    document.getElementById('loading-overlay').classList.remove('hidden');
  }

  _hideLoadingState() {
    document.getElementById('loading-overlay').classList.add('hidden');
  }

  _buildSidebar() {
    const nav    = document.getElementById('lesson-nav');
    const chapters = {};

    LESSONS.forEach(lesson => {
      if (!chapters[lesson.chapter]) {
        chapters[lesson.chapter] = { title: lesson.chapterTitle, lessons: [] };
      }
      chapters[lesson.chapter].lessons.push(lesson);
    });

    let html = '';
    Object.entries(chapters).forEach(([chNum, chapter]) => {
      html += `
        <div class="chapter-group">
          <div class="chapter-heading">Chapter ${chNum}: ${chapter.title}</div>
          ${chapter.lessons.map(l => `
            <button class="lesson-btn ${this.completedLessons.has(l.id) ? 'completed' : ''}"
                    data-lesson="${l.id}"
                    onclick="app.loadLesson('${l.id}')">
              <span class="lesson-icon">${l.icon}</span>
              <span class="lesson-title">${l.title}</span>
              ${this.completedLessons.has(l.id) ? '<span class="check-mark">✓</span>' : ''}
            </button>
          `).join('')}
        </div>`;
    });

    nav.innerHTML = html;
    this._updateProgressBar();
  }

  _updateProgressBar() {
    const total   = LESSONS.length;
    const done    = this.completedLessons.size;
    const pct     = Math.round((done / total) * 100);
    document.getElementById('progress-fill').style.width  = pct + '%';
    document.getElementById('progress-text').textContent  = `${done} / ${total} lessons`;
  }

  loadLesson(id) {
    const lesson = LESSONS.find(l => l.id === id);
    if (!lesson) return;
    this.currentLesson = lesson;

    // Highlight active in sidebar
    document.querySelectorAll('.lesson-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lesson === id);
    });

    // Render lesson content
    document.getElementById('lesson-content').innerHTML = lesson.theory;
    document.getElementById('lesson-title').textContent = lesson.title;

    // Render the right panel
    if (lesson.isCodeLesson) {
      this._renderCodePanel(lesson);
    } else if (lesson.isERDLesson) {
      this._renderERDPanel(lesson);
    } else {
      this._renderSQLPanel(lesson);
    }

    // Scroll theory to top
    document.getElementById('theory-panel').scrollTop = 0;
  }

  _renderSQLPanel(lesson) {
    const panel = document.getElementById('right-panel');
    panel.innerHTML = `
      <div class="sql-editor-container">
        <div class="editor-header">
          <span class="editor-label">SQL Query Editor</span>
          <div class="editor-actions">
            <button class="btn-reset" onclick="app.resetDB()" title="Reset database to defaults">↺ Reset DB</button>
            <button class="btn-run" onclick="app.runQuery()">▶ Run Query</button>
          </div>
        </div>
        <textarea id="sql-editor" class="sql-editor" spellcheck="false">${lesson.defaultQuery}</textarea>
        <div class="hint-bar">💡 ${lesson.hint}</div>
      </div>

      <div id="query-result" class="result-area">
        <div class="result-placeholder">
          <div class="placeholder-icon">▶</div>
          <p>Run a query to see results here</p>
        </div>
      </div>

      ${lesson.tasks ? `
        <div class="tasks-section">
          <div class="tasks-title">📌 Quick Tasks</div>
          <div class="tasks-list">
            ${lesson.tasks.map(t => `
              <button class="task-btn" onclick="app.loadTask(${JSON.stringify(t.query).replace(/'/g, '&#39;')})">
                ${t.label}
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="complete-section">
        <button class="btn-complete ${this.completedLessons.has(lesson.id) ? 'done' : ''}" 
                onclick="app.markComplete()">
          ${this.completedLessons.has(lesson.id) ? '✓ Completed!' : '✔ Mark as Complete'}
        </button>
      </div>
    `;

    // Enable tab key in textarea
    const textarea = document.getElementById('sql-editor');
    textarea.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = textarea.selectionStart;
        const v = textarea.value;
        textarea.value = v.substring(0, s) + '  ' + v.substring(textarea.selectionEnd);
        textarea.selectionStart = textarea.selectionEnd = s + 2;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        this.runQuery();
      }
    });
  }

  _renderCodePanel(lesson) {
    const panel = document.getElementById('right-panel');
    const langLabel = { php: 'PHP', javascript: 'JavaScript', python: 'Python' }[lesson.language] || lesson.language;
    const langClass = lesson.language;

    const explainHTML = lesson.explainPoints ? `
      <div class="explain-section">
        <div class="explain-title">🔍 Code Breakdown</div>
        ${lesson.explainPoints.map(p => `
          <div class="explain-item">
            <code class="explain-code">${p.line}</code>
            <span class="explain-text">${p.text}</span>
          </div>
        `).join('')}
      </div>
    ` : '';

    panel.innerHTML = `
      <div class="code-panel">
        <div class="code-header">
          <span class="lang-badge lang-${langClass}">${langLabel}</span>
          <span class="code-title">${lesson.title}</span>
          <button class="btn-copy" onclick="app.copyCode()">⎘ Copy</button>
        </div>
        <pre id="code-display" class="code-display language-${langClass}"><code>${this._escapeHTML(lesson.codeExample)}</code></pre>
      </div>
      ${explainHTML}
      <div class="complete-section">
        <button class="btn-complete ${this.completedLessons.has(lesson.id) ? 'done' : ''}" 
                onclick="app.markComplete()">
          ${this.completedLessons.has(lesson.id) ? '✓ Completed!' : '✔ Mark as Complete'}
        </button>
      </div>
    `;

    // Syntax highlight if Prism is available
    if (window.Prism) {
      Prism.highlightAllUnder(panel);
    }
  }


  _renderERDPanel(lesson) {
    const panel = document.getElementById('right-panel');
    panel.innerHTML = `
      <div class="erd-panel">
        <div class="code-header">
          <span class="lang-badge lang-erd">ERD</span>
          <span class="code-title">${lesson.title}</span>
        </div>
        <div id="erd-container">${lesson.erdHTML}</div>
      </div>
      <div class="complete-section">
        <button class="btn-complete ${this.completedLessons.has(lesson.id) ? 'done' : ''}" onclick="app.markComplete()">
          ${this.completedLessons.has(lesson.id) ? '✓ Completed!' : '✔ Mark as Complete'}
        </button>
      </div>
    `;
    if (lesson.erdInit) lesson.erdInit();
  }
  _escapeHTML(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  runQuery() {
    const sql = document.getElementById('sql-editor')?.value?.trim();
    if (!sql) return;

    const resultDiv = document.getElementById('query-result');
    const { success, results, error } = this.engine.exec(sql);

    if (!success) {
      resultDiv.innerHTML = `
        <div class="result-error">
          <div class="error-label">❌ Error</div>
          <pre class="error-message">${this._escapeHTML(error)}</pre>
        </div>`;
      return;
    }

    if (!results || results.length === 0) {
      resultDiv.innerHTML = `<div class="result-success">✓ Query executed successfully — no rows returned.</div>`;
      return;
    }

    let html = '';
    results.forEach(res => {
      const totalRows = res.values.length;
      html += `
        <div class="result-meta">${totalRows} row${totalRows !== 1 ? 's' : ''} returned</div>
        <div class="table-scroll">
          <table class="result-table">
            <thead><tr>${res.columns.map(c => `<th>${c}</th>`).join('')}</tr></thead>
            <tbody>
              ${res.values.map(row => `
                <tr>${row.map(v => `<td>${v === null ? '<span class="null-val">NULL</span>' : this._escapeHTML(String(v))}</td>`).join('')}</tr>
              `).join('')}
            </tbody>
          </table>
        </div>`;
    });

    resultDiv.innerHTML = html;
  }

  loadTask(query) {
    const editor = document.getElementById('sql-editor');
    if (editor) {
      editor.value = query;
      editor.focus();
    }
  }

  resetDB() {
    if (confirm('Reset the database to its default state? All your changes will be lost.')) {
      this.engine._seedDatabase();
      document.getElementById('query-result').innerHTML = `
        <div class="result-success">✓ Database reset to defaults.</div>`;
    }
  }

  copyCode() {
    const code = document.getElementById('code-display')?.textContent;
    if (code) {
      navigator.clipboard.writeText(code);
      const btn = document.querySelector('.btn-copy');
      if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => btn.textContent = '⎘ Copy', 2000); }
    }
  }

  markComplete() {
    if (!this.currentLesson) return;
    this.completedLessons.add(this.currentLesson.id);
    this._saveProgress();
    this._buildSidebar();

    const btn = document.querySelector('.btn-complete');
    if (btn) {
      btn.textContent = '✓ Completed!';
      btn.classList.add('done');
    }

    // Auto-advance to next lesson
    const idx  = LESSONS.findIndex(l => l.id === this.currentLesson.id);
    const next = LESSONS[idx + 1];
    if (next) {
      setTimeout(() => {
        if (confirm(`Great job! Move to next lesson: "${next.title}"?`)) {
          this.loadLesson(next.id);
        }
      }, 400);
    }
  }

  _setupEventListeners() {
    // Mobile sidebar toggle
    document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
    });
  }
}

// Boot the app
const app = new TutorialApp();
document.addEventListener('DOMContentLoaded', () => app.init());
