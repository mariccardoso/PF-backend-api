/*
  Warnings:

  - You are about to alter the column `author` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - You are about to alter the column `genres` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - Made the column `averageRating` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coverImage` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `genres` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "author" JSONB NOT NULL,
    "publisher" TEXT,
    "publishedDate" DATETIME,
    "isbn" TEXT NOT NULL,
    "language" TEXT,
    "pageCount" INTEGER,
    "coverImage" TEXT NOT NULL,
    "genres" JSONB NOT NULL,
    "description" TEXT NOT NULL,
    "averageRating" REAL NOT NULL,
    "ratingsCount" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Book" ("author", "averageRating", "coverImage", "createdAt", "description", "genres", "id", "isbn", "language", "pageCount", "publishedDate", "publisher", "ratingsCount", "subtitle", "title", "updatedAt") SELECT "author", "averageRating", "coverImage", "createdAt", "description", "genres", "id", "isbn", "language", "pageCount", "publishedDate", "publisher", "ratingsCount", "subtitle", "title", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
