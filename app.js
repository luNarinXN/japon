// JAPON Platform Core Logic & LocalStorage State Management
const STORAGE_KEY = "JAPON_MEXT_PROGRESS_V1";
const SCHEMA_VERSION = 1;

const defaultState = {
  version: SCHEMA_VERSION,
  completedLessons: [],
  inProgressLessons: [],
  testHistory: [],
  incorrectQuestions: [],
  vocabMastered: [],
  studyMinutes: 0,
  dailyGoalMinutes: 45,
  streak: 1,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  lastVisitedSection: "dashboard"
};

let appState = loadState();
let currentFlashcardIndex = 0;
let flashcardFlipped = false;
let activeExam = null;
let examTimerInterval = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed, version: SCHEMA_VERSION };
  } catch (e) {
    console.error("Failed to load state:", e);
    return { ...defaultState };
  }
}

function saveState() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    if (appState.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      appState.streak = (appState.lastActiveDate === yesterday) ? appState.streak + 1 : 1;
      appState.lastActiveDate = today;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    renderDashboard();
  } catch (e) {
    console.error("Failed to save state:", e);
  }
}

function getAllLessons() {
  const list = [];
  Object.entries(JAPON_DATA.subjects).forEach(([subjKey, subj]) => {
    subj.modules.forEach(mod => {
      mod.lessons.forEach(lesson => {
        list.push({ ...lesson, subjectKey: subjKey, subjectTitle: subj.title, moduleTitle: mod.title });
      });
    });
  });
  return list;
}

function navigateTo(sectionId) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  const target = document.getElementById(`view-${sectionId}`);
  const navBtn = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
  if (target) target.classList.add('active');
  if (navBtn) navBtn.classList.add('active');

  document.getElementById('page-title').textContent = navBtn ? navBtn.textContent.trim() : "Dashboard";
  appState.lastVisitedSection = sectionId;
  saveState();

  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('mobile-open');

  if (sectionId === 'dashboard') renderDashboard();
  else if (['english', 'mathematics', 'chemistry', 'physics'].includes(sectionId)) renderSubjectView(sectionId);
  else if (sectionId === 'japanese') renderJapaneseView();
  else if (sectionId === 'exam') renderExamCenter();
  else if (sectionId === 'settings') renderSettings();
}

function renderDashboard() {
  const allLessons = getAllLessons();
  const completedCount = appState.completedLessons.length;
  const totalCount = allLessons.length;
  const overallPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  document.getElementById('dash-overall-pct').textContent = `${overallPct}%`;
  document.getElementById('dash-completed-lessons').textContent = `${completedCount} / ${totalCount}`;
  document.getElementById('dash-study-time').textContent = `${appState.studyMinutes} min`;
  document.getElementById('dash-streak').textContent = `${appState.streak} day${appState.streak === 1 ? '' : 's'}`;
  document.getElementById('header-streak').textContent = `🔥 ${appState.streak} Day Streak`;

  // Daily goal progress
  const goalPct = Math.min(100, Math.round((appState.studyMinutes / (appState.dailyGoalMinutes || 45)) * 100));
  document.getElementById('dash-daily-goal-text').textContent = `${appState.studyMinutes} / ${appState.dailyGoalMinutes} min (${goalPct}%)`;
  document.getElementById('dash-daily-goal-bar').style.width = `${goalPct}%`;

  // Subject progress bars
  const subjContainer = document.getElementById('dash-subject-progress');
  subjContainer.innerHTML = '';
  Object.entries(JAPON_DATA.subjects).forEach(([key, subj]) => {
    const subjLessons = [];
    subj.modules.forEach(m => m.lessons.forEach(l => subjLessons.push(l)));
    const done = subjLessons.filter(l => appState.completedLessons.includes(l.id)).length;
    const pct = subjLessons.length > 0 ? Math.round((done / subjLessons.length) * 100) : 0;
    subjContainer.innerHTML += `
      <div style="margin-bottom: 1rem;">
        <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
          <span>${subj.title}</span>
          <span>${done}/${subjLessons.length} (${pct}%)</span>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
      </div>
    `;
  });

  // Recent test results
  const historyEl = document.getElementById('dash-recent-tests');
  if (appState.testHistory.length === 0) {
    historyEl.innerHTML = `<p style="color:var(--text-secondary);">No tests completed yet. Complete a lesson quiz or visit Exam Center. (Ще немає завершених тестів.)</p>`;
  } else {
    historyEl.innerHTML = appState.testHistory.slice(-5).reverse().map(t => `
      <div style="padding:0.65rem 0; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between;">
        <span>${t.title}</span>
        <strong style="color:${t.score >= 70 ? 'var(--success)' : 'var(--warning)'};">${t.score}%</strong>
      </div>
    `).join('');
  }

  // Weak topics & recommended revision
  const weakEl = document.getElementById('dash-weak-topics');
  if (appState.incorrectQuestions.length === 0) {
    weakEl.innerHTML = `<p style="color:var(--text-secondary);">No weak topics recorded yet. Keep practicing! (Слабких тем поки не виявлено.)</p>`;
  } else {
    const uniqueTopics = [...new Set(appState.incorrectQuestions.map(q => q.topic))];
    weakEl.innerHTML = uniqueTopics.map(topic => `
      <div style="padding:0.5rem 0; color:var(--warning);">• Review: ${topic}</div>
    `).join('');
  }
}

function renderSubjectView(subjectKey) {
  const subj = JAPON_DATA.subjects[subjectKey];
  const container = document.getElementById(`view-${subjectKey}`);
  let html = `
    <div class="panel">
      <h3>${subj.title}</h3>
      <p style="color:var(--text-secondary);">${subj.description}</p>
    </div>
  `;

  subj.modules.forEach(mod => {
    html += `<h3 style="margin: 1.5rem 0 0.75rem;">${mod.title}</h3><div class="cards-grid">`;
    mod.lessons.forEach((lesson, idx) => {
      const isCompleted = appState.completedLessons.includes(lesson.id);
      const prevLesson = idx > 0 ? mod.lessons[idx - 1] : null;
      const isLocked = prevLesson && !appState.completedLessons.includes(prevLesson.id) && !isCompleted;

      const statusBadge = isCompleted
        ? `<span class="badge badge-completed">Completed</span>`
        : isLocked
          ? `<span class="badge badge-locked">Locked (Complete previous)</span>`
          : `<span class="badge badge-available">Available</span>`;

      const mextBadge = lesson.mextConfirmed
        ? `<span class="badge badge-mext">MEXT Confirmed</span>`
        : `<span class="badge badge-locked">Foundation Prep</span>`;

      html += `
        <div class="card">
          <div>
            <div style="display:flex; justify-content:space-between; gap:0.5rem; margin-bottom:0.6rem; flex-wrap:wrap;">
              ${statusBadge}
              ${mextBadge}
            </div>
            <h4>${lesson.title}</h4>
            <p style="color:var(--text-secondary); font-size:0.88rem; margin-top:0.4rem;">${lesson.introduction}</p>
          </div>
          <button class="btn" ${isLocked ? 'disabled' : ''} onclick="openLessonModal('${subjectKey}', '${lesson.id}')">
            ${isCompleted ? 'Review Lesson' : isLocked ? 'Locked' : 'Start Lesson'}
          </button>
        </div>
      `;
    });
    html += `</div>`;
  });

  container.innerHTML = html;
}

function openLessonModal(subjectKey, lessonId) {
  const subj = JAPON_DATA.subjects[subjectKey];
  let targetLesson = null;
  subj.modules.forEach(m => {
    const found = m.lessons.find(l => l.id === lessonId);
    if (found) targetLesson = found;
  });
  if (!targetLesson) return;

  if (!appState.inProgressLessons.includes(lessonId)) {
    appState.inProgressLessons.push(lessonId);
  }
  appState.studyMinutes += 5;
  saveState();

  const modalBody = document.getElementById('lesson-modal-body');
  modalBody.innerHTML = `
    <h2>${targetLesson.title}</h2>
    <p style="color:var(--text-secondary); margin-bottom:1rem;">${subj.title}</p>

    <div class="lesson-section-block">
      <h4>1. Learning Objectives (Цілі навчання)</h4>
      <ul style="padding-left:1.2rem;">
        ${targetLesson.objectives.map(o => `<li style="margin-bottom:0.35rem;">${o}</li>`).join('')}
      </ul>
    </div>

    <div class="lesson-section-block">
      <h4>2. Introduction & Theory (Вступ та теорія)</h4>
      <p>${targetLesson.introduction}</p>
      <p style="margin-top:0.6rem;">${targetLesson.theory}</p>
    </div>

    <div class="lesson-section-block">
      <h4>3. Definitions (Визначення)</h4>
      ${targetLesson.definitions.map(d => `
        <div style="margin-bottom:0.75rem;">
          <strong>${d.term} — ${d.ua}:</strong> ${d.def}
          <div class="bilingual-ua">(${d.defUa})</div>
        </div>
      `).join('')}
    </div>

    ${targetLesson.formulas.length > 0 ? `
      <div class="lesson-section-block">
        <h4>4. Important Formulas & Variables (Формули та пояснення змінних)</h4>
        ${targetLesson.formulas.map(f => `
          <div class="formula-box">
            <div class="formula-math">${f.formula}</div>
            <div style="font-size:0.9rem; margin-bottom:0.5rem;">${f.desc}</div>
            <ul style="padding-left:1.2rem; font-size:0.88rem;">
              ${f.variables.map(v => `<li><strong>${v.symbol}</strong> — ${v.name} (${v.ua})</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <div class="lesson-section-block">
      <h4>5. Worked Examples & Step-by-Step Solutions (Приклади з покроковим розв'язанням)</h4>
      ${targetLesson.examples.map(ex => `
        <div style="margin-bottom:0.75rem;">
          <p><strong>Problem:</strong> ${ex.problem}</p>
          <p style="margin-top:0.3rem; color:#93c5fd;"><strong>Solution:</strong> ${ex.solution}</p>
          <div class="bilingual-ua">(${ex.ua})</div>
        </div>
      `).join('')}
    </div>

    <div class="lesson-section-block">
      <h4>6. Common Mistakes & Practice (Типові помилки та практика)</h4>
      <ul style="padding-left:1.2rem; margin-bottom:0.6rem;">
        ${targetLesson.commonMistakes.map(m => `<li style="color:#fca5a5;">${m}</li>`).join('')}
      </ul>
      <p><strong>Practice:</strong> ${targetLesson.practice.join(' ')}</p>
    </div>

    <div class="lesson-section-block">
      <h4>7. Topic Quiz (Тест за темою)</h4>
      <div id="lesson-quiz-container">
        ${targetLesson.quiz.map((q, qIdx) => `
          <div style="margin-bottom:1.2rem;" data-qidx="${qIdx}">
            <p style="font-weight:600; margin-bottom:0.5rem;">${qIdx + 1}. ${q.question}</p>
            ${q.options.map((opt, oIdx) => `
              <button class="quiz-option" onclick="selectLessonOption(this, ${qIdx}, ${oIdx})">${opt}</button>
            `).join('')}
            <div class="quiz-feedback" id="q-feedback-${qIdx}" style="margin-top:0.5rem; font-size:0.9rem;"></div>
          </div>
        `).join('')}
        <button class="btn btn-success" onclick="submitLessonQuiz('${subjectKey}', '${targetLesson.id}')">Submit Quiz & Complete Lesson</button>
      </div>
    </div>
  `;

  window._currentLessonQuiz = targetLesson;
  window._selectedAnswers = {};
  document.getElementById('lesson-modal').classList.add('active');
}

function selectLessonOption(btn, qIdx, oIdx) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  window._selectedAnswers[qIdx] = oIdx;
}

function submitLessonQuiz(subjectKey, lessonId) {
  const lesson = window._currentLessonQuiz;
  if (!lesson) return;
  let correctCount = 0;

  lesson.quiz.forEach((q, idx) => {
    const chosen = window._selectedAnswers[idx];
    const fb = document.getElementById(`q-feedback-${idx}`);
    if (chosen === q.correct) {
      correctCount++;
      fb.innerHTML = `<span style="color:var(--success);">✓ Correct! ${q.explanation}</span>`;
    } else {
      fb.innerHTML = `<span style="color:var(--danger);">✗ Incorrect. ${q.explanation}</span>`;
      appState.incorrectQuestions.push({
        id: q.id,
        topic: lesson.title,
        question: q.question,
        explanation: q.explanation
      });
    }
  });

  const scorePct = Math.round((correctCount / lesson.quiz.length) * 100);
  if (!appState.completedLessons.includes(lessonId)) {
    appState.completedLessons.push(lessonId);
  }
  appState.studyMinutes += 10;
  appState.testHistory.push({
    title: `Topic Quiz: ${lesson.title}`,
    score: scorePct,
    date: new Date().toISOString().slice(0, 10)
  });

  saveState();
  renderSubjectView(subjectKey);
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// Japanese Module
function renderJapaneseView() {
  const container = document.getElementById('view-japanese');
  const vocab = JAPON_DATA.vocabularyDatabase;
  const word = vocab[currentFlashcardIndex % vocab.length];

  container.innerHTML = `
    <div class="panel">
      <h3>Japanese Language & MEXT Vocabulary Module</h3>
      <p style="color:var(--text-secondary);">Interactive flashcards, Hiragana/Katakana charts, JLPT vocabulary, and MEXT Kanji lessons.</p>
    </div>

    <div class="cards-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
      <div class="panel">
        <h3>Interactive Flashcards (${currentFlashcardIndex + 1} / ${vocab.length})</h3>
        <div class="flashcard" onclick="flipFlashcard()">
          <div class="jp-word">${word.japanese}</div>
          <div class="jp-reading">${word.reading} • <span class="badge badge-available">${word.jlpt}</span></div>
          ${flashcardFlipped ? `
            <div class="jp-meaning">${word.english} — ${word.ua}</div>
            <div style="margin-top:0.75rem; font-size:0.9rem; color:var(--text-secondary);">
              ${word.example}<br>(${word.exampleUa})
            </div>
          ` : `<div style="margin-top:1rem; color:var(--text-secondary); font-size:0.85rem;">Click card to reveal meaning (Натисніть, щоб побачити переклад)</div>`}
        </div>
        <div style="display:flex; gap:0.75rem; margin-top:1rem; justify-content:center;">
          <button class="btn btn-secondary" onclick="prevFlashcard()">← Previous</button>
          <button class="btn" onclick="flipFlashcard()">Flip Card</button>
          <button class="btn btn-secondary" onclick="nextFlashcard()">Next →</button>
        </div>
      </div>

      <div class="panel">
        <h3>Kana Quick Reference (Hiragana & Katakana)</h3>
        <div style="margin-bottom:0.75rem;">
          <strong>Hiragana:</strong>
          <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:0.4rem; margin-top:0.4rem;">
            ${JAPON_DATA.kanaCharts.hiragana.map(k => `
              <div style="background:var(--bg-card); padding:0.4rem; text-align:center; border-radius:6px; border:1px solid var(--border-color);">
                <div style="font-size:1.1rem; font-weight:700;">${k.char}</div>
                <div style="font-size:0.75rem; color:var(--text-secondary);">${k.romaji}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <h3>Vocabulary Database & Lessons</h3>
      <div style="margin-bottom:1rem;">
        <button class="btn" onclick="openLessonModal('japanese', 'jp_1')">Open Japanese Writing & Kanji Lesson</button>
      </div>
      <div class="cards-grid">
        ${vocab.map(v => `
          <div class="card" style="padding:1rem;">
            <div>
              <div style="display:flex; justify-content:space-between;">
                <strong style="font-size:1.25rem;">${v.japanese}</strong>
                <span class="badge badge-available">${v.jlpt} • ${v.category}</span>
              </div>
              <div style="color:var(--accent-primary); font-size:0.9rem;">${v.reading}</div>
              <div style="margin-top:0.4rem;"><strong>${v.english}</strong> — ${v.ua}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function flipFlashcard() {
  flashcardFlipped = !flashcardFlipped;
  renderJapaneseView();
}

function nextFlashcard() {
  currentFlashcardIndex = (currentFlashcardIndex + 1) % JAPON_DATA.vocabularyDatabase.length;
  flashcardFlipped = false;
  renderJapaneseView();
}

function prevFlashcard() {
  currentFlashcardIndex = (currentFlashcardIndex - 1 + JAPON_DATA.vocabularyDatabase.length) % JAPON_DATA.vocabularyDatabase.length;
  flashcardFlipped = false;
  renderJapaneseView();
}

// Exam Center (Cumulative Rule Enforced)
function renderExamCenter() {
  const container = document.getElementById('view-exam');
  const allLessons = getAllLessons();
  const completedLessons = allLessons.filter(l => appState.completedLessons.includes(l.id));

  container.innerHTML = `
    <div class="panel">
      <h3>MEXT Exam Center — Cumulative Testing System</h3>
      <p style="color:var(--text-secondary);">
        Cumulative Rule: Exams only include questions from topics you have already completed.
        (Правило накопичувального іспиту: тести містять питання лише з тих тем, які ви вже завершили.)
      </p>
      <p style="margin-top:0.5rem;"><strong>Eligible Completed Topics:</strong> ${completedLessons.length} / ${allLessons.length}</p>
    </div>

    <div class="cards-grid">
      <div class="card">
        <div>
          <span class="badge badge-available">Cumulative</span>
          <h4 style="margin-top:0.5rem;">Monthly Cumulative Exam</h4>
          <p style="color:var(--text-secondary); font-size:0.88rem; margin-top:0.4rem;">
            Tests all questions across your ${completedLessons.length} completed lessons with a countdown timer.
          </p>
        </div>
        <button class="btn" ${completedLessons.length === 0 ? 'disabled' : ''} onclick="startCumulativeExam('Cumulative Exam')">
          ${completedLessons.length === 0 ? 'Complete at least 1 lesson first' : 'Start Cumulative Exam'}
        </button>
      </div>

      <div class="card">
        <div>
          <span class="badge badge-mext">MEXT Simulation</span>
          <h4 style="margin-top:0.5rem;">MEXT Natural Sciences A Practice</h4>
          <p style="color:var(--text-secondary); font-size:0.88rem; margin-top:0.4rem;">
            Simulated MEXT examination drawn strictly from your unlocked & completed syllabus topics.
          </p>
        </div>
        <button class="btn" ${completedLessons.length === 0 ? 'disabled' : ''} onclick="startCumulativeExam('MEXT Practice Exam')">
          ${completedLessons.length === 0 ? 'Complete at least 1 lesson first' : 'Start MEXT Practice'}
        </button>
      </div>
    </div>

    <div id="active-exam-area" style="margin-top:1.5rem;"></div>
  `;
}

function startCumulativeExam(examTitle) {
  const allLessons = getAllLessons();
  const completedLessons = allLessons.filter(l => appState.completedLessons.includes(l.id));
  const pool = [];

  completedLessons.forEach(lesson => {
    lesson.quiz.forEach(q => {
      pool.push({ ...q, topic: lesson.title, subject: lesson.subjectTitle });
    });
  });

  if (pool.length === 0) return;

  activeExam = {
    title: examTitle,
    questions: pool,
    answers: {},
    secondsLeft: pool.length * 60
  };

  if (examTimerInterval) clearInterval(examTimerInterval);
  renderActiveExam();

  examTimerInterval = setInterval(() => {
    if (!activeExam) return;
    activeExam.secondsLeft--;
    const timerEl = document.getElementById('exam-timer');
    if (timerEl) {
      const m = Math.floor(activeExam.secondsLeft / 60);
      const s = activeExam.secondsLeft % 60;
      timerEl.textContent = `⏱ ${m}:${s < 10 ? '0' : ''}${s}`;
    }
    if (activeExam.secondsLeft <= 0) {
      submitCumulativeExam();
    }
  }, 1000);
}

function renderActiveExam() {
  const area = document.getElementById('active-exam-area');
  if (!activeExam || !area) return;

  area.innerHTML = `
    <div class="panel">
      <h3>
        <span>${activeExam.title} (${activeExam.questions.length} Questions)</span>
        <span id="exam-timer" style="color:var(--warning);">⏱ ${Math.floor(activeExam.secondsLeft / 60)}:00</span>
      </h3>
      ${activeExam.questions.map((q, idx) => `
        <div class="lesson-section-block">
          <div style="font-size:0.8rem; color:var(--accent-primary); margin-bottom:0.3rem;">${q.subject} • ${q.topic}</div>
          <p style="font-weight:600; margin-bottom:0.6rem;">${idx + 1}. ${q.question}</p>
          ${q.options.map((opt, oIdx) => `
            <button class="quiz-option ${activeExam.answers[idx] === oIdx ? 'selected' : ''}"
              onclick="selectExamOption(${idx}, ${oIdx})">${opt}</button>
          `).join('')}
        </div>
      `).join('')}
      <button class="btn btn-success" onclick="submitCumulativeExam()">Finish & Grade Exam</button>
    </div>
  `;
}

function selectExamOption(qIdx, oIdx) {
  if (!activeExam) return;
  activeExam.answers[qIdx] = oIdx;
  renderActiveExam();
}

function submitCumulativeExam() {
  if (!activeExam) return;
  if (examTimerInterval) clearInterval(examTimerInterval);

  let correct = 0;
  const resultsHtml = activeExam.questions.map((q, idx) => {
    const chosen = activeExam.answers[idx];
    const isRight = chosen === q.correct;
    if (isRight) correct++;
    else {
      appState.incorrectQuestions.push({
        id: q.id,
        topic: q.topic,
        question: q.question,
        explanation: q.explanation
      });
    }
    return `
      <div class="lesson-section-block" style="border-left: 4px solid ${isRight ? 'var(--success)' : 'var(--danger)'};">
        <p><strong>${idx + 1}. ${q.question}</strong></p>
        <p style="margin-top:0.3rem; color:${isRight ? 'var(--success)' : 'var(--danger)'};">
          ${isRight ? '✓ Correct' : `✗ Your answer: ${chosen !== undefined ? q.options[chosen] : 'None'} | Correct: ${q.options[q.correct]}`}
        </p>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:0.3rem;">${q.explanation}</p>
      </div>
    `;
  }).join('');

  const score = Math.round((correct / activeExam.questions.length) * 100);
  appState.testHistory.push({
    title: activeExam.title,
    score: score,
    date: new Date().toISOString().slice(0, 10)
  });
  appState.studyMinutes += 15;
  saveState();

  const area = document.getElementById('active-exam-area');
  area.innerHTML = `
    <div class="panel">
      <h3>Exam Results: ${score}% (${correct} / ${activeExam.questions.length})</h3>
      ${resultsHtml}
    </div>
  `;
  activeExam = null;
}

// Settings & JSON Export/Import
function renderSettings() {
  const container = document.getElementById('view-settings');
  container.innerHTML = `
    <div class="panel">
      <h3>Study Goals & Progress Management</h3>
      <div style="margin-bottom:1.5rem;">
        <label style="display:block; margin-bottom:0.4rem;">Daily Study Goal (minutes):</label>
        <div style="display:flex; gap:0.6rem;">
          <input type="number" id="goal-input" value="${appState.dailyGoalMinutes}" min="10" max="600"
            style="padding:0.5rem; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); color:white; width:120px;">
          <button class="btn" onclick="updateDailyGoal()">Save Goal</button>
        </div>
      </div>

      <h3 style="margin-top:1.5rem;">Backup & Restore (JSON Export / Import)</h3>
      <p style="color:var(--text-secondary); margin-bottom:1rem;">
        Export your progress to a JSON file or restore from a previous backup. Schema Version: v${SCHEMA_VERSION}.
      </p>
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <button class="btn" onclick="exportProgressJSON()">⬇ Export Progress JSON</button>
        <label class="btn btn-secondary" style="cursor:pointer;">
          ⬆ Import Progress JSON
          <input type="file" accept=".json" style="display:none;" onchange="importProgressJSON(event)">
        </label>
        <button class="btn btn-danger" onclick="resetProgress()">Reset All Progress</button>
      </div>
    </div>
  `;
}

function updateDailyGoal() {
  const val = parseInt(document.getElementById('goal-input').value, 10);
  if (val && val >= 5) {
    appState.dailyGoalMinutes = val;
    saveState();
    alert("Daily goal updated!");
  }
}

function exportProgressJSON() {
  const blob = new Blob([JSON.stringify(appState, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `japon-mext-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importProgressJSON(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      appState = { ...defaultState, ...imported, version: SCHEMA_VERSION };
      saveState();
      alert("Progress restored successfully!");
      renderSettings();
    } catch (err) {
      alert("Invalid JSON backup file.");
    }
  };
  reader.readAsText(file);
}

function resetProgress() {
  if (confirm("Are you sure you want to reset all saved progress?")) {
    appState = { ...defaultState };
    saveState();
    renderSettings();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  navigateTo(appState.lastVisitedSection || 'dashboard');
});
