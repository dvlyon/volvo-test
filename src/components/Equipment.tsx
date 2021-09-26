import { forwardRef, useState } from 'react'
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
import IconButton from '@mui/material/IconButton'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

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

const Equipment = ({ equipment, index }: {
  equipment: IEquipment
  index: number
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [id, setId] = useState(equipment.id)
  const [name, setName] = useState(equipment.name)
  const [error, setError] = useState(false)

  const { actions, state } = useStateMachine({ updateMainStore })

  const { mainStore } = state

  const { equipments, vehicles } = mainStore

  const onDelete = () => {
    const newEquipments = [ ...equipments ]

    newEquipments.splice(equipments.indexOf(equipment), 1)

    actions.updateMainStore({
      equipments: newEquipments,
    })
  }

  const onEdit = () => {
    const newEquipments = [...equipments]

    newEquipments[equipments.indexOf(equipment)] = {
      id,
      name,
    }

    if (newEquipments.filter(e => e.id === id).length <= 1) {
      actions.updateMainStore({
        equipments: newEquipments,
      })
      setModalOpen(false)
    } else {
      setError(true)
    }
  }

  const moveUp = () => {
    const newEquipments = [...equipments]
    const index = equipments.indexOf(equipment)
    if (index > 0) {
      const dummy = equipments[index - 1]
      newEquipments[index - 1] = equipment
      newEquipments[index] = dummy
      actions.updateMainStore({
        equipments: newEquipments,
      })
    }
  }

  const moveDown = () => {
    const newEquipments = [...equipments]
    const index = equipments.indexOf(equipment)
    if (index < equipments.length - 1) {
      const dummy = equipments[index + 1]
      newEquipments[index + 1] = equipment
      newEquipments[index] = dummy
      actions.updateMainStore({
        equipments: newEquipments,
      })
    }
  }

  const inUse = vehicles.filter(v => v.equipments.includes(equipment.id)).length

  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { equipment.name }
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="vehicle table">
              <TableBody>
                {(Object.keys(equipment) as Array<keyof IEquipment>).map((key, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      { key }
                    </TableCell>
                    <TableCell align="right">{ equipment[key] }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ margin: '16px 0' }} />
          { inUse > 0 ?
            <span>Currently equipped on { inUse } vehicles.</span> :
            <span>Not currently equipped.</span>
          }
        </CardContent>
        <CardActions>
          <Button onClick={() => setModalOpen(true)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={onDelete}>
            Delete
          </Button>
          <Box display='flex' flexDirection='row-reverse' width='100%'>
            <IconButton
              aria-label="move down"
              size="small"
              onClick={moveDown}
              disabled={index > 0}
            >
              <KeyboardArrowDownIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="move up"
              size="small"
              onClick={moveUp}
              disabled={index < equipments.length -1}
            >
              <KeyboardArrowUpIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { equipment.name }
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
          <Button onClick={onEdit}>
            Save
          </Button>
          <Button variant="outlined" color="error" onClick={() => {
            setId(equipment.id)
            setName(equipment.name)
            setModalOpen(false)
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
    </Grid>
  )
}

export default Equipment
