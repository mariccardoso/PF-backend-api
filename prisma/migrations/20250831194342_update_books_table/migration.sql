/*
  Warnings:

  - You are about to drop the column `author` on the `Book` table. All the data in the column will be lost.
  - Added the required column `authors` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "authors" JSONB NOT NULL,
    "publisher" TEXT,
    "publishedDate" DATETIME,
    "isbn" TEXT NOT NULL,
    "language" TEXT,
    "pageCount" INTEGER,
    "coverImage" TEXT NOT NULL,
    "genres" JSONB,
    "description" TEXT NOT NULL,
    "averageRating" REAL,
    "ratingsCount" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Book" ("averageRating", "coverImage", "createdAt", "description", "genres", "id", "isbn", "language", "pageCount", "publishedDate", "publisher", "ratingsCount", "subtitle", "title", "updatedAt") SELECT "averageRating", "coverImage", "createdAt", "description", "genres", "id", "isbn", "language", "pageCount", "publishedDate", "publisher", "ratingsCount", "subtitle", "title", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
