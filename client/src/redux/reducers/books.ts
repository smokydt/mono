import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book } from '../../graphql/generated/types';

export const booksSlice = createSlice({
  name: 'books',
  initialState: [] as Book[],
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    replaceBooks: (state, action: PayloadAction<Book[]>) => {
      return action.payload;
    },
  },
});

export const {
  reducer: booksReducer,
  actions: { addBook, replaceBooks },
} = booksSlice;
