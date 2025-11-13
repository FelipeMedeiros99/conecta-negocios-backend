/*
  Warnings:

  - You are about to drop the column `tipo` on the `anuncio` table. All the data in the column will be lost.
  - Added the required column `tipo` to the `categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "anuncio" DROP COLUMN "tipo";

-- AlterTable
ALTER TABLE "categoria" ADD COLUMN     "tipo" "TipoAnuncio" NOT NULL;
