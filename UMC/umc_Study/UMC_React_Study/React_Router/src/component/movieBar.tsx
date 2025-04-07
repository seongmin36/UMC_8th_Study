import { JSX } from "react";
import { Movie } from "../types/movie";
import { Link } from "react-router-dom";
interface Props {
  movie: Movie;
  category: string;
}

export const MovieBar = ({ movie, category }: Props): JSX.Element => {
  return (
    <div className="relative cursor-pointer group">
      <Link to={`/movies/${category}/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-2xl"
        />
        <div className="absolute inset-0 flex flex-col justify-center p-4 opacity-0 backdrop-blur-md group-hover:opacity-200 rounded-2xl">
          <h2 className="text-lg font-bold text-center text-white">
            {movie.title}
          </h2>
          <p className="text-sm text-center text-white line-clamp-2">
            {movie.overview}
          </p>
        </div>
      </Link>
    </div>
  );
};
