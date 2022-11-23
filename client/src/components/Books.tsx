import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { BooksDocument } from '../graphql/generated/types';
import { useAppDispatch } from '../redux/hooks';
import { replaceBooks } from '../redux/reducers';

export const Books = () => {
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery(BooksDocument);

  useEffect(() => {
    // sync to redux
    dispatch(replaceBooks(data?.books || []));
  }, [dispatch, data]);

  return (
    <>
      {!loading &&
        !error &&
        data!.books &&
        data!.books.map(({ id, title, author }) => (
          <div key={id}>
            {id}: {title} by {author}
            <br />
          </div>
        ))}
    </>
  );
};
