import { prisma } from "../lib/prisma";

export const getAllTags = async () => {
  const tags = await prisma.gleanTag.findMany();

  return tags;
};
