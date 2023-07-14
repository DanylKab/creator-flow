-- CreateTable
CREATE TABLE "Glean" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Glean_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GleanTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GleanTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GleanCollection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GleanCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnGleans" (
    "gleanId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "TagsOnGleans_pkey" PRIMARY KEY ("gleanId","tagId")
);

-- CreateTable
CREATE TABLE "GleansOnCollections" (
    "gleanId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "GleansOnCollections_pkey" PRIMARY KEY ("gleanId","collectionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Glean_title_key" ON "Glean"("title");

-- CreateIndex
CREATE UNIQUE INDEX "GleanTag_name_key" ON "GleanTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GleanCollection_name_key" ON "GleanCollection"("name");

-- AddForeignKey
ALTER TABLE "TagsOnGleans" ADD CONSTRAINT "TagsOnGleans_gleanId_fkey" FOREIGN KEY ("gleanId") REFERENCES "Glean"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnGleans" ADD CONSTRAINT "TagsOnGleans_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "GleanTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GleansOnCollections" ADD CONSTRAINT "GleansOnCollections_gleanId_fkey" FOREIGN KEY ("gleanId") REFERENCES "Glean"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GleansOnCollections" ADD CONSTRAINT "GleansOnCollections_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "GleanCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
