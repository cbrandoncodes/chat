import { configureStore } from "@reduxjs/toolkit";

import usersReducer, { UsersState } from "./slices/users";
import chatsReducer, { ChatsState } from "./slices/chats";
import chatMessagesReducer, { ChatMessagesState } from "./slices/chat-messages";

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: usersReducer,
      chats: chatsReducer,
      chatMessages: chatMessagesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "users/setUsers",
            "chats/setChats",
            "chatMessages/setMessages",
          ],
          ignoredPaths: ["users.users", "chats.chats", "chatMessages.messages"],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

export type RootState = {
  users: UsersState;
  chats: ChatsState;
  chatMessages: ChatMessagesState;
};
