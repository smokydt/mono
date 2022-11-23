import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { replaceComments } from '../redux/reducers';
import { useAppDispatch } from '../redux/hooks';
import {
  CommentsDocument,
  CommentsSubscriptionDocument,
} from '../graphql/generated/types';

export const Comments = () => {
  const dispatch = useAppDispatch();

  const {
    loading: loadingComments,
    data: dataComments,
    subscribeToMore,
  } = useQuery(CommentsDocument);

  useEffect(() => {
    // update query with subscription data
    subscribeToMore({
      document: CommentsSubscriptionDocument,

      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          console.log('no subscriptionData.data returning prev');
          return prev;
        }

        const newComment = subscriptionData.data.commentAdded;
        console.log(prev);
        const found = prev.comments.find(({ id }) => newComment.id === id);

        if (found) {
          // overwriting id can cause error so don't do it
          const { id, ...newProps } = newComment;
          Object.assign(found, newProps);
          return prev;
        }

        return { comments: [...prev.comments, newComment] };
      },
    });
  }, [subscribeToMore]);

  useEffect(() => {
    // sync to redux
    dispatch(replaceComments(dataComments?.comments || []));
  }, [dispatch, dataComments]);

  return (
    <>
      <div>
        All comments:
        {!loadingComments &&
          dataComments?.comments &&
          dataComments!.comments.map((comment) => (
            <div key={comment.id}>{comment?.content}</div>
          ))}
      </div>
    </>
  );
};
