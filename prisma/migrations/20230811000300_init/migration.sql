-- CreateTable
CREATE TABLE "IOTWR" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guid" TEXT NOT NULL,
    "rid" TEXT NOT NULL,
    "cid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "IOTWR_guid_key" ON "IOTWR"("guid");
