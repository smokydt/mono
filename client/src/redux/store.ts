import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  booksReducer,
  booksSlice,
  commentsReducer,
  commentsSlice,
  resetReducer,
  resetSlice,
} from './reducers';
import { epicMiddleware, rootEpic } from './rxjs';
import { SliceNamesLookup } from './types';

const slices = { booksSlice, commentsSlice, resetSlice };

const combinedReducers: SliceNamesLookup<typeof slices> = {
  comments: commentsReducer,
  books: booksReducer,
  reset: resetReducer,
};

const rootReducer = combineReducers(combinedReducers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
