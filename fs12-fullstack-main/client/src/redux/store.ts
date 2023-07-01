import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userReducer from './slices/user.slice'
import booksReducer from './slices/books.slice'
import authorsReducer from './slices/authors.slice'
import stackReducer from './slices/stack.slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    books: booksReducer,
    authors: authorsReducer,
    stack: stackReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
