import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Movie } from '../types/movie';

interface MovieDetailsProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieDetails({ movie, onClose }: MovieDetailsProps) {
  return (
    <Dialog open={!!movie} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {movie?.title}
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {movie && (
          <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
            <img 
              src={`https://image.tmdb.org/t/p/w1280${movie.backdropUrl}`}
              alt={movie.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <Typography variant="body1">{movie.overview}</Typography>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Typography variant="subtitle1">Rating: {movie.rating}/10</Typography>
              <Typography variant="subtitle1">Release Date: {movie.releaseDate}</Typography>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}