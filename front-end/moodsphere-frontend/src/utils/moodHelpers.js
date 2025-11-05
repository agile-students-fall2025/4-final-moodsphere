// src/utils/moodHelpers.js
export const moodMap = {
  'Happy': '😊',
  'Excited': '🤩',
  'Calm': '😌',
  'Sad': '😢',
  'Anxious': '😰',
  'Angry': '😠',
  'Tired': '😴',
  'Neutral': '😐',
};

export const colorMap = {
  'Happy': 'mood-green',
  'Excited': 'mood-yellow',
  'Calm': 'mood-blue',
  'Sad': 'mood-indigo',
  'Anxious': 'mood-purple',
  'Angry': 'mood-red',
  'Tired': 'mood-gray',
  'Neutral': 'mood-slate',
};

export function getMoodEmoji(mood) {
  return moodMap[mood] || '😊';
}

export function getMoodColor(mood) {
  return colorMap[mood] || 'mood-gray';
}
