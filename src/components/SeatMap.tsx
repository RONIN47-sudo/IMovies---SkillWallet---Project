"use client";

import { useState } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";

interface Seat {
  id: string;
  row: string;
  number: number;
  category: "Standard" | "Premium" | "Recliner";
  price: number;
  occupied: boolean;
}

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const SEATS_PER_ROW = 10;

const seats: Seat[] = ROWS.flatMap((row, rowIndex) =>
  Array.from({ length: SEATS_PER_ROW }, (_, index) => {
    const number = index + 1;
    const category: Seat["category"] =
      rowIndex < 2 ? "Recliner" : rowIndex < 5 ? "Premium" : "Standard";

    return {
      id: `${row}${number}`,
      row,
      number,
      category,
      price:
        category === "Recliner"
          ? 350
          : category === "Premium"
            ? 250
            : 180,
      occupied:
        (rowIndex === 1 && [3, 4, 8].includes(number)) ||
        (rowIndex === 3 && [5, 6].includes(number)) ||
        (rowIndex === 6 && [2, 9].includes(number)),
    };
  })
);

export default function SeatMap() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const searchParams = useSearchParams();
const params = useParams<{ cinemaID: string }>();
const router = useRouter();

const movieId = searchParams.get("movieId") ?? "";
const showtimeId = searchParams.get("showtimeId") ?? "";
const date = searchParams.get("date") ?? "";
const cinemaID = params.cinemaID;

  function toggleSeat(seatId: string) {
    const seat = seats.find((item) => item.id === seatId);

    if (!seat || seat.occupied) return;

    setSelectedSeats((current) =>
      current.includes(seatId)
        ? current.filter((id) => id !== seatId)
        : [...current, seatId]
    );
  }

  const selectedSeatDetails = seats.filter((seat) =>
    selectedSeats.includes(seat.id)
  );

  const total = selectedSeatDetails.reduce(
    (sum, seat) => sum + seat.price,
    0
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap justify-center gap-4 text-xs text-[#A5A1AD] sm:gap-6 sm:text-sm">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm border border-white/20 bg-[#292830]" />
          Available
        </span>

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-violet-500" />
          Selected
        </span>

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-red-900" />
          Occupied
        </span>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="mx-auto min-w-[440px] max-w-2xl">
          <div className="mb-12 rounded-t-[50%] border-t-4 border-violet-400/70 pt-4 text-center text-xs uppercase tracking-[0.4em] text-[#A5A1AD]">
            Screen this way
          </div>

          {ROWS.map((row) => {
            const rowSeats = seats.filter((seat) => seat.row === row);

            return (
              <div
                key={row}
                className="mb-3 flex items-center justify-center gap-2"
              >
                <span className="w-5 text-sm text-[#A5A1AD]">{row}</span>

                {rowSeats.map((seat) => {
                  const selected = selectedSeats.includes(seat.id);

                  return (
                    <button
                      key={seat.id}
                      type="button"
                      disabled={seat.occupied}
                      onClick={() => toggleSeat(seat.id)}
                      aria-label={`Seat ${seat.id}, ${seat.category}, ${
                        seat.occupied
                          ? "occupied"
                          : selected
                            ? "selected"
                            : "available"
                      }`}
                      aria-pressed={selected}
                      title={`${seat.id} · ${seat.category} · ₹${seat.price}`}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-t-lg rounded-b-sm text-[10px] font-medium transition ${
                        seat.occupied
                          ? "cursor-not-allowed bg-red-900/80 text-red-200"
                          : selected
                            ? "bg-violet-500 text-white ring-2 ring-violet-300"
                            : "border border-white/15 bg-[#292830] text-[#D6D3DD] hover:border-violet-400 hover:bg-violet-500/30"
                      }`}
                    >
                      {seat.number}
                    </button>
                  );
                })}

                <span className="w-5 text-sm text-[#A5A1AD]">{row}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-5">
        <h3 className="font-semibold">Your selection</h3>

        <p className="mt-2 text-sm text-[#A5A1AD]">
          {selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "No seats selected yet"}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-sm text-[#A5A1AD]">
            {selectedSeats.length} seat(s) · Demo total
          </span>

          <span className="text-xl font-bold">₹{total}</span>
        </div>
        <button
  type="button"
  disabled={selectedSeats.length === 0}
  onClick={() => {
  if (selectedSeats.length === 0) return;

  const query = new URLSearchParams({
    movieId,
    showtimeId,
    date,
    seats: selectedSeats.join(","),
    total: String(total),
  });

  router.push(`/booking/${cinemaID}/checkout?${query.toString()}`);
}}
  className="mt-5 w-full rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
>
  Continue to Checkout →
</button>
      </div>
    </div>
  );
}

