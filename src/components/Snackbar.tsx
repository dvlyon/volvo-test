import { forwardRef } from 'react'
import { useStateMachine } from 'little-state-machine'

import MuiSnackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

import { updateUiStore } from '../stores/uiStore'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Snackbar = () => {
  const { actions, state } = useStateMachine({ updateUiStore })

  const { uiStore } = state

  const { error } = uiStore

  const onClose = () => {
    actions.updateUiStore({
      error: false,
    })
  }

  return (
    <MuiSnackbar open={error} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        This id is already in use!
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
