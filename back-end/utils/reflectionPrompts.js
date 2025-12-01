// utils/reflectionPrompts.js
// Collection of 30 daily reflection prompts focused on mental health

const REFLECTION_PROMPTS = [
  "What is one thing you're grateful for today?",
  "What made you smile or laugh today?",
  "What is something kind you did for yourself or someone else?",
  "What challenge did you overcome today, no matter how small?",
  "What emotion are you feeling right now, and why?",
  "What is one thing you learned about yourself today?",
  "How did you take care of your mental health today?",
  "What are three things that brought you joy this week?",
  "What is one fear you're working on letting go of?",
  "How did you show yourself compassion today?",
  "What is something you're proud of accomplishing recently?",
  "What relationship in your life are you most grateful for?",
  "What is one positive change you've noticed in yourself lately?",
  "How do you want to feel tomorrow, and what can help you get there?",
  "What boundary did you set or maintain today?",
  "What is something you're looking forward to?",
  "How did you practice self-care today?",
  "What mistake did you make, and what did you learn from it?",
  "What is one thing you need to forgive yourself for?",
  "How did you step outside your comfort zone today?",
  "What is a strength you used today?",
  "What negative thought did you challenge today?",
  "How did you connect with others today?",
  "What is something beautiful you noticed today?",
  "What progress have you made toward a personal goal?",
  "What is one thing you love about yourself?",
  "How did you practice mindfulness or being present today?",
  "What is something you're working on accepting?",
  "What brought you peace or calm today?",
  "What is one hope you have for your future self?"
];

/**
 * Get the daily prompt based on the current date
 * Rotates through 30 prompts, starting over after day 30
 * @returns {string} The prompt for today
 */
const getDailyPrompt = () => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const promptIndex = dayOfYear % REFLECTION_PROMPTS.length;
  return REFLECTION_PROMPTS[promptIndex];
};

/**
 * Get prompt for a specific date
 * @param {Date} date - The date to get the prompt for
 * @returns {string} The prompt for that date
 */
const getPromptForDate = (date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const dayOfYear = Math.floor(diff / 1000 / 60 / 60 / 24);
  const promptIndex = dayOfYear % REFLECTION_PROMPTS.length;
  return REFLECTION_PROMPTS[promptIndex];
};

module.exports = {
  REFLECTION_PROMPTS,
  getDailyPrompt,
  getPromptForDate
};
