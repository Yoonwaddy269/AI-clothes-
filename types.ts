
export enum Step {
  LANDING = 0,
  UPLOAD = 1,
  MODEL_SELECT = 2,
  PROCESSING = 3,
  RESULTS = 4,
  ADMIN = 5
}

export type AgeCategory = 'Adult' | 'Youth' | 'Kids';
export type Gender = 'Male' | 'Female' | 'Neutral';

export interface Model {
  id: string;
  name: string;
  ageCategory: AgeCategory;
  gender: Gender;
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

export type PoseType = 'Standing' | 'Walking' | 'Sitting' | 'Playful';
export type BackgroundType = 'white' | 'gray' | 'gradient' | 'warm';
