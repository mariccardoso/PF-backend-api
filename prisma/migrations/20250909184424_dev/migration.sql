-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "authors" JSONB NOT NULL,
    "publisher" TEXT,
    "publishedDate" TIMESTAMP(3),
    "isbn" TEXT NOT NULL,
    "language" TEXT,
    "pageCount" INTEGER,
    "coverImage" TEXT NOT NULL,
    "genres" JSONB,
    "description" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION,
    "ratingsCount" INTEGER,
    "synopsis" TEXT,
    "authorBio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");
