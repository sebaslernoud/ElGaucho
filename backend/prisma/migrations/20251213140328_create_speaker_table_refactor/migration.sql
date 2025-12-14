-- DropForeignKey
ALTER TABLE "talks" DROP CONSTRAINT "talks_speaker_id_fkey";

-- CreateTable
CREATE TABLE "speakers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "speaker_name" TEXT NOT NULL,
    "bio" TEXT,
    "expertise" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speakers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "speakers_user_id_key" ON "speakers"("user_id");

-- AddForeignKey
ALTER TABLE "speakers" ADD CONSTRAINT "speakers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talks" ADD CONSTRAINT "talks_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "speakers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
