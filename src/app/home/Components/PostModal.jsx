/* eslint-disable no-restricted-globals */
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { Typography as T, IconButton, Button, Stack, TextField, Modal } from '@mui/material'
import { useRouter } from 'next/navigation'
import getClassPrefixer from '~/app/Libs/getClassPrefixer'
import ActiveWrapper from '~/app/home/Components/ActiveWrapper'
import apiFetch from '~/app/Libs/apiFetch'
import Loading from '~/app/Libs/SharedUI/Loading/Loading'
import CustomAlert from '~/app/Libs/SharedUI/CustomAlert/CustomAlert'
import DeleteModal from '~/app/home/Components/DeleteModal'

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
  [`& .${classes.card}`]: {
    padding: '0',
    textTransform: 'none',
  },
  [`& .${classes.multiInput}`]: {
    width: '100%',
  }
})

const PostModal = ({ post, user, token }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editingTitle, setEditingTitle] = useState(false)
  const [editingContent, setEditingContent] = useState(false)
  const [open, setOpen] = useState(false)

  let initialValues = {
    title: post.title,
    content: post.content
  }
  const [values, setValues] = useState(initialValues)


  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setEditingContent(false)
    setEditingTitle(false)
    const response = await apiFetch({ payload: values, method: 'PATCH', url: `/api/post/${post.id}`, token })
    if (response.error) {
      setError(response.error)
      setValues(initialValues)
      setLoading(false)
      return
    }
    initialValues = values
    router.push('/home')
    window.location.reload()
  }
  
  if (loading) return <Loading />

  return (
    <Container>
      {error 
      && <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        padding='1ch'>
        <CustomAlert type='error' message={error} />
      </Stack>}
      {/* Title */}
      <Stack
        direction='row'
        alignItems='center'
        padding='1ch'
      >
        <ActiveWrapper value={!editingTitle}>
          <T variant="h6">{post.title}</T>
        </ActiveWrapper>
        <ActiveWrapper value={editingTitle}>
          <TextField
            id="title"
            name="title"
            label="Title"
            variant="standard"
            value={values.title}
            onChange={handleChange}
          />
        </ActiveWrapper>
        <ActiveWrapper value={user.isAdmin}>
          <IconButton onClick={() => setEditingTitle(!editingTitle)}>
            {editingTitle 
              ? <CloseIcon fontSize='small'/> 
              : <EditIcon fontSize='small'/>
            }
          </IconButton>
        </ActiveWrapper>
      </Stack>
      {/* Content */}
      <Stack
        direction='row'
        alignItems='center'
        padding='1ch'
      >
        <ActiveWrapper value={!editingContent}>
          <T variant="body1">{post.content}</T>
        </ActiveWrapper>
        <ActiveWrapper value={editingContent}>
          <TextField
            className={classes.multiInput}
            id="content"
            name="content"
            label="Content"
            variant="standard"
            value={values.content}
            onChange={handleChange}
            multiline
          />
        </ActiveWrapper>
        <ActiveWrapper value={user.isAdmin}>
          <IconButton onClick={() => setEditingContent(!editingContent)}>
            {editingContent 
              ? <CloseIcon fontSize='small'/> 
              : <EditIcon fontSize='small'/>
            }
          </IconButton>
        </ActiveWrapper>
      </Stack>
      {/* Buttons */}
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='flex-end'
        padding='1ch'
        gap='1rem'
      >
        <ActiveWrapper value={user.isAdmin}>
          <IconButton>
            <DeleteIcon 
              fontSize='medium'
              onClick={() => setOpen(true)}
            />
          </IconButton>
        </ActiveWrapper>
        <ActiveWrapper value={editingContent || editingTitle}>
          <Stack 
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            gap='1rem'
          >
            <Button 
              variant='outlined' 
              color="error" 
              onClick={() => {
                setEditingContent(false)
                setEditingTitle(false)
              }}
            >Cancel</Button>
            <Button variant='outlined' onClick={handleSubmit}>Save</Button>
          </Stack>
        </ActiveWrapper>
      </Stack>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <DeleteModal 
          id={post.id}
          token={token}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </Container>
  )
}

const Wrapper = ({ post, user, token }) => {
  return (
    <PostModal post={post} user={user} token={token} />
  )
}

export default Wrapper