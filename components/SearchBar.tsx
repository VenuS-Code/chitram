'use client'

import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'

const mockSuggestions = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "12 Angry Men",
  "Schindler's List"
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.length > 2) {
      const filteredSuggestions = mockSuggestions.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filteredSuggestions)
      setIsOpen(true)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', query)
  }

  return (
    <div className="relative mb-8">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full py-2 px-4 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button type="submit" className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600 transition duration-300">
          <Search className="w-6 h-6" />
        </button>
      </form>
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-gray-800 mt-1 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-300"
              onClick={() => {
                setQuery(suggestion)
                setIsOpen(false)
                if (inputRef.current) inputRef.current.focus()
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}