import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div>
        <h1 className="text-6xl">Welcome to mood.ai</h1>
        <p className="text-3xl text-white/60">Become closer to the Self</p>
        <p className="text-white/50 mb-4">Journal your thoughts, track your moods.</p>
        <div>
          <Link href="/journal">
            <button className="bg-white text-black px-4 py-2 rounded-lg text-xl">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
