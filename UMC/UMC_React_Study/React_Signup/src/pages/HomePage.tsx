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
  const [sort, setSort] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, search, sort);

  // ref, inView
  // ref -> 특정한 HTML 요소를 감시할 수 있다.
  // inView -> 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({ threshold: 0 });

  // 무한스크롤 동작 effect
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // useEffect(() => {
  //   refetch();
  // }, [sort, search, refetch]);

  if (isError) {
    return <div className="min-h-screen">오류가 발생했습니다</div>;
  }

  return (
    <div className="container min-h-screen px-4 py-6 mx-auto">
      {/* <input
        className="border border-black rounded-md "
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      /> */}
      <div className="mb-4 text-right">
        <button
          className={`py-2 px-6 text-base font-medium transition-colors duration-200 border border-blue-500 rounded-l-sm ${
            sort === PAGINATION_ORDER.asc
              ? "bg-blue-500 text-white"
              : "text-black"
          }`}
          onClick={() => setSort(PAGINATION_ORDER.asc)}
        >
          오래된순
        </button>

        <button
          className={`py-2 px-6 text-base font-medium transition-colors duration-200 border border-blue-500 rounded-r-sm ${
            sort === PAGINATION_ORDER.desc
              ? "bg-blue-500 text-white"
              : "text-black"
          }`}
          onClick={() => setSort(PAGINATION_ORDER.desc)}
        >
          최신순
        </button>
      </div>

      <div
        className={
          "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2"
        }
      >
        {lps?.pages
          ?.map((page: ResponseLpListDto) => page.data.data)
          ?.flat()
          ?.map((lp: Lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {(isFetching || isPending) && <LpCardSkeletonList count={20} />}
        <div
          ref={ref}
          className={`mt-8 flex justify-center bg-gray-400 h-2`}
        ></div>
      </div>
    </div>
  );
};

export default HomePage;
