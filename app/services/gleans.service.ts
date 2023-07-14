import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma";

export type PopulatedGlean = Prisma.GleanGetPayload<{
  include: {
    collections: { include: { collection: true } };
    tags: { include: { tag: true } };
  };
}>;

export const getAllGleans = async (): Promise<PopulatedGlean[]> => {
  const gleans = await prisma.glean.findMany({
    include: {
      collections: { include: { collection: true } },
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return gleans;
};
