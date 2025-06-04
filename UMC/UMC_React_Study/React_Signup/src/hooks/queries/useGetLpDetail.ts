import type { Lp } from "../../types/lp";
import { axiosInstance } from "../../apis/axios";
import { useQuery } from "@tanstack/react-query";

interface LpDetailAPIResource {
  status: boolean;
  message: string;
  statusCode: number;
  data: Lp;
}

const fetchLpDetail = async (Lpid: string): Promise<Lp> => {
  if (!Lpid) {
    throw new Error("LP ID가 필요합니다.");
  }
  try {
    const response = await axiosInstance.get<LpDetailAPIResource>(
      `/v1/lps/${Lpid}`
    );

    if (response.data.status === true && response.data.statusCode === 200) {
      console.log("LP 상세조회 성공", response.data.data);
      return response.data.data;
    } else {
      throw new Error(response.data.message || "LP 상세조회 실패");
    }
  } catch (error) {
    console.error(
      "useGetLpDetail 훅으로부터 LP 상세정보를 불러올 수 없습니다.",
      error
    );

    if (error instanceof Error) {
      throw error;
    }
    throw new Error("알 수 없는 오류 발생");
  }
};

const useGetLpDetail = (LPid: string | undefined) => {
  console.log("useGetLpDetail로 전달된 LPid:", LPid); // 추가

  return useQuery<Lp, Error>({
    queryKey: ["lpdetail", LPid],
    queryFn: () => fetchLpDetail(LPid as string),
    enabled: !!LPid,
  });
};

export default useGetLpDetail;
