import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CurrentUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

interface AuthState {
  authUser: boolean;
  user: CurrentUser | null;
}

const initialState = {
  user: null,
  authUser: false,
} satisfies AuthState as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<boolean>) {
      state.authUser = action.payload;
    },
    setUser(state, action: PayloadAction<CurrentUser | null>) {
      state.user = action.payload;
    },
  },
});

export const { setAuthUser, setUser } = authSlice.actions;
export default authSlice.reducer;
