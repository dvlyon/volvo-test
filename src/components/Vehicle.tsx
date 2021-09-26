import { forwardRef, useState } from 'react'
import { useStateMachine } from 'little-state-machine'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
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
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { updateMainStore } from '../stores/mainStore'
import { IVehicle } from '../types/types'

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

const Vehicle = ({ vehicle }: { vehicle: IVehicle }) => {
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [id, setId] = useState(vehicle.id)
  const [name, setName] = useState(vehicle.name)
  const [driver, setDriver] = useState(vehicle.driver)
  const [status, setStatus] = useState(vehicle.status)
  const [fuelType, setFuelType] = useState(vehicle.fuelType)
  const [equips, setEquips] = useState(vehicle.equipments)
  const [error, setError] = useState(false)

  const { actions, state } = useStateMachine({ updateMainStore })

  const { mainStore } = state

  const { equipments, vehicles } = mainStore

  const onDelete = () => {
    const newVehicles = [...vehicles]

    newVehicles.splice(vehicles.indexOf(vehicle), 1)

    actions.updateMainStore({
      vehicles: newVehicles,
    })
  }

  const onEdit = () => {
    const newVehicles = [...vehicles]

    newVehicles[vehicles.indexOf(vehicle)] = {
      id,
      name,
      driver,
      status,
      fuelType,
      equipments: equips,
    }

    if (newVehicles.filter(e => e.id === id).length <= 1) {
      actions.updateMainStore({
        vehicles: newVehicles,
      })
      setModalOpen(false)
    } else {
      setError(true)
    }
  }

  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { vehicle.name }
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="vehicle table">
              <TableBody>
                { (Object.keys(vehicle) as Array<keyof IVehicle>).map((key, index) => {
                  if (key === 'equipments') {
                    return (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                          >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          Equipments ({ vehicle.equipments.length })
                        </TableCell>
                      </TableRow>
                    )
                  }
                  if (key !== 'name') {
                    return (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          { key }
                        </TableCell>
                        <TableCell align="right">{ vehicle[key] }</TableCell>
                      </TableRow>
                    )
                  }
                  return null
                })}
                {vehicle.equipments && vehicle.equipments.length > 0 && (
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Table size="small" aria-label="purchases">
                            <TableBody>
                              {vehicle.equipments.map((equipment: number, index) => (
                                <TableRow key={'eq' + index}>
                                  <TableCell component="th" scope="row">
                                    { equipments.find(e => e.id === equipment)?.name || '' }
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button onClick={() => setModalOpen(true)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={onDelete}>
            Delete
          </Button>
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
            { vehicle.name }
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
              {equipments.map((equipment) => (
                <FormControlLabel
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
          <Button onClick={onEdit}>
            Save
          </Button>
          <Button variant="outlined" color="error" onClick={() => {
            setId(vehicle.id)
            setName(vehicle.name)
            setModalOpen(false)
            setDriver(vehicle.driver)
            setStatus(vehicle.status)
            setFuelType(vehicle.fuelType)
            setEquips(vehicle.equipments)
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

export default Vehicle
