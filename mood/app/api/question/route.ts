import { getUserByClerkId } from "@/utils/auth";
import { qa } from '@/utils/ai'
import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
export const POST = async (request) => {
      const {question} = await request.json();
      console.log("question here" + question);
      const user = await getUserByClerkId();

      const entries = await prisma.journalEntry.findMany({
            where: {
                  userId: user.id,
            },
            select: {
                  id: true,
                  content: true,
                  createdAt: true,
            },
      })

      const answer = await qa(question, entries);
      return NextResponse.json({data: answer});
}