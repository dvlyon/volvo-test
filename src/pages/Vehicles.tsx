import { useState } from 'react'
import { useStateMachine } from 'little-state-machine'

import { styled } from '@mui/material/styles'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import AddBoxIcon from '@mui/icons-material/AddBox'
import FileUploadIcon from '@mui/icons-material/FileUpload'

import Vehicle from '../components/Vehicle'
import VehicleModal from '../components/VehicleModal'
import { updateMainStore } from '../stores/mainStore'
import { IVehicle } from '../types/types'

const Input = styled('input')({
  display: 'none',
})

const Vehicles = () => {
  const [open, setOpen] = useState(false)

  const { actions, state } = useStateMachine({ updateMainStore })

  const { mainStore } = state

  const { vehicles } = mainStore

  let fileReader: FileReader

  const handleFileRead = () => {
    const content = fileReader.result

    const jsonVehicles = JSON.parse(content as string)

    if (jsonVehicles) {
      const newVehicles = [ ...vehicles ]

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

  const handleFileChosen = (file: Blob | null) => {
    if (file) {
      fileReader = new FileReader()
      fileReader.onloadend = handleFileRead
      fileReader.readAsText(file)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Load Vehicles
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add vehicles manually or load from a local JSON file.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              component="span"
              endIcon={<AddBoxIcon />}
              sx={{ marginRight: '6px' }}
              onClick={() => setOpen(true)}
            >
              Add
            </Button>
            <label htmlFor="contained-button-file">
              <Input
                id="contained-button-file"
                accept=".json"
                type="file"
                onChange={e => handleFileChosen(e.target.files && e.target.files[0])}
              />
              <Button variant="contained" component="span" endIcon={<FileUploadIcon />}>
                Upload
              </Button>
            </label>
          </CardActions>
        </Card>
      </Grid>
      {vehicles.map(vehicle => (
        <Vehicle key={'vehicle' + vehicle.id} vehicle={vehicle} />
      ))}
      <VehicleModal
        open={open}
        setOpen={setOpen}
      />
    </Grid>
  )
}

export default Vehicles
