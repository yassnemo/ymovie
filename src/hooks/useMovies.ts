import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Movie } from '../types/movie'
import { genreMap } from '../utils/genreMap'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const reverseGenreMap: { [key: string]: number } = Object.entries(genreMap).reduce(
  (acc, [id, name]) => ({ ...acc, [name]: parseInt(id) }),
  {}
)

export type MovieCategory = 'popular' | 'top_rated' | 'now_playing' | 'trending'

interface UseMoviesProps {
  searchQuery?: string
  genre?: string
  category?: MovieCategory
}

export default function useMovies({ searchQuery, genre, category }: UseMoviesProps = {}) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const formatMovie = useCallback((movie: any): Movie => ({
    id: movie.id,
    title: movie.title,
    genres: movie.genre_ids?.map((id: number) => genreMap[id]) || [],
    rating: movie.vote_average,
    year: movie.release_date?.split('-')[0] || 'N/A',
    overview: movie.overview || 'No description available',
    posterUrl: movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/no-poster.jpg',
    backdropUrl: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : '/no-backdrop.jpg',
    releaseDate: movie.release_date || 'Unknown',
    popularity: movie.popularity,
    voteCount: movie.vote_count
  }), [])

  const fetchMovies = useCallback(async (pageNumber = 1, isNewSearch = false) => {
    try {
      setLoading(true)
      setError(null)

      let endpoint = '/discover/movie'
      const params: any = {
        api_key: API_KEY,
        page: pageNumber,
        language: 'en-US',
        include_adult: false
      }

      if (category) {
        endpoint = category === 'trending' 
          ? '/trending/movie/week' 
          : `/movie/${category}`
      } else if (searchQuery) {
        endpoint = '/search/movie'
        params.query = searchQuery
      } else {
        params.sort_by = 'popularity.desc'
        if (genre && reverseGenreMap[genre]) {
          params.with_genres = reverseGenreMap[genre]
        }
      }

      const response = await axios.get(`${BASE_URL}${endpoint}`, { params })
      
      setTotalPages(response.data.total_pages)
      
      const newMovies = response.data.results.map(formatMovie)
      setMovies(prev => isNewSearch ? newMovies : [...prev, ...newMovies])
      setPage(pageNumber)

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch movies'))
    } finally {
      setLoading(false)
    }
  }, [searchQuery, genre, category, formatMovie])

  // Initial load and search/genre/category change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchMovies(1, true)
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [fetchMovies])

  // Load more movies
  const loadMore = useCallback(() => {
    if (page < totalPages && !loading) {
      fetchMovies(page + 1)
    }
  }, [page, totalPages, loading, fetchMovies])

  return { 
    movies, 
    loading, 
    error, 
    loadMore, 
    hasMore: page < totalPages 
  }
}