import { useEffect, useState } from 'react'
import axios from 'axios'
import { Movie } from '../types/movie'
import { genreMap } from '../utils/genreMap'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export default function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch movies
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: false,
            page: 1,
            language: 'en-US'
          }
        })

        // Format movies data
        const formattedMovies = response.data.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          genres: movie.genre_ids.map((id: number) => genreMap[id]),
          rating: movie.vote_average,
          year: movie.release_date.split('-')[0],
          overview: movie.overview,
          posterUrl: movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/no-poster.jpg',
          backdropUrl: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
            : '/no-backdrop.jpg',
          releaseDate: movie.release_date,
          popularity: movie.popularity,
          voteCount: movie.vote_count
        }))

        setMovies(formattedMovies)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return { movies, loading, error }
}