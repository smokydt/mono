import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { getMainDefinition } from '@apollo/client/utilities';
import { store } from '../redux/store';
import { requestReset } from '../redux/reducers';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/subscriptions',
    keepAlive: 5000,
    on: {
      connected: (msg) => {
        console.log('connected', msg);
        console.log('requesting apollo reset from connected listener');
        store.dispatch(requestReset());
      },
      error: (err) => {
        console.log('websockets error', err);
      },
    },
    shouldRetry: () => true,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
