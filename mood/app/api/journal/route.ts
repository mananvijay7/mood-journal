import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async () => {
      const user = await getUserByClerkId();

      const entry = await prisma.journalEntry.create({
            data: {
                  userId: user.id,
                  content: 'Write About you Day!',
            },
      });
      return NextResponse.json({ data: entry })
}