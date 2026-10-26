import Link from "next/link";
import { notFound } from "next/navigation";
import PaymentSection from "@/components/PaymentSection";

interface CheckoutPageProps {
  params: Promise<{
    cinemaID: string;
  }>;
  searchParams: Promise<{
    movieId?: string;
    showtimeId?: string;
    date?: string;
    seats?: string;
    total?: string;
  }>;
}

const cinemas = [
  { id: "CIN001", name: "Kalyan Cinemas" },
  { id: "CIN002", name: "Odeon Cinemas" },
  { id: "CIN003", name: "PVR: Treasure Island Mall" },
  { id: "CIN004", name: "INOX: C-21 Mall" },
  { id: "CIN005", name: "INOX: Nexus Indore Central Mall" },
  { id: "CIN006", name: "Miraj Cinemas: Velocity III" },
];

export default async function CheckoutPage({
  params,
  searchParams,
}: CheckoutPageProps) {
  const { cinemaID } = await params;
  const { movieId, showtimeId, date, seats, total } = await searchParams;

  const cinema = cinemas.find((item) => item.id === cinemaID);

  if (!cinema) {
    notFound();
  }

  const selectedSeats = seats
    ? seats.split(",").filter(Boolean)
    : [];

  const totalAmount = Number(total);
  const validTotal =
    Number.isFinite(totalAmount) && totalAmount >= 0 ? totalAmount : 0;

  return (
    <main className="min-h-screen bg-[#101014] px-5 py-10 text-[#F5F3F7] sm:px-8 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/booking/${cinemaID}/seats?movieId=${encodeURIComponent(movieId ?? "")}&showtimeId=${encodeURIComponent(showtimeId ?? "")}&date=${encodeURIComponent(date ?? "")}`}
          className="text-sm text-[#A5A1AD] transition hover:text-white"
        >
          ← Back to seats
        </Link>

        <header className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
            Step 04 · Review your booking
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">
            Checkout
          </h1>

          <p className="mt-4 text-[#A5A1AD]">
            Review your booking details before continuing.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#17171D] p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Booking summary</h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-[#A5A1AD]">Cinema</span>
              <span className="text-right font-medium">{cinema.name}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#A5A1AD]">Movie ID</span>
              <span>{movieId || "Not provided"}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#A5A1AD]">Date</span>
              <span>{date || "Not selected"}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#A5A1AD]">Showtime ID</span>
              <span>{showtimeId || "Not selected"}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#A5A1AD]">Seats</span>
              <span className="text-right">
                {selectedSeats.length ? selectedSeats.join(", ") : "None"}
              </span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Demo total</span>
                <span className="text-xl font-bold text-violet-300">
                  ₹{validTotal}
                </span>
              </div>
            </div>
          </div>
        </section>

<PaymentSection
  totalAmount={validTotal}
  movieId={movieId ?? ""}
  cinemaID={cinemaID}
  cinemaName={cinema.name}
  showtimeId={showtimeId ?? ""}
  date={date ?? ""}
  seats={selectedSeats}
/>





<div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-200">
  This is a demonstration checkout. No payment will be collected,
  and no cinema tickets are being reserved.
</div>
      </div>
    </main>
  );
}

