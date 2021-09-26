import { useState } from 'react'
import { useStateMachine } from 'little-state-machine'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import AddUploadActions from '../components/AddUploadActions'
import Vehicle from '../components/Vehicle'
import VehicleModal from '../components/VehicleModal'
import { updateMainStore } from '../stores/mainStore'
import { IVehicle } from '../types/types'

const Vehicles = () => {
  const [open, setOpen] = useState(false)

  const { actions, state } = useStateMachine({ updateMainStore })

  const { mainStore } = state

  const { vehicles } = mainStore

  const addVehicles = (jsonVehicles: any) => {
    if (jsonVehicles) {
      const newVehicles = [...vehicles]

      jsonVehicles.forEach((vehicle: IVehicle) => {
        if (vehicle.id && !vehicles.some(v => v.id === vehicle.id)) {
          newVehicles.push({
            id: vehicle.id,
            name: vehicle.name || '',
            driver: vehicle.driver || '',
            status: vehicle.status || '',
            fuelType: vehicle.fuelType || '',
            equipments: vehicle.equipments || [],
          })
        }
      })
      
      actions.updateMainStore({
        vehicles: newVehicles,
      })
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <h2>Vehicles</h2>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Load Vehicles
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add vehicles manually or load from a local JSON file.
            </Typography>
          </CardContent>
          <AddUploadActions addData={addVehicles} setOpen={setOpen} />
        </Card>
      </Grid>
      {vehicles.map((vehicle, index) => (
        <Vehicle
          key={'vehicle' + vehicle.id}
          vehicle={vehicle}
          index={index}
        />
      ))}
      <VehicleModal
        open={open}
        setOpen={setOpen}
      />
    </Grid>
  )
}

export default Vehicles
