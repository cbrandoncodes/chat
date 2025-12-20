import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "@/types/chat";

export type ChatsState = {
  chats: Chat[];
  activeChatId: string | null;
  isLoading: boolean;
  isChatListOpen: boolean;
};

const initialState: ChatsState = {
  chats: [],
  activeChatId: null,
  isLoading: true,
  isChatListOpen: false,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    addChat: (
      state,
      action: PayloadAction<
        Omit<Chat, "createdAt"> & { createdAt: Date | string }
      >
    ) => {
      const exists = state.chats.some((chat) => chat.id === action.payload.id);
      if (!exists) {
        state.chats.push({
          ...action.payload,
          createdAt: new Date(action.payload.createdAt),
        });
      }
    },
    updateChat: (
      state,
      action: PayloadAction<Partial<Chat> & { id: string }>
    ) => {
      const index = state.chats.findIndex(
        (chat) => chat.id === action.payload.id
      );
      if (index !== -1) {
        state.chats[index] = { ...state.chats[index], ...action.payload };
      }
    },
    removeChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    },
    setActiveChatId: (state, action: PayloadAction<string | null>) => {
      state.activeChatId = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsChatListOpen: (state, action: PayloadAction<boolean>) => {
      state.isChatListOpen = action.payload;
    },
  },
});

export const {
  setChats,
  addChat,
  updateChat,
  removeChat,
  setActiveChatId,
  setIsLoading,
  setIsChatListOpen,
} = chatsSlice.actions;

export default chatsSlice.reducer;
