-- CreateEnum
CREATE TYPE "TipoAnuncio" AS ENUM ('PRODUTO', 'SERVICO');

-- CreateTable
CREATE TABLE "estado" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,

    CONSTRAINT "estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cidade" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "estadoId" INTEGER NOT NULL,

    CONSTRAINT "cidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "logradouro" VARCHAR(100) NOT NULL,
    "numero" VARCHAR(10) NOT NULL,
    "complemento" VARCHAR(100),
    "bairro" VARCHAR(100) NOT NULL,
    "cidadeId" INTEGER NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anuncio" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "tipo" "TipoAnuncio" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cidadeId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "anuncio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "estado_uf_key" ON "estado"("uf");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nome_key" ON "categoria"("nome");

-- AddForeignKey
ALTER TABLE "cidade" ADD CONSTRAINT "cidade_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anuncio" ADD CONSTRAINT "anuncio_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anuncio" ADD CONSTRAINT "anuncio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anuncio" ADD CONSTRAINT "anuncio_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
