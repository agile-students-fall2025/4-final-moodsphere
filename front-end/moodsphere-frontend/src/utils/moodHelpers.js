// src/utils/moodHelpers.js

export const moodMap = {
  'Happy': '😊',
  'Excited': '🤩',
  'Calm': '😌',
  'Sad': '😢',
  'Burnt Out': '🫩',
  'Anxious': '😰',
  'Angry': '😠',
  'Tired': '😴',
  'Neutral': '😐',
  'Annoyed': '🙄',
  'Inspired': '🌟',
  'Stressed': '😩',
  'Grateful': '🙏',
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
  'Burnt Out': 'mood-brown',
  'Annoyed': 'mood-pink',
  'Inspired': 'mood-gold',
  'Stressed': 'mood-orange',
  'Grateful': 'mood-teal',
};

export function getMoodEmoji(mood) {
  return moodMap[mood] || '😊';
}

export function getMoodColor(mood) {
  return colorMap[mood] || 'mood-gray';
}