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
import { updateUiStore } from '../stores/uiStore'
import { IVehicle } from '../types/types'

const Vehicles = () => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(-1)

  const { actions, state } = useStateMachine({ updateMainStore, updateUiStore })

  const { mainStore } = state

  const { vehicles, favoriteVehicles } = mainStore

  const updateVehicles = (newVehicles: IVehicle[]) => {
    actions.updateMainStore({
      vehicles: newVehicles,
    })
  }

  const setError = () => {
    actions.updateUiStore({
      error: true,
    })
  }

  const handleAdd = () => {
    setOpen(true)
    setIndex(-1)
  }

  const onAdd = (vehicle: IVehicle) => {
    const newVehicles = [...vehicles]

    newVehicles.push(vehicle)

    if (newVehicles.filter(e => e.id === vehicle.id).length <= 1) {
      updateVehicles(newVehicles)
      setOpen(false)
    } else {
      setError()
    }
  }

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

  const handleEdit = (index: number) => {
    setOpen(true)
    setIndex(index)
  }

  const onEdit = (index: number, vehicle: IVehicle) => {
    const newVehicles = [...vehicles]

    newVehicles[index] = vehicle

    if (newVehicles.filter(e => e.id === vehicle.id).length <= 1) {
      updateVehicles(newVehicles)
      setOpen(false)
    } else {
      setError()
    }
  }

  const onDelete = (index: number) => {
    const newVehicles = [...vehicles]

    newVehicles.splice(index, 1)

    updateVehicles(newVehicles)
  }

  const handleUp = (index: number) => {
    const newVehicles = [...vehicles]

    if (index > 0) {
      const dummy = vehicles[index - 1]
      newVehicles[index - 1] = vehicles[index]
      newVehicles[index] = dummy
      updateVehicles(newVehicles)
    }
  }

  const handleDown = (index: number) => {
    const newVehicles = [...vehicles]
    
    if (index < vehicles.length - 1) {
      const dummy = vehicles[index + 1]
      newVehicles[index + 1] = vehicles[index]
      newVehicles[index] = dummy
      updateVehicles(newVehicles)
    }
  }

  const toggleFav = (id: string) => {
    const newFavoriteVehicles = [...favoriteVehicles]

    const index = favoriteVehicles.indexOf(id)

    if (index >= 0) {
      newFavoriteVehicles.splice(index, 1)
    } else {
      newFavoriteVehicles.push(id)
    }

    actions.updateMainStore({
      favoriteVehicles: newFavoriteVehicles,
    })
  }

  vehicles.sort((a, b) => {
    const isAFav = favoriteVehicles.some(fv => fv === a.id)
    const isBFav = favoriteVehicles.some(fv => fv === b.id)

    if (isAFav && !isBFav) {
      return -1
    }
    if (!isAFav && isBFav) {
      return 1
    }
    return 0
  })

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
          <AddUploadActions addData={addVehicles} setOpen={handleAdd} />
        </Card>
      </Grid>
      {vehicles.map((vehicle, index) => (
        <Vehicle
          key={'vehicle' + vehicle.id}
          vehicle={vehicle}
          index={index}
          handleEdit={handleEdit}
          handleDelete={onDelete}
          handleUp={handleUp}
          handleDown={handleDown}
          toggleFav={toggleFav}
        />
      ))}
      <VehicleModal
        open={open}
        setOpen={setOpen}
        index={index}
        onAdd={onAdd}
        onEdit={onEdit}
      />
    </Grid>
  )
}

export default Vehicles
