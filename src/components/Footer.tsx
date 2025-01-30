import { Box, Typography, IconButton, Link } from '@mui/material'
import { GitHub, LinkedIn, Email } from '@mui/icons-material'
import TMDBLogo from '../public/tmdb-logo.svg'

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        textAlign: 'center',
      }}
    >
      <Box display="flex" justifyContent="center" gap={2} mb={1}>
        <IconButton 
          href="https://github.com/yassnemo" 
          target="_blank" 
          rel="noopener"
        >
          <GitHub />
        </IconButton>
        
        <IconButton 
          href="https://linkedin.com/in/yassine-erradouani" 
          target="_blank" 
          rel="noopener"
        >
          <LinkedIn />
        </IconButton>
        
        <IconButton href="mailto:yassine.erradouani@outlook.com">
          <Email />
        </IconButton>
      </Box>

      <Typography variant="body2" color="text.secondary">
        Developed by Yassine Erradouani
      </Typography>

      <Box mt={1} display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Typography variant="body2" color="text.secondary">
          Data By:
        </Typography>
        <Link 
          href="https://www.themoviedb.org/" 
          target="_blank" 
          rel="noopener"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <img 
            src="/tmdb-logo.svg" 
            alt="TMDB Logo" 
            style={{ height: '20px' }} 
          />
        </Link>
      </Box>
    </Box>
  )
}