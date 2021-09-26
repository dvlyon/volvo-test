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
import { IEquipment } from '../types/types'

const Equipments = () => {
  const [open, setOpen] = useState(false)

  const { actions, state } = useStateMachine({ updateMainStore })

  const { mainStore } = state

  const { equipments } = mainStore

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
          <AddUploadActions addData={addEquipments} setOpen={setOpen} />
        </Card>
      </Grid>
      {equipments.map((equipment, index) => (
        <Equipment
          key={'equipment' + equipment.id}
          equipment={equipment}
          index={index}
        />
      ))}
      <EquipmentModal
        open={open}
        setOpen={setOpen}
      />
    </Grid>
  )
}

export default Equipments
