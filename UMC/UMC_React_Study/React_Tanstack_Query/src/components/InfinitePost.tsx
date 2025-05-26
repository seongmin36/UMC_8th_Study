import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

const fetchPosts = async ({ pageParam = 0 }) => {
  const res = await fetch(`/api/posts?page=${pageParam}`);
  return res.json();
};

function InfinitePostsComponent() {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      // 마지막 페이지 정보를 바탕으로 다음 페이지 번호를 결정합니다.
      getNextPageParam: (lastPage, pages) => lastPage.nextPage ?? false,
    });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred!</div>;

  return (
    <div>
      {data?.pages.map((page, pageIndex) => (
        <ul key={pageIndex}>
          {page?.data.map((post: any) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load More</button>
      )}
    </div>
  );
}

export default InfinitePostsComponent;
