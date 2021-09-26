import { useState } from 'react'
import { useStateMachine } from 'little-state-machine'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import AddUploadActions from '../components/AddUploadActions'
import Equipment from '../components/Equipment'
import EquipmentModal from '../components/EquipmentModal'
import { updateMainStore } from '../stores/mainStore'
import { updateUiStore } from '../stores/uiStore'
import { IEquipment } from '../types/types'

const Equipments = () => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(-1)

  const { actions, state } = useStateMachine({ updateMainStore, updateUiStore })

  const { mainStore } = state

  const { equipments, favoriteEquipments } = mainStore

  const updateEquipments = (newEquipments: IEquipment[]) => {
    actions.updateMainStore({
      equipments: newEquipments,
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

  const onAdd = (equipment: IEquipment) => {
    const newEquipments = [...equipments]

    newEquipments.push(equipment)

    if (newEquipments.filter(e => e.id === equipment.id).length <= 1) {
      updateEquipments(newEquipments)
      setOpen(false)
    } else {
      setError()
    }
  }

  const addEquipments = (jsonEquipments: any) => {
    if (jsonEquipments) {
      const newEquipments = [...equipments]

      jsonEquipments.forEach((equipment: IEquipment) => {
        if (equipment.id && !equipments.some(e => e.id === equipment.id)) {
          newEquipments.push({
            id: equipment.id,
            name: equipment.name || '',
          })
        }
      })
      
      updateEquipments(newEquipments)
    }
  }

  const handleEdit = (index: number) => {
    setOpen(true)
    setIndex(index)
  }

  const onEdit = (index: number, equipment: IEquipment) => {
    const newEquipments = [...equipments]

    newEquipments[index] = equipment

    if (newEquipments.filter(e => e.id === equipment.id).length <= 1) {
      updateEquipments(newEquipments)
      setOpen(false)
    } else {
      setError()
    }
  }

  const onDelete = (index: number) => {
    const newEquipments = [...equipments]

    newEquipments.splice(index, 1)

    updateEquipments(newEquipments)
  }

  const handleUp = (index: number) => {
    const newEquipments = [...equipments]

    if (index > 0) {
      const dummy = equipments[index - 1]
      newEquipments[index - 1] = equipments[index]
      newEquipments[index] = dummy
      updateEquipments(newEquipments)
    }
  }

  const handleDown = (index: number) => {
    const newEquipments = [...equipments]
    
    if (index < equipments.length - 1) {
      const dummy = equipments[index + 1]
      newEquipments[index + 1] = equipments[index]
      newEquipments[index] = dummy
      updateEquipments(newEquipments)
    }
  }

  const toggleFav = (id: number) => {
    const newFavoriteEquipments = [...favoriteEquipments]

    const index = favoriteEquipments.indexOf(id)

    if (index >= 0) {
      newFavoriteEquipments.splice(index, 1)
    } else {
      newFavoriteEquipments.push(id)
    }

    actions.updateMainStore({
      favoriteEquipments: newFavoriteEquipments,
    })
  }

  equipments.sort((a, b) => {
    const isAFav = favoriteEquipments.some(fe => fe === a.id)
    const isBFav = favoriteEquipments.some(fe => fe === b.id)

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
        <h2>Equipments</h2>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Add Equipments
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add equipments manually or load from a local JSON file.
            </Typography>
          </CardContent>
          <AddUploadActions addData={addEquipments} setOpen={handleAdd} />
        </Card>
      </Grid>
      {equipments.map((equipment, index) => (
        <Equipment
          key={'equipment' + equipment.id}
          equipment={equipment}
          index={index}
          handleEdit={handleEdit}
          handleDelete={onDelete}
          handleUp={handleUp}
          handleDown={handleDown}
          toggleFav={toggleFav}
        />
      ))}
      <EquipmentModal
        open={open}
        setOpen={setOpen}
        index={index}
        onAdd={onAdd}
        onEdit={onEdit}
      />
    </Grid>
  )
}

export default Equipments
