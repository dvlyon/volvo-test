import { Dispatch, SetStateAction } from 'react'

import { styled } from '@mui/material/styles'

import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'

import AddBoxIcon from '@mui/icons-material/AddBox'
import FileUploadIcon from '@mui/icons-material/FileUpload'

const Input = styled('input')({
  display: 'none',
})

const AddUploadActions = ({ addData, setOpen }: {
  addData: (data: any) => void
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  let fileReader: FileReader

  const handleFileRead = () => {
    const content = fileReader.result

    const jsonData = JSON.parse(content as string)

    if (jsonData) {
      addData(jsonData)
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
  )
}

export default AddUploadActions
