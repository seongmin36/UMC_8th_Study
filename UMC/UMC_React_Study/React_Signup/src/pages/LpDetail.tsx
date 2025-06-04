// import useGetLpList from "../hooks/queries/useGetLpList";

import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import LpCardSkeleton from "../component/LpCard/LpCardSkeleton";
import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import TimeAgo from "../component/getTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import LpComment from "../component/LpCard/LpComment";

const LpDetail = () => {
  const { LPid } = useParams<{ LPid: string }>();
  const { data: lp, isLoading } = useGetLpDetail(LPid);
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response: ResponseMyInfoDto = await getMyInfo();

      setData(response);
    };

    getData();
  }, []);

  console.log("tagItem.id ", lp?.tags);

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
                src={`${data?.data.avatar}`}
                alt=""
                className="w-8 rounded-full"
              />
              <div className="flex items-center ml-3">{data?.data.name}</div>
            </div>
            {lp?.createdAt && <TimeAgo dateString={lp.updatedAt} />}
          </div>
          <div className="flex justify-between mb-8">
            <div>{lp?.title}</div>
            <div className="flex">
              <FontAwesomeIcon
                icon={faPencil}
                className="mr-3 text-gray-700 hover:text-blue-600"
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-gray-700 hover:text-blue-600"
              />
            </div>
          </div>
          <div className="flex justify-center mb-5">
            <div className="relative flex items-center justify-center rounded-md shadow-2xl bg-blue-50 aspect-square w-md">
              <div className="absolute z-4 w-[20%] h-[20%] bg-white border rounded-full"></div>
              <img
                src={lp?.thumbnail}
                alt={lp?.title}
                className="border-4 border-black rounded-full animate--[spin_5s_linear_infinite] object-cover w-[90%] h-[90%]"
              />
            </div>
          </div>
          <p className="mb-10 ">{lp?.content}</p>
          <div className="flex justify-center">
            {lp?.tags?.map((tagItem) => (
              <p key={tagItem.id} className="p-2 mr-2 bg-blue-200 rounded-3xl">
                # {tagItem.name}
              </p>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button className="mr-2 cursor-pointer" type="button">
              <FontAwesomeIcon icon={faHeart} />
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
