// components/utils/colors.ts

export const getRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#F1E5A7',
    '#D4A5A5', '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4',
    '#F1DB3C', '#8338EC', '#3A86FF', '#FB5607', '#FF006E',
    '#FFD700', '#C0C0C0' // gold, silver
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};