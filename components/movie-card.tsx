'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, X } from 'lucide-react'

interface Movie {
  id: string
  title: string
  rating: number
  summary: string
  poster: string
}

interface MovieDetails {
  name: string
  birthDate: string
  birthPlace: string
  image: {
    url: string
  }
  miniBios: {
    text: string
  }[]
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isExpanded && !movieDetails) {
      fetchMovieDetails()
    }
  }, [isExpanded, movieDetails])

  const fetchMovieDetails = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/movie/${movie.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch movie details')
      }
      const data = await response.json()
      setMovieDetails(data)
    } catch (err) {
      setError('Error fetching movie details')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
        isExpanded ? 'fixed inset-0 z-50 flex items-center justify-center' : 'w-72 flex-shrink-0'
      }`}
    >
      <div 
        className={`relative cursor-pointer ${isExpanded ? 'w-full max-w-4xl mx-auto' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Image 
          src={movieDetails?.image?.url || movie.poster} 
          alt={movieDetails?.name || movie.title} 
          width={300} 
          height={400} 
          className={`w-full ${isExpanded ? 'h-96 object-contain' : 'h-96 object-cover'}`}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-xl font-bold mb-1">{movieDetails?.name || movie.title}</h3>
          {movie.rating > 0 && (
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1">{movie.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="p-6 bg-gray-800 overflow-y-auto max-h-screen">
          <button 
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(false)
            }}
            className="absolute top-4 right-4 text-white hover:text-red-500 transition duration-300"
          >
            <X className="w-6 h-6" />
          </button>
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {movieDetails && (
            <>
              <p className="text-gray-300 mb-4">{movieDetails.miniBios?.[0]?.text || movie.summary}</p>
              <div className="space-y-4">
                <h4 className="font-bold text-lg">Details</h4>
                <p>Birth Date: {movieDetails.birthDate || 'N/A'}</p>
                <p>Birth Place: {movieDetails.birthPlace || 'N/A'}</p>
                <h4 className="font-bold text-lg">Trailers</h4>
                <div className="bg-gray-700 h-40 flex items-center justify-center rounded">
                  Trailer placeholder
                </div>
                <h4 className="font-bold text-lg">Showtimes</h4>
                <div className="flex space-x-2">
                  {['12:00', '15:30', '18:00', '21:30'].map((time, index) => (
                    <button key={index} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300">
                      {time}
                    </button>
                  ))}
                </div>
                <h4 className="font-bold text-lg">User Reviews</h4>
                <div className="space-y-2">
                  {[
                    { user: 'MovieBuff', comment: 'Absolutely stunning visuals and a gripping storyline!' },
                    { user: 'CinemaFanatic', comment: 'A must-watch for any serious film enthusiast.' }
                  ].map((review, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded">
                      <p className="font-bold">{review.user}</p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

