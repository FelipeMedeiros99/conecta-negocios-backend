-- DropForeignKey
ALTER TABLE "imagens" DROP CONSTRAINT "imagens_anuncioId_fkey";

-- AddForeignKey
ALTER TABLE "imagens" ADD CONSTRAINT "imagens_anuncioId_fkey" FOREIGN KEY ("anuncioId") REFERENCES "anuncio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
