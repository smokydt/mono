import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';

import { client } from '../graphql/apollo-client-setup';
import { store } from '../redux/store';

import { Books } from './Books';
import { AddBook } from './AddBook';
import { Comments } from './Comments';
import { ClearCache } from './ClearCache';
import { CommentCounter } from './CommentCounter';
import { ResetCache } from './ResetCache';

import '../css/App.css';

export const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <ClearCache client={client} />
          <ResetCache client={client} />
          <Books />
          <AddBook />
          <CommentCounter />
          <Comments />
        </header>
      </div>
    </ApolloProvider>
  </Provider>
);
