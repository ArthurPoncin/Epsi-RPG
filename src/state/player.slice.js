export const createPlayerSlice = (set, get) => ({
  position: { x: 0, y: 0 },
  setPosition: (x, y) => set({ position: { x, y } }),
});

export const usePlayer = (selector) => {
  const { useGameStore } = require("./store");
  return useGameStore(selector);
};
