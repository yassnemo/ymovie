import { Box, Typography, IconButton, Link } from '@mui/material'
import { GitHub, LinkedIn, Email } from '@mui/icons-material'
import TMDBLogo from '../public/tmdb-logo.svg'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 2,
        px: 0, 
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Box display="flex" justifyContent="center" gap={2} mb={1}>
        <IconButton href="https://github.com/yassnemo" target="_blank">
          <GitHub />
        </IconButton>
        <IconButton href="https://linkedin.com/in/yassine-erradouani" target="_blank">
          <LinkedIn />
        </IconButton>
        <IconButton href="mailto:yassine.erradouani@outlook.com">
          <Email />
        </IconButton>
      </Box>

      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Typography variant="body2" color="text.secondary">
          Data By
        </Typography>
        <img 
          src="/tmdb-logo.svg" 
          alt="TMDB Logo" 
          style={{ height: '20px' }} 
        />
      </Box>

      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Yassine Erradouani
      </Typography>
    </Box>
  )
}