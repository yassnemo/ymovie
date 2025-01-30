import { Card, CardContent, CardMedia, Typography, Chip, Rating, Box } from '@mui/material'
import { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
  onClick: () => void
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { 
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
        }
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="300"
        image={movie.posterUrl || '/placeholder-movie.jpg'}
        alt={movie.title}
        sx={{ 
          objectFit: 'cover',
          bgcolor: 'grey.100' // Fallback color if image fails to load
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Rating
            value={(movie.rating / 2) || 0}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary">
            ({movie.voteCount.toLocaleString()} votes)
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={1}>
          Released: {new Date(movie.releaseDate).getFullYear()}
        </Typography>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {movie.overview || 'No description available'}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {movie.genres.slice(0, 3).map((genre, index) => (
            <Chip
              key={index}
              label={genre}
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: 'primary.main',
                color: 'primary.main'
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}