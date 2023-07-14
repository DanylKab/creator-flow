import { prisma } from "../lib/prisma";

export const getAllCollections = async () => {
  const collections = await prisma.gleanCollection.findMany();

  return collections;
};
