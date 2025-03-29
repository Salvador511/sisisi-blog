'use client'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { Button, Typography as T } from '@mui/material'
import { green, grey } from '@mui/material/colors'
import getClassPrefixer from '~/app/Libs/getClassPrefixer'

const displayName = 'LandingPage'
const classes = getClassPrefixer(displayName)

const Container = styled('div')({
  backgroundColor: green[800],
  width: '100vw',
  flex: '1',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'left',
  alignItems: 'center',
  [`& .${classes.btnContainer}`]: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
  [`& .${classes.card}`]: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: grey[50],
    padding: '2rem',
    gap: '1rem',
    borderRadius: '1ch',
  },
  [`& .${classes.getStartedBtn}`]: {
    padding: '.5rem',
    backgroundColor: grey[50],
    color: green[800],
    width: '8vw',
    height: '4vh',
  },
  [`& .${classes.loginBtn}`]: {
    backgroundColor: green[500],
    padding: '.5rem',
    width: '8vw',
    height: '4vh',
    color: grey[50],
  },
  [`& .${classes.contentArea}`]: {
    flex: '8',
    display: 'flex',
    justifyContent: 'center',
  },
})

const LandingPage = () => {
  return (
    <Container>
      <div className={classes.contentArea}>
        <div className={classes.card}>
          <T variant="h1" component="h1">
            Welcome to <br /> Greñas Blog
          </T>
          <T variant="h5" component="h2">
            Share your thoughts, stories, and insights with the world.
          </T>
          <T variant="h5" component="h2">
            Create engaging posts that connect and inspire.
          </T>
          <div className={classes.btnContainer}>
            <Button
              variant="contained"
              className={classes.getStartedBtn} href="/register"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              className={classes.loginBtn} href="/login"
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.contentArea}>
        <div className={classes.card}>
          <Image
            src="/chatImage.svg"
            width={600}
            height={600}
            alt='LandingPageImage'
            priority
          />
        </div>
      </div>
    </Container>
  )
}

export default LandingPage