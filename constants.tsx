
import { Model } from './types';

export const MODELS: Model[] = [
  // Adults
  {
    id: 'emma',
    name: 'Emma',
    ageCategory: 'Adult',
    gender: 'Female',
    emoji: '👩‍🦰',
    gradient: 'from-amber-100 to-orange-100',
    description: 'Casual lifestyle adult model.'
  },
  {
    id: 'maya',
    name: 'Maya',
    ageCategory: 'Adult',
    gender: 'Female',
    emoji: '👩🏽',
    gradient: 'from-rose-100 to-pink-100',
    description: 'Elegant formal adult model.'
  },
  {
    id: 'alex',
    name: 'Alex',
    ageCategory: 'Adult',
    gender: 'Male',
    emoji: '👨',
    gradient: 'from-blue-100 to-indigo-100',
    description: 'Modern urban adult model.'
  },
  {
    id: 'jordan',
    name: 'Jordan',
    ageCategory: 'Adult',
    gender: 'Male',
    emoji: '👨🏿',
    gradient: 'from-emerald-100 to-teal-100',
    description: 'Athletic build adult model.'
  },
  {
    id: 'arthur',
    name: 'Arthur',
    ageCategory: 'Adult',
    gender: 'Male',
    emoji: '👴',
    gradient: 'from-slate-100 to-gray-200',
    description: 'Sophisticated senior adult model.'
  },
  {
    id: 'martha',
    name: 'Martha',
    ageCategory: 'Adult',
    gender: 'Female',
    emoji: '👵',
    gradient: 'from-stone-100 to-amber-50',
    description: 'Timeless senior adult model.'
  },
  // Youth (Teenagers)
  {
    id: 'chloe',
    name: 'Chloe',
    ageCategory: 'Youth',
    gender: 'Female',
    emoji: '👱‍♀️',
    gradient: 'from-purple-100 to-indigo-100',
    description: 'Teen fashion model.'
  },
  {
    id: 'kai',
    name: 'Kai',
    ageCategory: 'Youth',
    gender: 'Male',
    emoji: '👦🏻',
    gradient: 'from-blue-50 to-sky-100',
    description: 'Young male urban model.'
  },
  {
    id: 'skyler',
    name: 'Skyler',
    ageCategory: 'Youth',
    gender: 'Neutral',
    emoji: '🧑',
    gradient: 'from-gray-100 to-slate-200',
    description: 'Androgynous youth model.'
  },
  // Kids
  {
    id: 'leo',
    name: 'Leo',
    ageCategory: 'Kids',
    gender: 'Male',
    emoji: '👦',
    gradient: 'from-sky-100 to-cyan-100',
    description: 'Playful boy child model.'
  },
  {
    id: 'lily',
    name: 'Lily',
    ageCategory: 'Kids',
    gender: 'Female',
    emoji: '👧',
    gradient: 'from-pink-50 to-rose-100',
    description: 'Cheerful girl child model.'
  },
  {
    id: 'toby',
    name: 'Toby',
    ageCategory: 'Kids',
    gender: 'Neutral',
    emoji: '👶',
    gradient: 'from-amber-50 to-yellow-100',
    description: 'Young kid model for unisex wear.'
  }
];

export const APP_NAME = "VogueAI";
