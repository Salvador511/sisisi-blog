'use client'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { grey, green } from '@mui/material/colors'
import AuthWrapper from '~/app/Libs/SharedUI/AuthWrapper/AuthWrapper'
import ActiveWrapper from '~/app/home/Components/ActiveWrapper'
import apiFetch from '~/app/Libs/apiFetch'
import getClassPrefixer from '~/app/Libs/getClassPrefixer'
import { Button, Modal, IconButton, Typography as T } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Loading from '~/app/Libs/SharedUI/Loading/Loading'
import PostModal from '~/app/home/Components/PostModal'
import AddModal from '~/app/home/Components/AddModal'

const displayName = 'Home'
const classes = getClassPrefixer(displayName)

const Container = styled('div')({
  backgroundColor: grey[50],
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
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
  [`& .${classes.addContainer}`]: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    backgroundColor: green[800],
    zIndex: 1000,
    border: `2px solid ${grey[300]}`,
  },
  [`& .${classes.addIcon}`]:{
    color: grey[50],
  }
})

const Home = ({ posts, user, token }) => {
  const [openPost, setOpenPost] = useState(false)
  const [openAdding, setOpenAdding] = useState(false)
  const [currentPost, setCurrentPost] = useState(null)
  return (
    <Container>
      {posts.map(post => (
        <Button 
          key={post.id} 
          className={classes.card}
          onClick={() => {
            setCurrentPost(post)
            setOpenPost(true)
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
      <ActiveWrapper value={user?.isAdmin}>
        <IconButton className={classes.addContainer}>
          <AddIcon 
            className={classes.addIcon}
            fontSize='large'
            onClick={() => setOpenAdding(true)}
          />
        </IconButton>
      </ActiveWrapper>

      <Modal
        open={openAdding}
        onClose={() => setOpenAdding(false)}
      >
        <AddModal 
          token={token} 
          onClose={() => setOpenAdding(false)}
        />
      </Modal>
      <Modal
        open={openPost}
        onClose={() => setOpenPost(false)}
      >
        <PostModal 
          post={currentPost} 
          user={user} 
          token={token}
          onClose={() => setOpenPost(false)}

        />
      </Modal>
    </Container>
  )
}

const Wrapper = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const storedToken = localStorage.getItem('authToken')
      setToken(storedToken)
      const response = await apiFetch({ method: 'GET', url: '/api/post', token: storedToken })
      if (response.error) {
        return
      }
      setPosts(response)
      setUser(JSON.parse(localStorage.getItem('user'))) 
      setLoading(false)
    }
    fetchPosts()
  }, [])

  if (loading) return <Loading />

  return (
    <AuthWrapper hasToBeLogged={true}>
      <Home posts={posts} user={user} token={token}/>
    </AuthWrapper>
  )
}
export default Wrapper