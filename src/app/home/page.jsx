'use client'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { grey, green } from '@mui/material/colors'
import AuthWrapper from '~/app/Libs/SharedUI/AuthWrapper/AuthWrapper'
import apiFetch from '~/app/Libs/apiFetch'
import getClassPrefixer from '~/app/Libs/getClassPrefixer'
import { Button, Modal, Typography as T } from '@mui/material'
import Loading from '~/app/Libs/SharedUI/Loading/Loading'
import PostModal from '~/app/home/Components/PostModal'

const displayName = 'Home'
const classes = getClassPrefixer(displayName)

const Container = styled('div')({
  backgroundColor: grey[50],
  width: '100vw',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '1rem',
  gap: '1rem', 
  flex: 1,
  [`& .${classes.card}`]: {
    padding: '0',
    textTransform: 'none',
  },
  [`& .${classes.content}`]: {
    backgroundColor: green[800],
    width: '300px',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '1rem',
    borderRadius: '1ch',
    color: grey[50],
    textAlign: 'left',
  },
})

const Home = ({ posts }) => {
  const [open, setOpen] = useState(false)
  const [currentPost, setCurrentPost] = useState(null)
  return (
    <Container>
      {posts.map(post => (
        <Button 
          key={post.id} 
          className={classes.card}
          onClick={() => {
            setCurrentPost(post)
            setOpen(true)
          }}
        >
          <div className={classes.content}>
            <T variant="h6">{post.title}</T>
            <T variant="body1">{
              post.content.length > 100
              ? `${post.content.slice(0, 100)}...`
              : post.content
            }</T>
          </div>
        </Button>
      ))} 
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <PostModal post={currentPost}/>
      </Modal>
    </Container>
  )
}

const Wrapper = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const token = localStorage.getItem('authToken')
      const response = await apiFetch({ method: 'GET', url: '/api/post', token })
      if (response.error) {
        return
      }
      setPosts(response)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  if (loading) return <Loading />

  return (
    <AuthWrapper hasToBeLogged={true}>
      <Home posts={posts} />
    </AuthWrapper>
  )
}
export default Wrapper