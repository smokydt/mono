import { Epic } from 'redux-observable';
import { filter, map, tap } from 'rxjs';

import { resetSlice } from '../../reducers';

type InputAction = ReturnType<
  typeof resetSlice['actions']['requestResetWithClient']
>;

type OutputAction = ReturnType<typeof resetSlice['actions']['actionedReset']>;

export const resetEpic: Epic<any, OutputAction> = (action$) =>
  action$.pipe(
    filter(
      (action: InputAction) => action.type === 'reset/requestResetWithClient'
    ),
    tap((action) => {
      console.log(`resetting apollo client inside epic`);
      action.payload!.resetStore();
    }),
    map(() => ({
      type: 'reset/actionedReset',
      payload: undefined,
    }))
  );
