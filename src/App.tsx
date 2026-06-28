import { useEffect, useMemo, useState } from "react";
import {
  BookOpenCheck,
  CalendarCheck,
  Check,
  ChevronRight,
  Gauge,
  GraduationCap,
  ListTodo,
  RotateCcw,
  Search,
  Star,
  Target,
} from "lucide-react";
import { loadLearningState, resetLearningState, saveLearningState } from "./storage";
import type { StoredLearningState, Topic, TopicStatus } from "./types";

const statuses: TopicStatus[] = ["未着手", "学習中", "復習中", "実務演習"];

const getProgress = (topic: Topic) => {
  const completed = topic.tasks.filter((task) => task.done).length;
  return Math.round((completed / topic.tasks.length) * 100);
};

const getPriorityTopic = (topics: Topic[]) =>
  [...topics].sort((a, b) => {
    const progressDiff = getProgress(a) - getProgress(b);
    if (progressDiff !== 0) return progressDiff;
    return a.understanding - b.understanding;
  })[0];

function App() {
  const [state, setState] = useState<StoredLearningState>(() => loadLearningState());
  const [selectedTopicId, setSelectedTopicId] = useState(state.topics[0]?.id ?? "");
  const [query, setQuery] = useState("");

  useEffect(() => {
    saveLearningState(state);
  }, [state]);

  const selectedTopic = state.topics.find((topic) => topic.id === selectedTopicId) ?? state.topics[0];

  const filteredTopics = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return state.topics;

    return state.topics.filter((topic) =>
      [topic.title, topic.category, topic.careerValue].some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [query, state.topics]);

  const stats = useMemo(() => {
    const totalTasks = state.topics.flatMap((topic) => topic.tasks).length;
    const doneTasks = state.topics.flatMap((topic) => topic.tasks).filter((task) => task.done).length;
    const averageProgress = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);
    const averageUnderstanding =
      state.topics.length === 0
        ? 0
        : Number((state.topics.reduce((sum, topic) => sum + topic.understanding, 0) / state.topics.length).toFixed(1));
    const activeCount = state.topics.filter((topic) => topic.status !== "未着手").length;
    const priorityTopic = getPriorityTopic(state.topics);

    return { averageProgress, averageUnderstanding, activeCount, priorityTopic };
  }, [state.topics]);

  const updateTopic = (topicId: string, updater: (topic: Topic) => Topic) => {
    setState((current) => {
      const topics = current.topics.map((topic) => (topic.id === topicId ? updater(topic) : topic));
      return {
        ...current,
        topics,
        tasks: Object.fromEntries(topics.map((topic) => [topic.id, topic.tasks])),
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const toggleTask = (topicId: string, taskId: string) => {
    updateTopic(topicId, (topic) => ({
      ...topic,
      status: topic.status === "未着手" ? "学習中" : topic.status,
      tasks: topic.tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)),
    }));
  };

  const updateNote = (topicId: string, note: string) => {
    setState((current) => ({
      ...current,
      notes: { ...current.notes, [topicId]: note },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleReset = () => {
    const nextState = resetLearningState();
    setState(nextState);
    setSelectedTopicId(nextState.topics[0]?.id ?? "");
    setQuery("");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="学習テーマ">
        <div className="brand">
          <div className="brand-mark">
            <GraduationCap size={24} aria-hidden="true" />
          </div>
          <div>
            <p>Career IT Lab</p>
            <span>転職・資格学習ダッシュボード</span>
          </div>
        </div>

        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="テーマを検索"
            type="search"
          />
        </label>

        <nav className="topic-nav">
          {filteredTopics.map((topic) => (
            <button
              className={`topic-nav-item ${topic.id === selectedTopic.id ? "is-active" : ""}`}
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              type="button"
            >
              <span className="topic-dot" style={{ backgroundColor: topic.accent }} />
              <span>
                <strong>{topic.title}</strong>
                <small>{getProgress(topic)}% / 理解度 {topic.understanding}</small>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          ))}
        </nav>

        <button className="reset-button" onClick={handleReset} type="button">
          <RotateCcw size={16} aria-hidden="true" />
          初期状態に戻す
        </button>
      </aside>

      <main className="dashboard">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Learning Progress</p>
            <h1>ITスキルの現在地を見える化する</h1>
          </div>
          <div className="updated-at">最終更新 {new Date(state.lastUpdated).toLocaleString("ja-JP")}</div>
        </header>

        <section className="stats-grid" aria-label="学習サマリー">
          <StatCard icon={<Gauge size={20} />} label="全体進捗" value={`${stats.averageProgress}%`} />
          <StatCard icon={<Star size={20} />} label="平均理解度" value={`${stats.averageUnderstanding} / 5`} />
          <StatCard icon={<CalendarCheck size={20} />} label="今週の学習テーマ" value={`${stats.activeCount}件`} />
          <StatCard icon={<Target size={20} />} label="重点テーマ" value={stats.priorityTopic.title} compact />
        </section>

        <section className="content-grid">
          <div className="topic-board" aria-label="テーマ一覧">
            {filteredTopics.map((topic) => (
              <article
                className={`topic-card ${topic.id === selectedTopic.id ? "is-selected" : ""}`}
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
              >
                <div className="card-topline">
                  <span className="category-pill" style={{ borderColor: topic.accent, color: topic.accent }}>
                    {topic.category}
                  </span>
                  <span className="status-label">{topic.status}</span>
                </div>
                <h2>{topic.title}</h2>
                <ProgressBar accent={topic.accent} progress={getProgress(topic)} />
                <div className="card-metrics">
                  <span>進捗 {getProgress(topic)}%</span>
                  <span>理解度 {topic.understanding}/5</span>
                </div>
                <p className="next-action">{topic.nextAction}</p>
                <p className="career-value">{topic.careerValue}</p>
              </article>
            ))}
          </div>

          <TopicDetail
            note={state.notes[selectedTopic.id] ?? ""}
            onNoteChange={(note) => updateNote(selectedTopic.id, note)}
            onStatusChange={(status) => updateTopic(selectedTopic.id, (topic) => ({ ...topic, status }))}
            onToggleTask={(taskId) => toggleTask(selectedTopic.id, taskId)}
            onUnderstandingChange={(understanding) =>
              updateTopic(selectedTopic.id, (topic) => ({ ...topic, understanding }))
            }
            topic={selectedTopic}
          />
        </section>
      </main>
    </div>
  );
}

type StatCardProps = {
  compact?: boolean;
  icon: React.ReactNode;
  label: string;
  value: string;
};

function StatCard({ compact = false, icon, label, value }: StatCardProps) {
  return (
    <article className={`stat-card ${compact ? "is-compact" : ""}`}>
      <div className="stat-icon">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

type ProgressBarProps = {
  accent: string;
  progress: number;
};

function ProgressBar({ accent, progress }: ProgressBarProps) {
  return (
    <div className="progress-track" aria-label={`進捗 ${progress}%`}>
      <div className="progress-fill" style={{ backgroundColor: accent, width: `${progress}%` }} />
    </div>
  );
}

type TopicDetailProps = {
  note: string;
  onNoteChange: (note: string) => void;
  onStatusChange: (status: TopicStatus) => void;
  onToggleTask: (taskId: string) => void;
  onUnderstandingChange: (understanding: number) => void;
  topic: Topic;
};

function TopicDetail({
  note,
  onNoteChange,
  onStatusChange,
  onToggleTask,
  onUnderstandingChange,
  topic,
}: TopicDetailProps) {
  const progress = getProgress(topic);

  return (
    <aside className="detail-panel" aria-label="テーマ詳細">
      <div className="detail-header">
        <span className="category-pill" style={{ borderColor: topic.accent, color: topic.accent }}>
          {topic.category}
        </span>
        <h2>{topic.title}</h2>
        <ProgressBar accent={topic.accent} progress={progress} />
        <p>{progress}% 完了</p>
      </div>

      <section className="control-section">
        <div className="section-title">
          <BookOpenCheck size={18} aria-hidden="true" />
          <h3>理解度</h3>
        </div>
        <div className="rating-row" role="radiogroup" aria-label="理解度">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              aria-checked={topic.understanding === level}
              className={topic.understanding >= level ? "rating-button is-on" : "rating-button"}
              key={level}
              onClick={() => onUnderstandingChange(level)}
              role="radio"
              type="button"
            >
              {level}
            </button>
          ))}
        </div>
      </section>

      <section className="control-section">
        <div className="section-title">
          <Target size={18} aria-hidden="true" />
          <h3>学習ステータス</h3>
        </div>
        <div className="status-grid">
          {statuses.map((status) => (
            <button
              className={topic.status === status ? "status-button is-selected" : "status-button"}
              key={status}
              onClick={() => onStatusChange(status)}
              type="button"
            >
              {status}
            </button>
          ))}
        </div>
      </section>

      <section className="control-section">
        <div className="section-title">
          <ListTodo size={18} aria-hidden="true" />
          <h3>小トピック</h3>
        </div>
        <div className="task-list">
          {topic.tasks.map((task) => (
            <label className="task-item" key={task.id}>
              <input checked={task.done} onChange={() => onToggleTask(task.id)} type="checkbox" />
              <span className="checkbox-face">
                {task.done ? <Check size={14} aria-hidden="true" /> : null}
              </span>
              <span>{task.title}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="control-section">
        <div className="section-title">
          <BookOpenCheck size={18} aria-hidden="true" />
          <h3>学習メモ</h3>
        </div>
        <textarea
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder="理解したこと、面接で話せそうな経験、次に調べることを書く"
          value={note}
        />
      </section>
    </aside>
  );
}

export default App;
