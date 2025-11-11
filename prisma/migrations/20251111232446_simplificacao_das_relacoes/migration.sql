/*
  Warnings:

  - You are about to drop the column `cidadeId` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `cidadeId` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `cidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `estado` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cidade` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "anuncio" DROP CONSTRAINT "anuncio_cidadeId_fkey";

-- DropForeignKey
ALTER TABLE "cidade" DROP CONSTRAINT "cidade_estadoId_fkey";

-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_cidadeId_fkey";

-- AlterTable
ALTER TABLE "anuncio" DROP COLUMN "cidadeId";

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "cidadeId",
ADD COLUMN     "cidade" VARCHAR(100) NOT NULL,
ADD COLUMN     "estado" VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE "cidade";

-- DropTable
DROP TABLE "estado";
