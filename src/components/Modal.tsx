import { Dispatch, ReactNode, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import MuiModal from '@mui/material/Modal'

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

const Modal = ({ open, setOpen, children }: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}) => (
  <MuiModal
    open={open}
    onClose={() => setOpen(false)}
  >
    <Box sx={style}>
      { children }
    </Box>
  </MuiModal>
)

export default Modal
