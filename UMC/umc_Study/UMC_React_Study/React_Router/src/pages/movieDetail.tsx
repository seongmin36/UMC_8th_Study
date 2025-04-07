import { JSX } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorPage from "../ErrorCase/ErrorPage";
import { LoadingSpinner } from "../ErrorCase/LoadingSpinner";
import { Movie } from "../types/movie";
import { Cast, Crew, CreditResponse } from "../types/credits";
// import { CreditResponse, Cast, Crew } from "../types/credit";

const Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Njg0ZDI3MDA1NjIwMGRkNzEwZDg4OGVhNWM2YjU5NSIsIm5iZiI6MTc0MzgzNjIzOS42ODQsInN1YiI6IjY3ZjBkNDRmZWRkZWMyOGIwM2FjZmM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DDFyqMaEvctMD6io8MGyKCbV711w6EJgHLtDEgq_AQQ";

const MovieDetailPage = (): JSX.Element => {
  // 상세표시
  const [detail, setDetail] = useState<Movie>();
  // 에러
  const [isError, setIsError] = useState(false);
  // 로딩
  const [isPending, setIsPending] = useState(false);
  // 배우
  const [cast, setCast] = useState<Cast[]>([]);
  // 스태프
  const [crew, setCrew] = useState<Crew[]>([]);
  // overview 보기 버튼
  const [view, setView] = useState<"info" | "cast" | null>("info");
  console.log(view);

  // movieId 추출
  const { movieId } = useParams<{
    movieId: string;
  }>();

  useEffect((): void => {
    const fetchDetails = async () => {
      setIsPending(true);
      try {
        const [actors, credits] = await Promise.all([
          axios.get<Movie>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          ),
          axios.get<CreditResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          ),
        ]);
        setDetail(actors.data);
        setCast(credits.data.cast);
        setCrew(credits.data.crew);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  useEffect((): void => {
    setView(null);
  }, []);

  if (isError) {
    return <ErrorPage />;
  }

  return (
    // 가장 큰 틀
    <div>
      {isPending ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      ) : detail ? (
        // {/* 영화 디테일 부분 전체 */}
        <div className="flex p-10 justify-center gap-5">
          {/* 이미지 */}
          <img
            src={`https://image.tmdb.org/t/p/w500${detail?.poster_path}`}
            alt={detail?.poster_path}
            className="w-80 h-110"
          />
          {/* 상세 페이지 */}
          <div className="mt-4 w-180">
            {/* 제목 */}
            <div className="mb-6">
              <strong className="text-2xl">{detail?.title}</strong>
              <p>{detail?.original_title}</p>
            </div>
            {/* 평점 */}
            <div className="mb-2">
              평점 : {detail?.vote_average?.toFixed(1)}점
            </div>
            <hr className="text-red-600" />
            {/* 영화 정보 간단 */}
            <div className="mt-5">
              <div>
                {crew
                  .filter((dir: Crew) => dir.job === "Director")
                  .map((crew) => (
                    <div key={crew.name}>감독 : {crew.name}</div>
                  ))}
                <div className="inline-block">출연 :&nbsp;</div>
                {cast.slice(0, 7).map((act: Cast, index) => (
                  <span key={act.name}>
                    {act.name}
                    {/* \u00A0 = non-breaking space */}
                    {index < 6 && ",\u00A0"}
                  </span>
                ))}
                <div className="mb-5">
                  개봉 : {detail?.release_date} / 런타임 : {detail?.runtime}분
                </div>
                {/* 출연진 / 감독창 or others 확장 */}
                <div className="">
                  <button
                    onClick={(): void =>
                      setView(view === "info" ? null : "info")
                    }
                    className="bg-red-500 text-white p-1 rounded-md"
                  >
                    주요정보
                  </button>
                  {view === "info" && (
                    <div className="p-2">"{detail.overview}"</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieDetailPage;
