export type TopicStatus = "未着手" | "学習中" | "復習中" | "実務演習";

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export type Topic = {
  id: string;
  title: string;
  category: string;
  status: TopicStatus;
  understanding: number;
  nextAction: string;
  careerValue: string;
  accent: string;
  tasks: Task[];
};

export type StoredLearningState = {
  topics: Topic[];
  tasks: Record<string, Task[]>;
  notes: Record<string, string>;
  lastUpdated: string;
};
