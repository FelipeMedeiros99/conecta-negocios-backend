/*
  Warnings:

  - You are about to alter the column `descricao` on the `anuncio` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2000)`.

*/
-- AlterTable
ALTER TABLE "anuncio" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(2000);

-- CreateTable
CREATE TABLE "imagens" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "anuncioId" INTEGER NOT NULL,

    CONSTRAINT "imagens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "imagens" ADD CONSTRAINT "imagens_anuncioId_fkey" FOREIGN KEY ("anuncioId") REFERENCES "anuncio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
