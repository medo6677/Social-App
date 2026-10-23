import { useInfiniteQuery } from '@tanstack/react-query';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';
import PostCard from './PostCard';
import PostSkeleton from './PostSkeleton';
import CreatePost from './CreatePost';
import { useContext, useEffect } from 'react';
import { TokenContext } from '../Context/TokenContext';
import useGetAllPosts from '../../Hooks/useGetAllPosts';
import { useInView } from "react-intersection-observer";

export default function Posts() {
  const getAllPosts = useGetAllPosts('/posts');
  const { ref, inView } = useInView({ threshold: 0.1 });

  const tokenContext = useContext(TokenContext);
  const userData = tokenContext?.userData;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => getAllPosts(pageParam),
    initialPageParam: 1,
    retry: 3,
    getNextPageParam: (lastRes) => {
      const pagination = lastRes?.meta?.pagination;
      if (!pagination || pagination.currentPage >= pagination.numberOfPages) {
        return undefined;
      }
      return pagination.nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!userData || isLoading) {
    return (
      <>
        <CreatePost />
        <PostSkeleton />
      </>
    );
  }

  if (isError) {
    return <ErrorMessage onRetry={refetch} />;
  }

  const posts = data?.pages.flatMap((res) => res?.data?.posts ?? []) ?? [];

  return (
    <>
      <CreatePost />

      {posts.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500">
          No posts available right now.
        </div>
      ) : (
        posts.map((post) => (
          <PostCard userData={userData} key={post._id} post={post} />
        ))
      )}

      {isFetchingNextPage && <PostSkeleton />}

      {/* Infinite scroll trigger */}
      <div ref={ref} className="h-4 w-full" />

      {!hasNextPage && posts.length > 0 && (
        <p className="text-center text-xs text-slate-400 py-4">
          You've caught up with all posts!
        </p>
      )}
    </>
  );
}
