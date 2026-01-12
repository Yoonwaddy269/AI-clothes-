
export enum Step {
  LANDING = 0,
  UPLOAD = 1,
  MODEL_SELECT = 2,
  PROCESSING = 3,
  RESULTS = 4,
  ADMIN = 5
}

export interface Model {
  id: string;
  name: string;
  category: string;
  emoji: string;
  gradient: string;
  description: string;
}

export interface UploadedImage {
  id: string;
  name: string;
  size: string;
  dataUrl: string;
  date: string;
}

export interface HistoryItem {
  id: string;
  originalImage: string;
  resultImage: string;
  modelName: string;
  date: string;
  status: 'completed' | 'processing' | 'failed';
}

export type PoseType = 'Standing' | 'Walking' | 'Sitting';
export type BackgroundType = 'white' | 'gray' | 'gradient' | 'warm';
