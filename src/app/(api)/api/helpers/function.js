export const generatePNR = () => {
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const timePart = Date.now().toString(36).slice(-2).toUpperCase();

  return randomPart + timePart;
};
