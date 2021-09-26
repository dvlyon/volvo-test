import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useStateMachine } from 'little-state-machine'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import { IVehicle } from '../types/types'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const VehicleModal = ({
  open,
  setOpen,
  index,
  onAdd,
  onEdit,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  index: number
  onAdd: (equipment: IVehicle) => void
  onEdit: (index: number, equipment: IVehicle) => void
}) => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [driver, setDriver] = useState('')
  const [status, setStatus] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [equips, setEquips] = useState<number[]>([])

  const { state } = useStateMachine()

  const { mainStore } = state

  const { equipments, vehicles } = mainStore

  useEffect(() => {
    if (index >= 0 && vehicles[index]) {
      setId(vehicles[index].id)
      setName(vehicles[index].name)
      setDriver(vehicles[index].driver)
      setStatus(vehicles[index].status)
      setFuelType(vehicles[index].fuelType)
      setEquips(vehicles[index].equipments)
    } else {
      setId('')
      setName('')
      setDriver('')
      setStatus('')
      setFuelType('')
      setEquips([])
    }
  }, [index, vehicles])

  const handleAdd = () => {
    onAdd({
      id,
      name,
      driver,
      status,
      fuelType,
      equipments: equips,
    })
  }

  const handleEdit = () => {
    onEdit(index, {
      id,
      name,
      driver,
      status,
      fuelType,
      equipments: equips,
    })
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {index >= 0 ? name : 'Add Vehicle'}
        </Typography>
        <TextField
          id="id-input"
          label="id"
          variant="standard"
          value={id}
          onChange={e => setId(e.target.value)}
        />
        <TextField
          id="name-input"
          label="name"
          variant="standard"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          id="driver-input"
          label="driver"
          variant="standard"
          value={driver}
          onChange={e => setDriver(e.target.value)}
        />
        <TextField
          id="status-input"
          label="status"
          variant="standard"
          value={status}
          onChange={e => setStatus(e.target.value)}
        />
        <TextField
          id="fuelType-input"
          label="fuelType"
          variant="standard"
          value={fuelType}
          onChange={e => setFuelType(e.target.value)}
        />
        <Divider sx={{ margin: '16px 0' }} />
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Equipments</FormLabel>
          <FormGroup>
            {equipments.map(equipment => (
              <FormControlLabel
                key={'vehicle' + index + 'equip' + equipment.id}
                control={
                  <Checkbox
                    checked={equips && !!equips.find(e => e === equipment.id)}
                    onChange={e => {
                      const newEquips = [...equips]
                      const index = newEquips.indexOf(equipment.id)

                      if (e.target.checked && index < 0) {
                        newEquips.push(equipment.id)
                      } else if (index >= 0) {
                        newEquips.splice(index, 1)
                      }

                      setEquips(newEquips)
                    }}
                    name={equipment.name}
                  />
                }
                label={equipment.name}
              />
            ))}
          </FormGroup>
        </FormControl>
        <Divider sx={{ margin: '16px 0' }} />
        <Button onClick={index >= 0 ? handleEdit : handleAdd}>
          {index >= 0 ? 'Edit' : 'Save'}
        </Button>
        <Button variant="outlined" color="error" onClick={() => {
          setOpen(false)
        }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  )
}

export default VehicleModal
