import { Box, Typography, Skeleton } from '@mui/material'
import { Movie } from '../types/movie'
import MovieCard from './MovieCard'

interface MovieSectionProps {
  title: string
  movies: Movie[]
  loading?: boolean
}

export default function MovieSection({ title, movies, loading }: MovieSectionProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2" sx={{ 
        mb: 2,
        fontWeight: 600,
        pl: 2,
        color: 'text.primary'
      }}>
        {title}
      </Typography>
      
      <Box sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 3,
        pb: 2,
        px: 2,
        scrollSnapType: 'x mandatory',
        '&::-webkit-scrollbar': {
          height: 8,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'divider',
          borderRadius: 4,
        }
      }}>
        {loading ? (
          // Loading skeletons
          [...Array(4)].map((_, index) => (
            <Box key={index} sx={{ 
              minWidth: 250,
              scrollSnapAlign: 'start'
            }}>
              <Skeleton 
                variant="rectangular" 
                width={250} 
                height={400}
                sx={{ borderRadius: 2 }}
              />
              <Box sx={{ pt: 1 }}>
                <Skeleton width="60%" />
                <Skeleton width="40%" />
                <Skeleton width="80%" height={60} />
              </Box>
            </Box>
          ))
        ) : (
          // Actual movie cards
          movies.map(movie => (
            <Box key={movie.id} sx={{ 
              minWidth: 250,
              scrollSnapAlign: 'start'
            }}>
              <MovieCard 
                movie={movie} 
                onClick={() => {/* click handler */}}
              />
            </Box>
          ))
        )}
      </Box>
    </Box>
  )
}