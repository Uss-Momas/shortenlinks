-- CreateTable
CREATE TABLE "short_links" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "short_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "short_links_code_key" ON "short_links"("code");
