import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { requestResetWithClient } from '../redux/reducers';

type ResetCacheProps = {
  client: ApolloClient<NormalizedCacheObject>;
};

export const ResetCache: FC<ResetCacheProps> = ({ client }) => {
  const dispatch = useAppDispatch();
  const resetRequest = useAppSelector((state) => state.reset.resetRequest);

  // reset cache on demand via redux reset
  useEffect(() => {
    if (resetRequest) {
      console.log('adding apollo client to reset request');
      dispatch(requestResetWithClient(client));
    }
  }, [dispatch, client, resetRequest]);

  // reset cache on demand by user
  return (
    <button
      onClick={async () => {
        console.log('force store reset by button press');
        client.resetStore();
      }}
    >
      Reset Apollo Cache
    </button>
  );
};
