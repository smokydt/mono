import { useAppSelector } from '../redux/hooks';

export const CommentCounter = () => {
  const comments = useAppSelector((state) => state.comments);

  return <>Comment count: {comments.length}</>;
};
