export interface ProgressData {
  id: number;
  webinarsCompleted: number;
  totalWebinars: number;
  keysCollected: number;
  totalKeys: number;
  progress: number;
  lastActivity: string;
  completedWebinarIds: Array<string>;
  pendingTasks: number;
  percentileRanking: number;
}
