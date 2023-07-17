import Link from "next/link";

import AddContentModal from "./components/add-content/AddContentModal";
import { getAllCollections } from "./services/collections.service";
import { getAllTags } from "./services/tags.service";

export const revalidate = 0;

export default async function Home() {
  const tagsData = getAllTags();
  const collectionsData = getAllCollections();

  const [tags, collections] = await Promise.all([tagsData, collectionsData]);

  return (
    <main className="flex min-h-screen justify-center gap-3 bg-slate-950">
      <Link href="/gleans" className="ml-4 mt-4">
        <div className="flex h-[46px] items-center justify-center rounded-full bg-primaryWhite px-5 py-2 text-base font-medium">
          Gleans
        </div>
      </Link>
      <AddContentModal tags={tags} collections={collections} />
    </main>
  );
}
