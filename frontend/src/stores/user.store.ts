import { create } from "zustand";

interface UserState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export const userStore = create<UserState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set(() => ({ accessToken: token })),
}));
