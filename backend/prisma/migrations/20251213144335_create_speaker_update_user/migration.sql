/*
  Warnings:

  - You are about to drop the column `location` on the `talks` table. All the data in the column will be lost.
  - You are about to drop the column `max_attendees` on the `talks` table. All the data in the column will be lost.
  - You are about to drop the column `qr_code_url` on the `talks` table. All the data in the column will be lost.
  - Added the required column `room` to the `talks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "talks" DROP COLUMN "location",
DROP COLUMN "max_attendees",
DROP COLUMN "qr_code_url",
ADD COLUMN     "room" TEXT NOT NULL;
