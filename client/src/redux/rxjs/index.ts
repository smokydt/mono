import { combineEpics, createEpicMiddleware } from 'redux-observable';
// import { catchError } from 'rxjs';

import { resetEpic } from './epics/reset';

// const epics = [pingEpic];

export const rootEpic = combineEpics(resetEpic);

// const rootEpic = (action$, store$, dependencies) =>
//   combineEpics(...epics)(action$, store$, dependencies).pipe(
//     catchError((error, source) => {
//       console.error(error);
//       return source;
//     })
//   );

export const epicMiddleware = createEpicMiddleware();
