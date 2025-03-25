'use client'
import getClassPrefixer from '~/app/Libs/getClassPrefixer'
import { styled } from '@mui/material/styles'
import { Typography as T } from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors'
const displayName = 'List'
const classes = getClassPrefixer(displayName)

const Container = styled('div')({
  backgroundColor: blueGrey[500],
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  [`& .${classes.text}`]: {
    color: grey[50],
  }
})

const Home = () => {
  return (
    <Container>
      <T className={classes.text}>Home</T>
    </Container>
  )
}
export default Home