// import useGetLpDetail from "../../hooks/queries/useGetLpDetail";

const LpComment = () => {
  // const {}=useGetLpDetail();

  return (
    <div className="p-6 bg-blue-100 rounded-xl">
      <div className="flex items-center justify-between mb-5">
        <p className="text-xl">댓글</p>
        <div className="">
          <button
            className={`py-1.5 px-6 text-base font-medium transition-colors duration-200 text-white border border-blue-400 bg-blue-400 rounded-l-md cursor-pointer
                    
                  `}
            // onClick={() => setSort(PAGINATION_ORDER.asc)}
          >
            오래된순
          </button>

          <button
            className={`py-1.5 px-6 text-base font-medium transition-colors duration-200 border border-blue-500 rounded-r-md cursor-pointer`}
            // onClick={() => setSort(PAGINATION_ORDER.desc)}
          >
            최신순
          </button>
        </div>
      </div>
      <div className="flex justify-between gap-2 mb-5">
        <input
          type="text"
          className="flex flex-1 px-2 border border-blue-400 rounded-md"
          placeholder="댓글을 입력해주세요"
        />
        <button
          className="p-2 px-5 text-white bg-blue-500 rounded-md"
          type="button"
        >
          작성
        </button>
      </div>
      <div>댓글 코멘트</div>
    </div>
  );
};

export default LpComment;
