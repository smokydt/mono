import { Slice } from '@reduxjs/toolkit';

export type ValueOf<T> = T[keyof T];

// effectively a record with slice names mapped to slice reducers
// to prevent typos in redux keys and reducer mismatches
export type SliceNamesLookup<T extends Record<string, Slice>> = {
  [K in keyof T as T[K]['name']]: T[K]['reducer'];
};
