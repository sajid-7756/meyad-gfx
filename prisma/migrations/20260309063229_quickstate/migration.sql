-- CreateTable
CREATE TABLE "QuickStats" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuickStats_pkey" PRIMARY KEY ("id")
);
