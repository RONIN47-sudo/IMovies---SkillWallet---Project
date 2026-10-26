"use client";

import { useMemo, useState } from "react";
import type { Movie } from "@/lib/types";
import type { MovieGenre } from "@/lib/tmdb";
import GenreFilter from "./GenreFilter";
import MovieCard from "./MovieCard";

interface MovieBrowserProps {
  movies: Movie[];
  genres: MovieGenre[];
}

export default function MovieBrowser({
  movies,
  genres,
}: MovieBrowserProps) {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const filteredMovies = useMemo(() => {
    if (selectedGenre === null) {
      return movies;
    }

    return movies.filter((movie) =>
      movie.genre_ids.includes(selectedGenre)
    );
  }, [movies, selectedGenre]);

  return (
    <section className="page-container py-10">
      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-violet-400">
          Now showing
        </p>

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Popular Movies
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-6 text-[#A5A1AD] sm:text-base">
          Explore popular films, discover your next favourite, and find your next cinema experience.
        </p>
      </div>

      <div className="mb-8">
        <GenreFilter
          genres={genres}
          onGenreChange={setSelectedGenre}
        />
      </div>

      {filteredMovies.length > 0 ? (
        <>
          <p className="mb-5 text-sm text-[#A5A1AD]">
            Showing {filteredMovies.length}{" "}
            {filteredMovies.length === 1 ? "movie" : "movies"}
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      ) : (
        <div className="surface-card flex min-h-40 items-center justify-center p-6 text-center text-[#A5A1AD]">
          No movies found in this genre among the currently loaded popular movies.
        </div>
      )}
    </section>
  );
}

