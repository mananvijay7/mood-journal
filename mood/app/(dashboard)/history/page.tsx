import HistoryChart from "@/app/components/historyChart";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getdata = async () => {
      const user = await getUserByClerkId();
      const analyses = await prisma.analysis.findMany({
            where: {
                  userId: user.id,
            },
            select: {
                  sentimentScore: true,
            },
            orderBy: {
                  createdAt: 'asc',
            },
      })
      const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0);
      const average = Math.round(sum / analyses.length);
      return {analyses, average};
}

const history = async () => {
      const {average, analyses} = await getdata();
      //console.log(analyses);
      return (
            <div className="w-full h-full">
                  <div>
                        {`Avg. Sentiment ${average}`}
                  </div>
                  <div className="w-full h-full">
                        <HistoryChart data={analyses}/>
                  </div>
            </div>
      )
}

export default history;