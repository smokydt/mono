import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const resetSlice = createSlice({
  name: 'reset',
  initialState: {
    resetRequest: 0,
    resetRequestWithClient: 0,
    resetActioned: 0,
  },
  reducers: {
    requestReset: (state) => {
      state.resetRequest += 1;
    },
    requestResetWithClient: (
      state,
      action: PayloadAction<ApolloClient<NormalizedCacheObject>>
    ) => {
      // action payload is used in epic, reducers aren't meant to do side effects
      state.resetRequestWithClient += 1;
    },
    actionedReset: (state) => {
      state.resetActioned += 1;
    },
  },
});

export const {
  reducer: resetReducer,
  actions: { requestReset, requestResetWithClient, actionedReset },
} = resetSlice;
