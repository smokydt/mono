import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment } from '../../graphql/generated/types';

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: [] as Comment[],
  reducers: {
    addComment: (state, action) => {
      state.push(action.payload);
    },
    replaceComments: (state, action: PayloadAction<Comment[]>) => {
      return action.payload;
    },
  },
});

export const {
  reducer: commentsReducer,
  actions: { addComment, replaceComments },
} = commentsSlice;
