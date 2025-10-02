import { create } from "zustand";
import { createPlayerSlice } from "./player.slice";
import { createWorldSlice } from "./world.slice";

export const useGameStore = create((set, get) => ({
  ...createPlayerSlice(set, get),
  ...createWorldSlice(set, get),
}));
