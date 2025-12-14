/*
  Warnings:

  - You are about to drop the column `end_time` on the `talks` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `talks` table. All the data in the column will be lost.
  - You are about to drop the column `speaker_name` on the `talks` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `talks` table. All the data in the column will be lost.
  - Added the required column `date` to the `talks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `talks` table without a default value. This is not possible if the table is not empty.
  - Made the column `speaker_id` on table `talks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "talks" DROP CONSTRAINT "talks_speaker_id_fkey";

-- AlterTable
ALTER TABLE "talks" DROP COLUMN "end_time",
DROP COLUMN "room",
DROP COLUMN "speaker_name",
DROP COLUMN "start_time",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "max_attendees" INTEGER,
ADD COLUMN     "qr_code_url" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'upcoming',
ALTER COLUMN "speaker_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "talks" ADD CONSTRAINT "talks_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
