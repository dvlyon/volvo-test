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

import Equipment from '../components/Equipment'
import EquipmentModal from '../components/EquipmentModal'
import { updateMainStore } from '../stores/mainStore'
import { IEquipment } from '../types/types'

const Input = styled('input')({
  display: 'none',
})

const Equipments = () => {
  const [open, setOpen] = useState(false)

  const { actions, state } = useStateMachine({ updateMainStore })

  const { mainStore } = state

  const { equipments } = mainStore

  let fileReader: FileReader

  const handleFileRead = () => {
    const content = fileReader.result

    const jsonEquipments = JSON.parse(content as string)

    if (jsonEquipments) {
      const newEquipments = [ ...equipments ]

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
              Add Equipments
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add equipments manually or load from a local JSON file.
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
      {equipments.map(equipment => (
        <Equipment key={'equipment' + equipment.id} equipment={equipment} />
      ))}
      <EquipmentModal
        open={open}
        setOpen={setOpen}
      />
    </Grid>
  )
}

export default Equipments
