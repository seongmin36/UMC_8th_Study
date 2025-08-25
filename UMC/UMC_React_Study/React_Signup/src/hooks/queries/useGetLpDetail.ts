import type { RequestLpDto } from "../../types/lp";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";

const useGetLpDetail = ({ lpId }: RequestLpDto) => {
  console.log("useGetLpDetail로 전달된 lpId:", lpId); // 추가

  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail({ lpId }),
    enabled: !!lpId,
  });
};

export default useGetLpDetail;
