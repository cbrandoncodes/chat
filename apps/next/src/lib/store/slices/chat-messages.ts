import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectChatMessage } from "@shared/drizzle/schema";

export type ChatMessagesState = {
  messages: Record<string, SelectChatMessage[]>;
  isLoading: Record<string, boolean>;
};

const initialState: ChatMessagesState = {
  messages: {},
  isLoading: {},
};

const chatMessagesSlice = createSlice({
  name: "chatMessages",
  initialState,
  reducers: {
    setMessages: (
      state,
      action: PayloadAction<{ chatId: string; messages: SelectChatMessage[] }>
    ) => {
      state.messages[action.payload.chatId] = action.payload.messages;
    },
    addMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: SelectChatMessage }>
    ) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      // Check if message already exists to avoid duplicates
      const exists = state.messages[chatId].some((m) => m.id === message.id);
      if (!exists) {
        state.messages[chatId].push(message);
      }
    },
    updateMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: SelectChatMessage }>
    ) => {
      const { chatId, message } = action.payload;
      if (state.messages[chatId]) {
        const index = state.messages[chatId].findIndex(
          (m) => m.id === message.id
        );
        if (index !== -1) {
          state.messages[chatId][index] = message;
        }
      }
    },
    removeMessage: (
      state,
      action: PayloadAction<{ chatId: string; messageId: string }>
    ) => {
      const { chatId, messageId } = action.payload;
      if (state.messages[chatId]) {
        state.messages[chatId] = state.messages[chatId].filter(
          (m) => m.id !== messageId
        );
      }
    },
    clearMessages: (state, action: PayloadAction<string>) => {
      delete state.messages[action.payload];
    },
    clearAllMessages: (state) => {
      state.messages = {};
    },
    setIsLoading: (
      state,
      action: PayloadAction<{ chatId: string; isLoading: boolean }>
    ) => {
      state.isLoading[action.payload.chatId] = action.payload.isLoading;
    },
  },
});

export const {
  setMessages,
  addMessage,
  updateMessage,
  removeMessage,
  clearMessages,
  clearAllMessages,
  setIsLoading,
} = chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;
