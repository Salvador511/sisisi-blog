/* eslint-disable no-restricted-globals */
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { Button, Stack, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import getClassPrefixer from '~/app/Libs/getClassPrefixer'
import apiFetch from '~/app/Libs/apiFetch'
import Loading from '~/app/Libs/SharedUI/Loading/Loading'
import CustomAlert from '~/app/Libs/SharedUI/CustomAlert/CustomAlert'
import { EMPTY_OBJECT } from '~/app/Libs/Utils/constants'

const displayName = 'Home'
const classes = getClassPrefixer(displayName)

const Container = styled('div')({
  backgroundColor: grey[50],
  position: 'absolute',
  width: '50vw',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '1rem',
  border: `1px solid ${grey[300]}`,
  boxShadow: 24,
  borderRadius: '1ch',
  gap: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [`& .${classes.multiInput}`]: {
    width: '100%',
  },
  [`& .${classes.singleInput}`]: {
    width: '75%',
  }
})

const AddModal = ({ token, onClose }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [values, setValues] = useState(EMPTY_OBJECT)
  const isDisabled = !values.title || !values.content

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleCreate = async e => {
    e.preventDefault()
    setLoading(true)
    const response = await apiFetch({ payload: values, method: 'POST', url: '/api/post/', token })
    if (response.error) {
      setError(response.error)
      setLoading(false)
      return
    }
    router.push('/home')
    window.location.reload()
  }
  
  if (loading) return <Loading />

  return (
    <Container>
      {error && (
        <Stack direction="row" justifyContent="center" alignItems="center" padding="1ch">
          <CustomAlert type="error" message={error} />
        </Stack>
      )}
      {/* Title */}
      <Stack
        direction='row'
        alignItems='center'
        padding='1ch'
      >  
        <TextField
          id="title"
          name="title"
          label="Title"
          variant="standard"
          className={classes.singleInput}
          value={values.title ?? ''}
          onChange={handleChange}
        />
      </Stack>
      {/* Content */}
      <Stack
        direction='row'
        alignItems='center'
        padding='1ch'
      >
        <TextField
          className={classes.multiInput}
          id="content"
          name="content"
          label="Content"
          variant="standard"
          value={values.content ?? ''}
          onChange={handleChange}
          multiline
        />
        
      </Stack>
      {/* Buttons */}
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='flex-end'
        padding='1ch'
        gap='1rem'
      >
        <Stack 
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          gap='1rem'
        >
          <Button 
            variant='outlined' 
            color="error" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            variant='contained'
            onClick={handleCreate}
            disabled={isDisabled}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

const Wrapper = ({ token, onClose }) => {

  return <AddModal token={token} onClose={onClose} />
    
}

export default Wrapper
