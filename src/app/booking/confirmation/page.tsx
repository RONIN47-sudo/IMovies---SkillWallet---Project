import Link from "next/link";
import BookingConfirmationClient from "@/components/BookingConfirmationClient";

interface ConfirmationPageProps {
  searchParams: Promise<{
    bookingId?: string;
    method?: string;
    total?: string;
    movieId?: string;
    cinemaID?: string;
    cinemaName?: string;
    showtimeId?: string;
    date?: string;
    seats?: string;
  }>;
}

const paymentMethodLabels: Record<string, string> = {
  upi: "UPI",
  card: "Credit / Debit Card",
  netbanking: "Net Banking",
  wallet: "Wallet",
};

export default async function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const {
    bookingId,
    method,
    total,
    movieId,
    cinemaID,
    cinemaName,
    showtimeId,
    date,
    seats,
  } = await searchParams;

  const paymentMethod =
    paymentMethodLabels[method ?? ""] ?? "Not specified";

  const parsedTotal = Number(total);

  const validTotal =
    Number.isFinite(parsedTotal) && parsedTotal >= 0 ? parsedTotal : 0;

  const selectedSeats = seats
    ? seats.split(",").filter(Boolean)
    : [];

  return (
    <>
      <BookingConfirmationClient
        bookingId={bookingId ?? ""}
        movieId={movieId ?? ""}
        cinemaID={cinemaID ?? ""}
        cinemaName={cinemaName ?? ""}
        showtimeId={showtimeId ?? ""}
        date={date ?? ""}
        seats={selectedSeats}
        total={validTotal}
        paymentMethod={method ?? ""}
      />

      <main className="flex min-h-screen items-center justify-center bg-[#101014] px-5 py-12 text-[#F5F3F7]">
        <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#17171D] p-8 text-center sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-4xl text-emerald-400">
            ✓
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
            IMovies · Demo Checkout
          </p>

          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            Demo Payment Complete!
          </h1>

          <p className="mt-4 leading-7 text-[#A5A1AD]">
            You've reached the simulated confirmation page. No real payment
            was processed, and no cinema tickets have been reserved.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[#101014] p-6 text-left">
            <div className="flex items-center justify-between gap-4 py-3">
              <span className="text-sm text-[#A5A1AD]">
                Demo amount
              </span>

              <span className="font-semibold text-violet-300">
                ₹{validTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 py-3">
              <span className="text-sm text-[#A5A1AD]">
                Payment method
              </span>

              <span className="text-right text-sm font-medium">
                {paymentMethod}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 py-3">
              <span className="text-sm text-[#A5A1AD]">
                Status
              </span>

              <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                SIMULATED
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-violet-500 px-5 py-4 font-semibold text-white transition hover:bg-violet-400"
          >
            Return to Home
          </Link>

          <p className="mt-5 text-xs leading-5 text-[#A5A1AD]">
            This page demonstrates the checkout flow only. It is not proof
            of payment or a valid cinema ticket.
          </p>
        </section>
      </main>
    </>
  );
}

