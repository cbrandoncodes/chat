import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectUser } from "@shared/drizzle/schema";

export type UsersState = {
  users: SelectUser[];
  currentUser: SelectUser | null;
  isLoading: boolean;
};

const initialState: UsersState = {
  users: [],
  currentUser: null,
  isLoading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<SelectUser[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<SelectUser>) => {
      const exists = state.users.some((user) => user.id === action.payload.id);
      if (!exists) {
        state.users.push(action.payload);
      }
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<SelectUser> & { id: string }>
    ) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        const user = state.users[index];
        state.users[index] = {
          ...user,
          ...action.payload,
        };
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setCurrentUser: (state, action: PayloadAction<SelectUser | null>) => {
      state.currentUser = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUser,
  removeUser,
  setCurrentUser,
  setIsLoading,
} = usersSlice.actions;

export default usersSlice.reducer;
