import { useState } from 'react'
import { Container, Typography, CircularProgress, Box } from '@mui/material'
import { Movie } from './types/movie'
import useMovies, { MovieCategory } from './hooks/useMovies'
import SearchBar from './components/SearchBar'
import GenreFilter from './components/GenreFilter'
import MovieCard from './components/MovieCard'
import MovieDetails from './components/MovieDetails'
import Footer from './components/Footer'
import MovieSection from './components/MovieSection'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  // Category sections
  const { movies: popularMovies, loading: popularLoading } = useMovies({ category: 'popular' })
  const { movies: topRatedMovies, loading: topRatedLoading } = useMovies({ category: 'top_rated' })
  const { movies: nowPlayingMovies, loading: nowPlayingLoading } = useMovies({ category: 'now_playing' })
  const { movies: trendingMovies, loading: trendingLoading } = useMovies({ category: 'trending' })

  // Search/Filter results
  const { movies, loading, error } = useMovies({
    searchQuery,
    genre: selectedGenre !== 'all' ? selectedGenre : undefined
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const showSearchResults = searchQuery || selectedGenre !== 'all'

  if (error) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Typography variant="h6" color="error">
        Error loading movies: {error.message}
      </Typography>
    </Box>
  )

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'background.default'
    }}>
      <Container maxWidth="xl" sx={{ 
        py: 4,
        flex: 1,
        pb: 10 
      }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          YMOVIES
        </Typography>
        
        <Box mb={4} display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
          <SearchBar onSearch={handleSearch} />
          <GenreFilter
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
        </Box>

        {showSearchResults ? (
          // Search/Filter Results Grid
          loading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(5, 1fr)'
                },
                gap: 3
              }}
            >
              {movies.map(movie => (
                <MovieCard 
                  key={movie.id}
                  movie={movie} 
                  onClick={() => setSelectedMovie(movie)}
                />
              ))}
            </Box>
          )
        ) : (
          // Category Sections
          <>
            <MovieSection 
              title="Popular Now" 
              movies={popularMovies} 
            />
            <MovieSection 
              title="Top Rated" 
              movies={topRatedMovies} 
            />
            <MovieSection 
              title="Now in Cinemas" 
              movies={nowPlayingMovies} 
            />
            <MovieSection 
              title="Trending This Week" 
              movies={trendingMovies} 
            />
          </>
        )}

        <MovieDetails 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      </Container>

      <Box sx={{ mt: 4 }}>
        <Footer />
      </Box>
    </Box>
  )
}