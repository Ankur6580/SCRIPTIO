-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Script" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Script_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Script" ("content", "createdAt", "id", "title", "updatedAt", "userId") SELECT "content", "createdAt", "id", "title", "updatedAt", "userId" FROM "Script";
DROP TABLE "Script";
ALTER TABLE "new_Script" RENAME TO "Script";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
