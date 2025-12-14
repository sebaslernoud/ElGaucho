/*
  Warnings:

  - You are about to drop the column `date` on the `talks` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `talks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `talks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "talks" DROP COLUMN "date",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;
