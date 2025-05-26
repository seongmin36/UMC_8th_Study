import { useEffect, useState } from "react";
// import useGetLpList from "../hooks/queries/useGetLpList";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpLIst";
import { PAGINATION_ORDER } from "../enums/common";
import type { Lp, ResponseLpListDto } from "../types/lp";
import { useInView } from "react-intersection-observer";
import LpCard from "../component/LpCard/LpCard";
import LpCardSkeletonList from "../component/LpCard/LpCardSkeletonList";

const HomePage = () => {
  // 검색어가 useState("") ""에 해당하는 요소에 검색어로 바뀜
  const [search, setSearch] = useState("");

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, search, PAGINATION_ORDER.desc);

  // ref, inView
  // ref -> 특정한 HTML 요소를 감시할 수 있다.
  // inView -> 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({ threshold: 0 });

  // 무한스크롤 동작 effect
  // useEffect(() => {
  //   if (inView) {
  //     !isFetching && hasNextPage && fetchNextPage();
  //   }
  // }, [inView, isFetching, hasNextPage, fetchNextPage()]);

  if (isError) {
    return <div className="min-h-screen">오류가 발생했습니다</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <div>안녕하세요</div>
      <input
        className="rounded-md border border-black "
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        }
      >
        {lps?.pages
          ?.map((page: ResponseLpListDto) => page.data.data)
          ?.flat()
          ?.map((lp: Lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isPending && <LpCardSkeletonList count={20} />}
        <div
          ref={ref}
          className={`mt-8 flex justify-center bg-gray-400 h-2`}
        ></div>
      </div>
    </div>
  );
};

export default HomePage;
