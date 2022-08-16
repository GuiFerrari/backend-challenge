-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "repository_link" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "grade" INTEGER NOT NULL,
    "id_challenge" TEXT NOT NULL,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_id_challenge_fkey" FOREIGN KEY ("id_challenge") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
