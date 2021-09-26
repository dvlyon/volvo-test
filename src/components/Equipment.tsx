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
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { IEquipment } from '../types/types'

const Equipment = ({
  equipment,
  index,
  handleEdit,
  handleDelete,
  handleUp,
  handleDown,
}: {
  equipment: IEquipment
  index: number
  handleEdit: (index: number) => void
  handleDelete: (index: number) => void
  handleUp: (index: number) => void
  handleDown: (index: number) => void
}) => {
  const { state } = useStateMachine()

  const { mainStore } = state

  const { equipments, vehicles } = mainStore

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
              disabled={index >= equipments.length - 1}
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

export default Equipment
