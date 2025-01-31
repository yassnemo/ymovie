import { useState } from 'react'
import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material'
import { Movie } from './types/movie'
import useMovies from './hooks/useMovies'
import SearchBar from './components/SearchBar'
import GenreFilter from './components/GenreFilter'
import MovieCard from './components/MovieCard'
import MovieDetails from './components/MovieDetails'
import Footer from './components/Footer'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  
  const { movies, loading, error } = useMovies({
    searchQuery,
    genre: selectedGenre !== 'all' ? selectedGenre : undefined
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

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

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {movies.map(movie => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard 
                  movie={movie} 
                  onClick={() => setSelectedMovie(movie)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <MovieDetails 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      </Container>

      {/* Footer with spacing */}
      <Box sx={{ mt: 4 }}> {/* Spacer */}
        <Footer />
      </Box>
    </Box>
  )
}