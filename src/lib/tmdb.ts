import type { TMDBMovieResponse, MovieVideo } from "./types";


const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies(): Promise<TMDBMovieResponse> {
const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
throw new Error("TMDB_API_KEY is missing from .env.local");
}

const response = await fetch(
`${TMDB_BASE_URL}/movie/popular?api_key=${apiKey}`,
{
next: { revalidate: 3600 },
}
);

if (!response.ok) {
throw new Error(`TMDB API request failed: ${response.status}`);
}

const data: unknown = await response.json();

return data as TMDBMovieResponse;
}

export async function searchMovies(query: string): Promise<TMDBMovieResponse> {
const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
throw new Error("TMDB_API_KEY is missing from .env.local");
}

const trimmedQuery = query.trim();

if (!trimmedQuery) {
return {
page: 1,
results: [],
total_pages: 0,
total_results: 0,
};
}

const params = new URLSearchParams({
api_key: apiKey,
query: trimmedQuery,
include_adult: "false",
language: "en-US",
page: "1",
});

const response = await fetch(
`${TMDB_BASE_URL}/search/movie?${params.toString()}`,
{
next: { revalidate: 3600 },
}
);

if (!response.ok) {
throw new Error(`TMDB movie search failed: ${response.status}`);
}

const data: unknown = await response.json();

return data as TMDBMovieResponse;
}


// Keep your existing functions above this point.

export async function getMovieDetails(movieId: string) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("TMDB_API_KEY is missing from .env.local");
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    language: "en-US",
  });

  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${encodeURIComponent(movieId)}?${params.toString()}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error(`TMDB movie details request failed: ${response.status}`);
  }

  return response.json();
}

export interface MovieGenre {
  id: number;
  name: string;
}

export async function getMovieGenres(): Promise<MovieGenre[]> {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("TMDB_API_KEY is missing from .env.local");
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    language: "en-US",
  });

  const response = await fetch(
    `${TMDB_BASE_URL}/genre/movie/list?${params.toString()}`,
    {
      next: { revalidate: 86400 },
    }
  );

  if (!response.ok) {
    throw new Error(`TMDB genre request failed: ${response.status}`);
  }

  const data: { genres: MovieGenre[] } = await response.json();

  return data.genres;
}

export async function getMovieVideos(movieId: string): Promise<MovieVideo[]> {
const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
throw new Error("TMDB_API_KEY is missing from .env.local");
}

const params = new URLSearchParams({
api_key: apiKey,
language: "en-US",
});

const response = await fetch(
`${TMDB_BASE_URL}/movie/${encodeURIComponent(movieId)}/videos?${params.toString()}`,
{
next: { revalidate: 3600 },
}
);

if (!response.ok) {
throw new Error(`TMDB movie videos request failed: ${response.status}`);
}

const data: { results: MovieVideo[] } = await response.json();

return data.results;
}
