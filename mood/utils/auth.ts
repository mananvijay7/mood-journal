import { auth } from "@clerk/nextjs";
import { prisma } from "./db";

export const getUserByClerkId = async () => {
      const { userId } = await auth();

      const user = await prisma.user.findUniqueOrThrow({
            where: {
                  clerkId: userId,
            },
            // select: opts.select || {},                       //to select attributes from the schema
            // includes: opts.select || {},                     //to select relationship attributes from the schema
      });

      return user;
}