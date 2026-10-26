import Link from "next/link";
import { notFound } from "next/navigation";
import CinemaShowtimes from "@/components/CinemaShowtimes";

const cinemas = [
{
id: "CIN001",
name: "Kalyan Cinemas",
location: "Kalyan Mall, Rajendra Nagar, Indore",
address: "3rd Floor, Kalyan Mall, Rajendra Nagar",
price: 150,
formats: ["2D"],
},
{
id: "CIN002",
name: "Odeon Cinemas",
location: "Westend Mall, Rajendra Nagar, Indore",
address: "Westend Mall, New Bijalpur, Rajendra Nagar",
price: 180,
formats: ["2D", "3D"],
},
{
id: "CIN003",
name: "PVR: Treasure Island Mall",
location: "South Tukoganj, Indore",
address: "Treasure Island Mall, MG Road, South Tukoganj",
price: 220,
formats: ["2D", "3D"],
},
{
id: "CIN004",
name: "INOX: C-21 Mall",
location: "Scheme No. 54, Indore",
address: "C-21 Mall, AB Road, Scheme No. 54",
price: 200,
formats: ["2D", "3D"],
},
{
id: "CIN005",
name: "INOX: Nexus Indore Central Mall",
location: "Regal Square, Indore",
address: "Nexus Indore Central Mall, RNT Marg",
price: 200,
formats: ["2D", "3D"],
},
{
id: "CIN006",
name: "Miraj Cinemas: Velocity III",
location: "Scheme 94C, Indore",
address: "Velocity III, Eastern Ring Road",
price: 180,
formats: ["2D", "3D"],
},
];

const showtimes = [
{ id: "SHOW01", time: "10:00 AM", format: "2D" },
{ id: "SHOW02", time: "01:15 PM", format: "2D" },
{ id: "SHOW03", time: "04:30 PM", format: "3D" },
{ id: "SHOW04", time: "07:45 PM", format: "2D" },
{ id: "SHOW05", time: "10:30 PM", format: "3D" },
];

interface CinemaPageProps {
  params: Promise<{
    cinemaID: string;
  }>;
  searchParams: Promise<{
    movieId?: string;
  }>;
}

export default async function CinemaPage({
params,
searchParams,
}: CinemaPageProps) {
const { cinemaID } = await params;
const { movieId } = await searchParams;

const cinema = cinemas.find((item) => item.id === cinemaID);

if (!cinema) {
notFound();
}

const availableShowtimes = showtimes.filter((showtime) =>
cinema.formats.includes(showtime.format)
);

return ( <main className="min-h-screen bg-[#101014] px-5 py-10 text-[#F5F3F7] sm:px-8 sm:py-14"> <div className="mx-auto max-w-5xl">
<Link
href={`/booking?movieId=${movieId ?? ""}`}
className="inline-flex items-center gap-2 text-sm text-[#A5A1AD] transition hover:text-white"
> <span aria-hidden="true">←</span>
Back to cinemas </Link>


    <header className="mt-10">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
        Step 02 · Choose a showtime
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
        {cinema.name}
      </h1>

      <p className="mt-4 text-[#A5A1AD]">{cinema.location}</p>

      <p className="mt-2 text-sm text-[#777380]">{cinema.address}</p>
    </header>

    <CinemaShowtimes
  cinemaID={cinema.id}
  movieId={movieId ?? ""}
  showtimes={availableShowtimes}
/>

    <footer className="mt-10 rounded-xl border border-white/10 bg-[#17171D]/60 p-5">
      <p className="text-xs leading-6 text-[#A5A1AD]">
        This is a prototype. Dates and showtimes are demonstration
        data and do not represent live cinema schedules or confirmed
        ticket availability.
      </p>
    </footer>
  </div>
</main>


);
}
