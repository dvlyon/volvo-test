import { useState } from 'react'
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

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { IVehicle } from '../types/types'

const Vehicle = ({
  vehicle,
  index,
  handleEdit,
  handleDelete,
  handleUp,
  handleDown,
}: {
  vehicle: IVehicle
  index: number
  handleEdit: (index: number) => void
  handleDelete: (index: number) => void
  handleUp: (index: number) => void
  handleDown: (index: number) => void

}) => {
  const [open, setOpen] = useState(false)

  const { state } = useStateMachine()

  const { mainStore } = state

  const { equipments, vehicles } = mainStore

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
                            disabled={vehicle.equipments && vehicle.equipments.length <= 0}
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
          <Button onClick={() => handleEdit(index)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={() => handleDelete(index)}>
            Delete
          </Button>
          <Box display='flex' flexDirection='row-reverse' width='100%'>
            <IconButton
              aria-label="move down"
              size="small"
              onClick={() => handleDown(index)}
              disabled={index >= vehicles.length - 1}
            >
              <KeyboardArrowDownIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="move up"
              size="small"
              onClick={() => handleUp(index)}
              disabled={index <= 0}
            >
              <KeyboardArrowUpIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Vehicle
