import Link from "next/link";

import GleanCard from "./components/GleanCard";
import { getAllGleans } from "../services/gleans.service";

export const revalidate = 0;

export default async function GleansPage() {
  const gleans = await getAllGleans();

  return (
    <main className="flex min-h-screen flex-col gap-3 bg-slate-950 py-5">
      <Link href="/" className="mb-3 px-4 text-3xl font-medium text-white">
        Home
      </Link>
      <h1 className="px-4 text-4xl font-medium text-white">Gleans</h1>
      <div className="flex flex-col items-start justify-center gap-4 p-4">
        {!!gleans.length ? (
          gleans.map((glean) => <GleanCard key={glean.id} glean={glean} />)
        ) : (
          <p className="text-xl text-white">Sorry, no gleans were found</p>
        )}
      </div>
    </main>
  );
}
