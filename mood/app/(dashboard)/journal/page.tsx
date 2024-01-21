import EntryCard from "@/app/components/EntryCard";
import NewEntryCard from "@/app/components/NewEntryCard";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";

const getEntries = async () => {
      const user = await getUserByClerkId();

      const entries = await prisma.journalEntry.findMany({
            where: {
                  userId: user.id,
            },
            orderBy: {
                  createdAt: 'desc',
            }
      })

      await analyze(`
      Today was really a good day from heart I purchased a pair of shoes that I was trying to get since
      a long time, but it costed me more than I thought it would.
      `);
      return entries; 
}


const JournalPage = async () => {
      const entries = await getEntries();
      console.log('entries ' + entries);
      return (
            <div className="p-10 bg-zinc-400/10 h-full">
                  <h2 className="text-3xl mb-8">Journal</h2>
                  <div className = 'grid grid-cols-3 gap-4 p-10'>
                  <NewEntryCard />
                  {entries.map(entry => (
                        <Link href={`/journal/${entry.id}`} key={entry.id}>
                        <EntryCard  entry={entry} />
                        </Link>
                  ))}
                  </div>
            </div>
            )
}

export default JournalPage;

