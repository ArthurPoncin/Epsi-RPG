export const createWorldSlice = (set) => ({
  currentZone: "campus",
  setZone: (zone) => set({ currentZone: zone }),
});

export const useWorld = (selector) => {
  const { useGameStore } = require("./store");
  return useGameStore(selector);
};
