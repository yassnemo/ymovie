import { useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { Movie } from './types/movie'
import useMovies from './hooks/useMovies'
import SearchBar from './components/SearchBar'
import GenreFilter from './components/GenreFilter'
import MovieCard from './components/MovieCard'

export default function App() {
  const { movies, loading, error } = useMovies()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || movie.genres.includes(selectedGenre)
    return matchesSearch && matchesGenre
  })

  if (error) return <div>Error loading movies</div>
  
  return (
    <Container maxWidth="xl">
      <Typography variant="h2" component="h1" gutterBottom>
        Movie Recommender
      </Typography>
      <SearchBar onSearch={setSearchQuery} />
      <GenreFilter
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Grid container spacing={3}>
          {filteredMovies.map(movie => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}