import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const Footer = () => (
  <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
    {'Copyright © '}
    <Link color="inherit" href="https://dvlyon.com/">
      David Lyon
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)

export default Footer
