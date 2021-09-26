import { useStateMachine } from 'little-state-machine'
import { Link as RouterLink } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MuiCardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'

import car from '../assets/car.svg'
import equip from '../assets/equip.svg'

const CardMedia = ({ src }: { src: string }) => (
  <div style={{ padding: '16px' }}>
    <MuiCardMedia
      component="img"
      height="140"
      src={src}
      alt="Vehicles"
      sx={{ objectFit: 'fill' }}
    />
  </div>
)

const Dashboard = () => {
  const { state } = useStateMachine()

  const { mainStore } = state

  const { equipments, vehicles } = mainStore

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Dashboard</h2>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardActionArea component={RouterLink} to='/vehicles'>
            <CardMedia src={car} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Vehicles
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You currently have { vehicles.length } vehicles registered.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardActionArea component={RouterLink} to='/equipments'>
            <CardMedia src={equip} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Equipments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You currently have { equipments.length } equipments registered.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Dashboard
