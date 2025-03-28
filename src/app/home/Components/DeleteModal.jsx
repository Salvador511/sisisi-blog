/* eslint-disable no-restricted-globals */
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { Typography as T, Button, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import getClassPrefixer from '~/app/Libs/getClassPrefixer'
import apiFetch from '~/app/Libs/apiFetch'
import Loading from '~/app/Libs/SharedUI/Loading/Loading'
import CustomAlert from '~/app/Libs/SharedUI/CustomAlert/CustomAlert'

const displayName = 'Home'
const classes = getClassPrefixer(displayName)

const Container = styled('div')({
  backgroundColor: grey[50],
  position: 'absolute',
  width: '25vw',
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
  [`& .${classes.card}`]: {
    padding: '0',
    textTransform: 'none',
  },
})

const DeleteModal = ({ id, token, onClose }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async e => {
    e.preventDefault()
    setLoading(true)
    const response = await apiFetch({ method: 'DELETE', url: `/api/post/${id}`, token })
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
      <Stack direction="column" justifyContent="center" alignItems="center" padding="1rem" gap="1rem">
        <T variant="subtitle1">Are you sure you want to delete this post?</T>

        <Stack direction="row" justifyContent="space-between" alignItems="center" gap="1rem">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

const Wrapper = ({ id, token, onClose }) => {

  return <DeleteModal id={id} token={token} onClose={onClose} />
    
}

export default Wrapper
