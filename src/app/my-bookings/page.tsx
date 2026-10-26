"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBookings, cancelBooking } from "@/lib/bookings";
import type { Booking } from "@/lib/bookings";

interface MovieInfo {
  title: string;
  poster_path: string | null;
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [movieDetails, setMovieDetails] = useState<Record<string, MovieInfo>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  const refreshBookings = useCallback(() => {
    setBookings(getBookings());
  }, []);

  useEffect(() => {
    refreshBookings();
    setIsLoading(false);

    const handleBookingsUpdated = () => refreshBookings();

    window.addEventListener("bookings-updated", handleBookingsUpdated);

    return () => {
      window.removeEventListener("bookings-updated", handleBookingsUpdated);
    };
  }, [refreshBookings]);

  useEffect(() => {
    let cancelled = false;

    async function loadMovieDetails() {
      const movieIds = [...new Set(bookings.map((booking) => booking.movieId))]
        .filter(Boolean)
        .filter((id) => !movieDetails[id]);

      if (movieIds.length === 0) return;

      const results = await Promise.all(
        movieIds.map(async (id) => {
          try {
            const response = await fetch(`/api/movies/${id}`);

            if (!response.ok) return null;

            const movie = (await response.json()) as {
              title?: string;
              poster_path?: string | null;
            };

            if (!movie.title) return null;

            return {
              id,
              movie: {
                title: movie.title,
                poster_path: movie.poster_path ?? null,
              },
            };
          } catch {
            return null;
          }
        })
      );

      if (cancelled) return;

      setMovieDetails((previous) => {
        const updated = { ...previous };

        for (const result of results) {
          if (result) updated[result.id] = result.movie;
        }

        return updated;
      });
    }

    void loadMovieDetails();

    return () => {
      cancelled = true;
    };
  }, [bookings, movieDetails]);

  return (
    <main className="min-h-screen bg-[#101014] px-5 py-12 text-[#F5F3F7] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm text-[#A5A1AD] transition hover:text-white"
        >
          ← Back to Home
        </Link>

        <header className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
            Your Account
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            My Bookings
          </h1>

          <p className="mt-4 text-[#A5A1AD]">
            View and manage your saved demo bookings.
          </p>
        </header>

        {isLoading ? (
          <p className="mt-10 text-[#A5A1AD]">Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <section className="mt-10 rounded-2xl border border-white/10 bg-[#17171D] p-8 text-center sm:p-12">
            <h2 className="text-xl font-semibold">No bookings yet</h2>

            <p className="mt-3 text-[#A5A1AD]">
              Your completed demo bookings will appear here.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400"
            >
              Explore Movies
            </Link>
          </section>
        ) : (
          <div className="mt-10 space-y-5">
            {bookings.map((booking) => {
              const movie = movieDetails[booking.movieId];

              const posterUrl = movie?.poster_path
                ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
                : null;

              return (
                <article
                  key={booking.bookingId}
                  className="rounded-2xl border border-white/10 bg-[#17171D] p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <div className="relative aspect-[2/3] w-28 shrink-0 overflow-hidden rounded-xl bg-[#222129]">
                      {posterUrl ? (
                        <Image
                          src={posterUrl}
                          alt={`${movie.title} poster`}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center p-2 text-center text-xs text-[#A5A1AD]">
                          Poster unavailable
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                            Booking ID
                          </p>

                          <p className="mt-2 break-all font-mono text-sm">
                            {booking.bookingId}
                          </p>

                          <h2 className="mt-4 text-xl font-semibold">
                            {movie?.title || `Movie ID: ${booking.movieId}`}
                          </h2>

                          <p className="mt-2 text-sm text-[#A5A1AD]">
                            {booking.cinemaName || "Cinema details unavailable"}
                          </p>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                            booking.status === "confirmed"
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "bg-red-400/10 text-red-300"
                          }`}
                        >
                          {booking.status === "confirmed"
                            ? "CONFIRMED · DEMO"
                            : "CANCELLED"}
                        </span>
                      </div>

                      <div className="mt-6 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <p className="text-sm text-[#A5A1AD]">Date</p>
                          <p className="mt-1 font-medium">
                            {booking.date || "Not specified"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-[#A5A1AD]">Showtime ID</p>
                          <p className="mt-1 font-medium">
                            {booking.showtimeId || "Not specified"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-[#A5A1AD]">Seats</p>
                          <p className="mt-1 font-medium">
                            {booking.seats.length
                              ? booking.seats.join(", ")
                              : "None selected"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-[#A5A1AD]">Demo Amount</p>
                          <p className="mt-1 font-semibold text-violet-300">
                            ₹{booking.total.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-[#A5A1AD]">
                            Payment Method
                          </p>
                          <p className="mt-1 font-medium">
                            {booking.paymentMethod}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-[#A5A1AD]">Booked At</p>
                          <p className="mt-1 text-sm font-medium">
                            {new Date(booking.bookedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {booking.status === "confirmed" && (
                        <div className="mt-6 border-t border-white/10 pt-5">
                          <button
                            type="button"
                            onClick={() => {
                              const confirmed = window.confirm(
                                "Cancel this demo booking?"
                              );

                              if (!confirmed) return;

                              cancelBooking(booking.bookingId);
                              refreshBookings();
                            }}
                            className="rounded-lg border border-red-400/30 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-400/10"
                          >
                            Cancel Demo Booking
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <p className="mt-8 text-xs leading-5 text-[#A5A1AD]">
          These records are stored in this browser&apos;s local storage. They
          represent demo bookings only, not real cinema reservations or
          completed payments.
        </p>
      </div>
    </main>
  );
}