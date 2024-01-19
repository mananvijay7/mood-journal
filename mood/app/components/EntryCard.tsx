const EntryCard = ({ entry }) => {
      const date = new Date(entry.createdAt).toDateString();
      return (
            <div className="divide-y divide-gray-200 overflow-hidden rounder-lg bg-white shadow">
                  <div className="px-4 py-5">{date}</div>
                  <div className="px-4 py-5">Summary</div>
                  <div className="px-4 py-5">Mood</div>
            </div>
      )
}

export default EntryCard;