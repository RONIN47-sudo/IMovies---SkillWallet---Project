import Link from "next/link";

const cinemas = [
  {
    id: "CIN001",
    name: "Kalyan Cinemas",
    location: "Kalyan Mall, Rajendra Nagar, Indore",
    address: "3rd Floor, Kalyan Mall, Rajendra Nagar",
    pincode: "452012",
    price: 150,
    formats: ["2D"],
  },
  {
    id: "CIN002",
    name: "Odeon Cinemas",
    location: "Westend Mall, Rajendra Nagar, Indore",
    address: "Westend Mall, New Bijalpur, Rajendra Nagar",
    pincode: "452012",
    price: 180,
    formats: ["2D", "3D"],
  },
  {
    id: "CIN003",
    name: "PVR: Treasure Island Mall",
    location: "South Tukoganj, Indore",
    address: "Treasure Island Mall, MG Road, South Tukoganj",
    pincode: "452001",
    price: 220,
    formats: ["2D", "3D"],
  },
  {
    id: "CIN004",
    name: "INOX: C-21 Mall",
    location: "Scheme No. 54, Indore",
    address: "C-21 Mall, AB Road, Scheme No. 54",
    pincode: "452010",
    price: 200,
    formats: ["2D", "3D"],
  },
  {
    id: "CIN005",
    name: "INOX: Nexus Indore Central Mall",
    location: "Regal Square, Indore",
    address: "Nexus Indore Central Mall, RNT Marg",
    pincode: "452001",
    price: 200,
    formats: ["2D", "3D"],
  },
  {
    id: "CIN006",
    name: "Miraj Cinemas: Velocity III",
    location: "Scheme 94C, Indore",
    address: "Velocity III, Eastern Ring Road",
    pincode: "452016",
    price: 180,
    formats: ["2D", "3D"],
  },
];

interface BookingPageProps {
  searchParams: Promise<{
    movieId?: string;
  }>;
}

export default async function BookingPage({
  searchParams,
}: BookingPageProps) {
  const { movieId } = await searchParams;
  return (
    <main className="min-h-screen bg-[#101014] px-5 py-10 text-[#F5F3F7] sm:px-8 sm:py-14">
      <div className="mx-auto max-w-7xl">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#A5A1AD] transition hover:text-white"
        >
          <span aria-hidden="true">←</span>
          Back to Home
        </Link>

        {/* Page heading */}
        <header className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
            Your next movie night
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Book Your Tickets
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#A5A1AD]">
            Find a cinema in Indore, explore showtimes, and prepare for
            your next big-screen experience.
          </p>
        </header>

        {/* Location overview */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-[#17171D] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-[#A5A1AD]">
                Currently exploring
              </p>

              <h2 className="mt-2 flex items-center gap-2 text-xl font-semibold sm:text-2xl">
                <span aria-hidden="true">📍</span>
                Indore, Madhya Pradesh
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#A5A1AD]">
                Explore cinema locations across the city.
              </p>
            </div>

            <div className="w-fit rounded-xl border border-violet-400/20 bg-violet-500/10 px-5 py-3">
              <p className="text-2xl font-bold text-violet-300">
                {cinemas.length}
              </p>

              <p className="mt-1 text-xs text-[#A5A1AD]">
                Cinema listings
              </p>
            </div>
          </div>
        </section>

        {/* Cinema listings */}
        <section className="mt-12">
          <div className="mb-7">
            <p className="text-sm font-semibold tracking-widest text-violet-300">
              STEP 01
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Choose Your Cinema
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#A5A1AD]">
              Select a cinema to continue to movie showtimes.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cinemas.map((cinema) => (
              <article
                key={cinema.id}
                className="group flex flex-col rounded-2xl border border-white/10 bg-[#17171D] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[#1B1A22] sm:p-6"
              >
                {/* Cinema icon and ID */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/10 bg-violet-500/10 text-2xl">
                    🎬
                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-medium tracking-wider text-[#A5A1AD]">
                    {cinema.id}
                  </span>
                </div>

                {/* Cinema information */}
                <div className="mt-5">
                  <h3 className="text-lg font-semibold leading-7 transition group-hover:text-violet-200">
                    {cinema.name}
                  </h3>

                  <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-[#A5A1AD]">
                    <span aria-hidden="true">📍</span>

                    <span>{cinema.location}</span>
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#777380]">
                    {cinema.address}
                  </p>

                  <p className="mt-1 text-xs text-[#777380]">
                    PIN: {cinema.pincode}
                  </p>
                </div>

                {/* Movie formats */}
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#A5A1AD]">
                    Supported formats in demo
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {cinema.formats.map((format) => (
                      <span
                        key={format}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#D8D5DF]"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sample ticket price */}
                <div className="mt-auto pt-6">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#A5A1AD]">
                        Sample ticket price
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        ₹{cinema.price}
                        <span className="ml-1 text-xs font-normal text-[#A5A1AD]">
                          / person
                        </span>
                      </p>
                    </div>

                    <span className="rounded-full bg-amber-400/10 px-3 py-1.5 text-[10px] font-medium text-amber-300">
                      Demo data
                    </span>
                  </div>

                  {/* Selection will be implemented next */}
                  <Link
  href={`/booking/${cinema.id}?movieId=${movieId ?? ""}`}
  className="mt-6 flex w-full items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-semibold text-violet-200 transition hover:border-violet-400/60 hover:bg-violet-500/25"
>
  Select Cinema
  <span className="ml-2" aria-hidden="true">
    →
  </span>
</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Data disclaimer */}
        <footer className="mt-12 rounded-xl border border-white/10 bg-[#17171D]/60 p-5">
          <p className="text-sm font-medium text-[#D8D5DF]">
            About these listings
          </p>

          <p className="mt-2 text-xs leading-6 text-[#A5A1AD]">
            Cinema names and locations are based on directory information
            and should be verified before launch. Ticket prices, movie
            formats, showtimes, and seat availability are demonstration
            data. They do not represent live cinema information or actual
            ticket reservations.
          </p>
        </footer>
      </div>
    </main>
  );
}