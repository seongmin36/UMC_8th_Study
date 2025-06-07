import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import LpCardSkeleton from "../component/LpCard/LpCardSkeleton";
import TimeAgo from "../component/getTime";
import { Heart, Pencil, Trash } from "lucide-react";
import LpComment from "../component/LpCard/LpComment";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const LpDetail = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const { data: lp, isLoading } = useGetLpDetail({ lpId: Number(lpId) });

  // useQuery()를 사용하여 내 정보 쉽게 가져오기
  const { data: me } = useGetMyInfo();

  if (isLoading) {
    <LpCardSkeleton />;
  }

  return (
    <div className="flex flex-col px-40 mx-auto max-w-7xl">
      <div className="justify-center px-20 py-6 mb-10 bg-blue-100 border border-blue-100 rounded-xl">
        <div className="">
          <div className="flex justify-between pb-4">
            <div className="flex">
              <img
                src={`${me?.data.avatar}`}
                alt={me?.data.name}
                className="w-8 rounded-full"
              />
              <div className="flex items-center ml-3">{me?.data.name}</div>
            </div>
            {lp?.data.createdAt && <TimeAgo dateString={lp?.data.createdAt} />}
          </div>
          <div className="flex justify-between mb-8">
            <div>{lp?.data.title}</div>
            <div className="flex">
              <Pencil className="mr-3 text-gray-700 size-5 hover:text-blue-600" />
              <Trash className="text-gray-700 size-5 hover:text-blue-600" />
            </div>
          </div>
          <div className="flex justify-center mb-5">
            <div className="relative flex items-center justify-center rounded-md shadow-2xl bg-blue-50 aspect-square w-md">
              <div className="absolute z-4 w-[20%] h-[20%] bg-white border rounded-full"></div>
              <img
                src={lp?.data.thumbnail}
                alt={lp?.data.title}
                className="border-4 border-black rounded-full animate--[spin_5s_linear_infinite] object-cover w-[90%] h-[90%]"
              />
            </div>
          </div>
          <p className="mb-10 ">{lp?.data.content}</p>
          <div className="flex justify-center">
            {lp?.data.tags?.map((tagItem) => (
              <p key={tagItem.id} className="p-2 mr-2 bg-blue-200 rounded-3xl">
                # {tagItem.name}
              </p>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button className="mr-2 cursor-pointer" type="button">
              <Heart className="size-5" />
            </button>
            <div>1</div>
          </div>
        </div>
      </div>
      <LpComment />
    </div>
  );
};

export default LpDetail;
