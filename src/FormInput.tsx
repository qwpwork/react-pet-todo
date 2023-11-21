import {Box, Button, TextField} from '@mui/material'

export default function FormInput() {
  return (
    <Box>
      <TextField 
        id="standard-basic"
        variant="standard"
        label="New todo"
        fullWidth
      />
      <Button 
        variant="contained"
      >
        Add todo
      </Button>
    </Box>
  )
}