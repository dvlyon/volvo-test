import { forwardRef, useState } from 'react'
import { useStateMachine } from 'little-state-machine'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

import AddUploadActions from '../components/AddUploadActions'
import Equipment from '../components/Equipment'
import EquipmentModal from '../components/EquipmentModal'
import { updateMainStore } from '../stores/mainStore'
import { IEquipment } from '../types/types'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Equipments = () => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(-1)
  const [error, setError] = useState(false)

  const { actions, state } = useStateMachine({ updateMainStore })

  const { mainStore } = state

  const { equipments } = mainStore

  const handleAdd = () => {
    setOpen(true)
    setIndex(-1)
  }

  const onAdd = (equipment: IEquipment) => {
    const newEquipments = [...equipments]

    newEquipments.push(equipment)

    if (newEquipments.filter(e => e.id === equipment.id).length <= 1) {
      actions.updateMainStore({
        equipments: newEquipments,
      })
      setOpen(false)
    } else {
      setError(true)
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
      
      actions.updateMainStore({
        equipments: newEquipments,
      })
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
      actions.updateMainStore({
        equipments: newEquipments,
      })
      setOpen(false)
    } else {
      setError(true)
    }
  }

  const onDelete = (index: number) => {
    const newEquipments = [...equipments]

    newEquipments.splice(index, 1)

    actions.updateMainStore({
      equipments: newEquipments,
    })
  }

  const handleUp = (index: number) => {
    const newEquipments = [...equipments]

    if (index > 0) {
      const dummy = equipments[index - 1]
      newEquipments[index - 1] = equipments[index]
      newEquipments[index] = dummy
      actions.updateMainStore({
        equipments: newEquipments,
      })
    }
  }

  const handleDown = (index: number) => {
    const newEquipments = [...equipments]
    
    if (index < equipments.length - 1) {
      const dummy = equipments[index + 1]
      newEquipments[index + 1] = equipments[index]
      newEquipments[index] = dummy
      actions.updateMainStore({
        equipments: newEquipments,
      })
    }
  }

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
        />
      ))}
      <EquipmentModal
        open={open}
        setOpen={setOpen}
        index={index}
        onAdd={onAdd}
        onEdit={onEdit}
      />
      <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
          This id is already in use!
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default Equipments
