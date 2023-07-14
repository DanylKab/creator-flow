import AddContentModal from "./components/add-content/AddContentModal";
import Gleans from "./components/Gleans";
import { getAllCollections } from "./services/collections.service";
import { getAllTags } from "./services/tags.service";

export const revalidate = 0;

export default async function Home() {
  const tagsData = getAllTags();
  const collectionsData = getAllCollections();

  const [tags, collections] = await Promise.all([tagsData, collectionsData]);

  return (
    <main className="flex min-h-screen flex-col gap-3 bg-slate-950">
      <AddContentModal tags={tags} collections={collections} />
      <Gleans />
    </main>
  );
}
