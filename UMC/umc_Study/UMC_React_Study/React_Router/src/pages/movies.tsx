import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import { MovieBar } from "../component/movieBar.tsx";
import ErrorPage from "../ErrorCase/ErrorPage.tsx";
import { LoadingSpinner } from "../ErrorCase/LoadingSpinner.tsx";

import axios from "axios";
import { useParams } from "react-router-dom";

const MoviesPage = () => {
  const [popular, setPopular] = useState<Movie[]>([]);
  // 로딩 상태
  const [isPending, setIsPending] = useState(false);
  // 에러 상태
  const [isError, setIsError] = useState(false);
  // 페이지
  const [page, setPage] = useState(1);

  const { category } = useParams<{
    category: string;
  }>();
  console.log(category);

  console.log(popular);

  useEffect((): void => {
    const fetchMovies = async () => {
      setIsPending(true);
      // 응답에 대한 타입
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Njg0ZDI3MDA1NjIwMGRkNzEwZDg4OGVhNWM2YjU5NSIsIm5iZiI6MTc0MzgzNjIzOS42ODQsInN1YiI6IjY3ZjBkNDRmZWRkZWMyOGIwM2FjZmM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DDFyqMaEvctMD6io8MGyKCbV711w6EJgHLtDEgq_AQQ`,
            },
          }
        );

        setPopular(data.results);
        console.log(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page, category]);

  // category 변경시 page(1)로 초기화
  useEffect((): void => {
    setPage(1);
  }, [category]);

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="flex justify-center mt-6 ">
        <button
          onClick={(): void => setPage((prev): number => prev - 1)}
          disabled={page === 1}
          className={`px-6 py-3 rounded ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-pink-200 hover:bg-green-600 text-white"
          }`}
        >{`<`}</button>
        <span className="px-6 py-3">{page} 페이지</span>
        <button
          onClick={(): void => setPage((prev): number => prev + 1)}
          className="px-6 py-3 rounded bg-pink-200 hover:bg-green-600 text-white"
        >{`>`}</button>
      </div>
      {isPending ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="py-6 bg-white-900 px-80">
          <ul className="grid grid-cols-5 p-5 gap-8">
            {popular?.map((movie) => (
              <li key={movie.id}>
                <MovieBar movie={movie} category={category!} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MoviesPage;
