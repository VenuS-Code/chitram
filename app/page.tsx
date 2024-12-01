import MovieCategories from '../components/movie-categories'
import SearchBar from '../components/SearchBar'
import Header from '../components/header'
import Footer from '../components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchBar />
        <MovieCategories />
      </main>
      <Footer />
    </div>
  )
}

