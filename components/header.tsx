import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-red-500 hover:text-red-600 transition duration-300">
          CineDiscover
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-white hover:text-red-500 transition duration-300">Home</Link></li>
            <li><Link href="/movies" className="text-white hover:text-red-500 transition duration-300">Movies</Link></li>
            <li><Link href="/tv-shows" className="text-white hover:text-red-500 transition duration-300">TV Shows</Link></li>
            <li><Link href="/my-list" className="text-white hover:text-red-500 transition duration-300">My List</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}