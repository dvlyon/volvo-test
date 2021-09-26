import { Dispatch, forwardRef, SetStateAction, useState } from 'react'
import { useStateMachine } from 'little-state-machine'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Divider from '@mui/material/Divider'

import { updateMainStore } from '../stores/mainStore'
import { IEquipment } from '../types/types'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

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

const EquipmentModal = ({ open, setOpen }: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const { actions, state } = useStateMachine({ updateMainStore })

  const { mainStore } = state

  const { equipments } = mainStore

  const onSave = () => {
    const newEquipments = [ ...equipments ]

    newEquipments.push({
      id,
      name,
    })

    if (newEquipments.filter(e => e.id === id).length <= 1) {
      actions.updateMainStore({
        equipments: newEquipments,
      })
      setOpen(false)
    } else {
      setError(true)
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Equipment
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
          <Button onClick={onSave}>
            Save
          </Button>
          <Button variant="outlined" color="error" onClick={() => {
            setId(0)
            setName('')
            setOpen(false)
          }}>
            Cancel
          </Button>
        </Box>
      </Modal>
      <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
          This id is already in use!
        </Alert>
      </Snackbar>
    </>
  )
}

export default EquipmentModal
