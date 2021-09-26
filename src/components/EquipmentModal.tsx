import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useStateMachine } from 'little-state-machine'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'

import { IEquipment } from '../types/types'

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

const EquipmentModal = ({
  open,
  setOpen,
  index,
  onAdd,
  onEdit,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  index: number
  onAdd: (equipment: IEquipment) => void
  onEdit: (index: number, equipment: IEquipment) => void
}) => {
  const [id, setId] = useState(0)
  const [name, setName] = useState('')

  const { state } = useStateMachine()

  const { mainStore } = state

  const { equipments } = mainStore

  useEffect(() => {
    if (index >= 0 && equipments[index]) {
      setId(equipments[index].id)
      setName(equipments[index].name)
    } else {
      setId(0)
      setName('')
    }
  }, [index, equipments])

  const handleAdd = () => {
    onAdd({
      id,
      name,
    })
  }

  const handleEdit = () => {
    onEdit(index, {
      id,
      name,
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
          {index >= 0 ? name : 'Add Equipment'}
        </Typography>
        <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          id="id-input"
          label="id"
          variant="standard"
          value={id}
          type="number"
          onChange={e => setId(parseInt(e.target.value, 10))}
        />
        <TextField
          id="name-input"
          label="name"
          variant="standard"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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

export default EquipmentModal
