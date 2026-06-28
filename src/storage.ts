import { initialTopics } from "./data";
import type { StoredLearningState, Task, Topic } from "./types";

const STORAGE_KEY = "it-learning-dashboard-state-v1";

const createInitialState = (): StoredLearningState => ({
  topics: initialTopics,
  tasks: Object.fromEntries(initialTopics.map((topic) => [topic.id, topic.tasks])),
  notes: Object.fromEntries(initialTopics.map((topic) => [topic.id, ""])),
  quizAnswers: Object.fromEntries(initialTopics.map((topic) => [topic.id, {}])),
  lastUpdated: new Date().toISOString(),
});

const hydrateTopics = (state: StoredLearningState): Topic[] =>
  initialTopics.map((topic) => {
    const storedTopic = state.topics.find((item) => item.id === topic.id);
    const storedTasks = state.tasks[topic.id] ?? storedTopic?.tasks ?? topic.tasks;

    return {
      ...topic,
      status: storedTopic?.status ?? topic.status,
      understanding: storedTopic?.understanding ?? topic.understanding,
      nextAction: storedTopic?.nextAction ?? topic.nextAction,
      tasks: mergeTasks(topic.tasks, storedTasks),
      lessons: topic.lessons,
      resources: topic.resources,
    };
  });

const mergeTasks = (baseTasks: Task[], storedTasks: Task[]): Task[] =>
  baseTasks.map((task) => {
    const storedTask = storedTasks.find((item) => item.id === task.id);
    return storedTask ? { ...task, done: storedTask.done } : task;
  });

export const loadLearningState = (): StoredLearningState => {
  if (typeof window === "undefined") {
    return createInitialState();
  }

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY);
    if (!rawState) {
      return createInitialState();
    }

    const parsedState = JSON.parse(rawState) as StoredLearningState;
    const topics = hydrateTopics(parsedState);

    return {
      topics,
      tasks: Object.fromEntries(topics.map((topic) => [topic.id, topic.tasks])),
      notes: {
        ...Object.fromEntries(initialTopics.map((topic) => [topic.id, ""])),
        ...(parsedState.notes ?? {}),
      },
      quizAnswers: {
        ...Object.fromEntries(initialTopics.map((topic) => [topic.id, {}])),
        ...(parsedState.quizAnswers ?? {}),
      },
      lastUpdated: parsedState.lastUpdated ?? new Date().toISOString(),
    };
  } catch {
    return createInitialState();
  }
};

export const saveLearningState = (state: StoredLearningState) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...state,
      tasks: Object.fromEntries(state.topics.map((topic) => [topic.id, topic.tasks])),
      lastUpdated: new Date().toISOString(),
    }),
  );
};

export const resetLearningState = (): StoredLearningState => {
  const state = createInitialState();
  saveLearningState(state);
  return state;
};
