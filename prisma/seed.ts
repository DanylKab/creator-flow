import { prisma } from "../app/lib/prisma";

const GLEAN_TAGS = ["Test", "Detailed", "Dance", "Design", "UX"];
const GLEAN_COLLECTIONS = [
  "Alternatives",
  "Berlin Essentials",
  "Development",
  "Movies",
  "Series",
  "Wild Stuff",
  "Zapier Hacks",
];

const seedDb = async () => {
  for (const tag of GLEAN_TAGS) {
    await prisma.gleanTag.upsert({
      where: { name: tag },
      create: { name: tag },
      update: { name: tag },
    });
  }

  for (const collection of GLEAN_COLLECTIONS) {
    await prisma.gleanCollection.upsert({
      where: { name: collection },
      create: { name: collection },
      update: { name: collection },
    });
  }
};

seedDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
