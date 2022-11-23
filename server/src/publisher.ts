import { PubSub } from 'graphql-subscriptions';
import { LoremIpsum } from 'lorem-ipsum';
import { v4 } from 'uuid';

import { comments } from './data';

export const pubsub = new PubSub();

const lorem = new LoremIpsum();

setInterval(() => {
  const content = lorem.generateWords(4);

  const comment = {
    id: v4(),
    content,
  };

  pubsub.publish('COMMENT_ADDED', {
    commentAdded: comment,
  });

  comments.push(comment);
}, 10000);
