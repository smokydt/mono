export const isBookTitleAuthor = (titleAndAuthor: {
  title?: string;
  author?: string;
}): titleAndAuthor is {
  title: string;
  author: string;
} => {
  const { title, author } = titleAndAuthor;

  return !!(title || '').trim() && !!(author || '').trim();
};
