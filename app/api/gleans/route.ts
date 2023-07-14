import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { GleanData, gleanSchema } from "@/app/types/glean";

export async function POST(request: Request) {
  const gleanData: GleanData = await request.json();

  if (!gleanSchema.safeParse(gleanData).success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const { description, image, title, collections, tags } = gleanData;

  try {
    await prisma.glean.create({
      data: {
        title,
        description,
        image,
        collections: {
          createMany: {
            skipDuplicates: true,
            data: collections.map((collectionId) => ({ collectionId })),
          },
        },
        tags: {
          createMany: {
            skipDuplicates: true,
            data: tags.map((tagId) => ({ tagId })),
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
