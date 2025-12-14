/*
  Warnings:

  - You are about to drop the column `user_id` on the `speakers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "speakers" DROP CONSTRAINT "speakers_user_id_fkey";

-- DropIndex
DROP INDEX "speakers_user_id_key";

-- AlterTable
ALTER TABLE "speakers" DROP COLUMN "user_id";
