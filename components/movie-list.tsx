'use client'

import { useState } from 'react'
import MovieCard from './movie-card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Mock data with IMDB IDs
const mockMovies = {
  'trending': [
    { id: "nm0000093", title: "Brad Pitt", rating: 4.8, summary: "William Bradley Pitt is an American actor and film producer.", poster: "/placeholder.svg?height=400&width=300" },
    { id: "nm0000138", title: "Leonardo DiCaprio", rating: 4.7, summary: "Leonardo Wilhelm DiCaprio is an American actor, film producer, and environmentalist.", poster: "/placeholder.svg?height=400&width=300" },
    { id: "nm0000204", title: "Angelina Jolie", rating: 4.6, summary: "Angelina Jolie is an American actress, filmmaker, and humanitarian.", poster: "/placeholder.svg?height=400&width=300" },
    { id: "nm0000288", title: "Christian Bale", rating: 4.9, summary: "Christian Charles Philip Bale is an English actor.", poster: "/placeholder.svg?height=400&width=300" },
    { id: "nm0000168", title: "Samuel L. Jackson", rating: 4.8, summary: "Samuel Leroy Jackson is an American actor and producer.", poster: "/placeholder.svg?height=400&width=300" },
  ],
  'top-rated': [
    { id: "nm0000209", title: "Morgan Freeman", rating: 4.9, summary: "Morgan Freeman is an American actor, director, and narrator.", poster: "/placeholder.svg?height=400&width=300" },
    { id: "nm0000199", title: "Al Pacino", rating: 4.9, summary: "Alfredo James Pacino is an American actor and filmmaker.", poster: "/placeholder.svg?height=400&width=300" },
    { id: "nm0000134", title: "Robert De Niro", rating: 4.7, summary: "Robert Anthony De Niro Jr. is an American actor, producer, and director.", poster: "/placeholder.svg?height=400&width=300" },
    { id: "nm0000158", title: "Tom Hanks", rating: 4.9, summary: "Thomas Jeffrey Hanks is an American actor and filmmaker.", poster: "/placeholder.svg?height=400&width=300" },
    { id: "nm0000164", title: "Dustin Hoffman", rating: 4.8, summary: "Dustin Lee Hoffman is an American actor and filmmaker.", poster: "/placeholder.svg?height=400&width=300" },
  ],
  'upcoming': [
    { id: "nm0000375", title: "Robert Downey Jr.", rating: 0, summary: "Robert John Downey Jr. is an American actor and producer.", poster: "/placeholder.svg?height=400&width=300" },
    { id: "nm0000354", title: "Matt Damon", rating: 0, summary: "Matthew Paige Damon is an American actor, film producer, and screenwriter.", poster: "/placeholder.svg?height=400&width=300" },
    { id: "nm0000129", title: "Tom Cruise", rating: 0, summary: "Thomas Cruise Mapother IV is an American actor and producer.", poster: "/placeholder.svg?height=400&width=300" },
    { id: "nm0000190", title: "Meryl Streep", rating: 0, summary: "Mary Louise 'Meryl' Streep is an American actress.", poster: "/placeholder.svg?height=400&width=300" },
    { id: "nm0000243", title: "Denzel Washington", rating: 0, summary: "Denzel Hayes Washington Jr. is an American actor, director, and producer.", poster: "/placeholder.svg?height=400&width=300" },
  ]
}

export default function MovieList({ categoryId }: { categoryId: string }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const movies = mockMovies[categoryId as keyof typeof mockMovies] || []

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`movie-list-${categoryId}`)
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(container.scrollLeft + scrollAmount)
    }
  }

  return (
    <div className="relative">
      <div 
        id={`movie-list-${categoryId}`}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {scrollPosition > 0 && (
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}
      {scrollPosition < (movies.length - 1) * 300 && (
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  )
}

