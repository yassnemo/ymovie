import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { genreMap } from '../utils/genreMap';

interface GenreFilterProps {
  selectedGenre: string
  onGenreChange: (genre: string) => void
}

export default function GenreFilter({ selectedGenre, onGenreChange }: GenreFilterProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onGenreChange(event.target.value as string)
  }

  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>Genre</InputLabel>
      <Select
        value={selectedGenre}
        label="Genre"
        onChange={handleChange}
      >
        <MenuItem value="all">All Genres</MenuItem>
        {Object.values(genreMap).map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}