import { useMutation } from '@apollo/client';
import { useState } from 'react';

import { AddBookDocument, BooksDocument } from '../graphql/generated/types';
import { isBookTitleAuthor } from '../util/guards';

export const AddBook = () => {
  const [addBook] = useMutation(AddBookDocument, {
    // update cache after adding to avoid having to do a refetch
    update(cache, { data }) {
      const newBook = data?.addBook;

      const cachedData = cache.readQuery({
        query: BooksDocument,
      });

      cache.writeQuery({
        query: BooksDocument,
        data: { books: [...cachedData!.books, newBook!] },
      });
    },
  });

  const [author, setAuthor] = useState<string>();
  const [title, setTitle] = useState<string>();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const titleAndAuthor = { title, author };
          if (isBookTitleAuthor(titleAndAuthor)) {
            addBook({ variables: titleAndAuthor });
          }
        }}
      >
        <input
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
          placeholder="Enter Book Title"
        />
        <input
          onChange={(event) => {
            setAuthor(event.currentTarget.value);
          }}
          placeholder="Enter Author's Name"
        />

        <button type="submit">Add Book</button>
      </form>
    </>
  );
};
