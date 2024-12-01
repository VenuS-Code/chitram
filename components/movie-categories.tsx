import MovieList from './movie-list'

const categories = [
  { id: 'trending', title: 'Trending Now' },
  { id: 'top-rated', title: 'Top Rated' },
  { id: 'upcoming', title: 'Upcoming Releases' },
]

export default function MovieCategories() {
  return (
    <div className="space-y-12">
      {categories.map(category => (
        <section key={category.id}>
          <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
          <MovieList categoryId={category.id} />
        </section>
      ))}
    </div>
  )
}