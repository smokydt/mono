import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { FC } from 'react';

type ClearCacheProps = {
  client: ApolloClient<NormalizedCacheObject>;
};

export const ClearCache: FC<ClearCacheProps> = ({ client }) => (
  <button
    onClick={async () => {
      console.log('clearing apollo cache');
      await client.clearStore();
    }}
  >
    Clear Apollo Cache
  </button>
);
