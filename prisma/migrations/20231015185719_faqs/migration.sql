-- CreateTable
CREATE TABLE "Faqs" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "ans" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faqs_pkey" PRIMARY KEY ("id")
);
