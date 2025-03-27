'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { green, grey } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import { Typography as T, Button } from '@mui/material'
import getClassPrefixer from '~/app/Libs/getClassPrefixer'

const displayName = 'Header'
const classes = getClassPrefixer(displayName)

const Container = styled('div')({
  backgroundColor: green[800],
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  [`& .${classes.titleContainer}`]: {
    padding: '1rem',
    color: grey[50],
  },
  [`& .${classes.buttonsContainer}`]: {
    padding: '0 1rem',
    color: 'white',
  },
  [`& .${classes.button}`]: {
    color: grey[50],
  }
})

const Header = ({ isLogged, onLogout }) => {
  return(
    <Container>
      <div className={classes.titleContainer}>
        <T variant="h6">Greñas Blog</T>
      </div>
      <div className={classes.titleContainer}>
        { 
          !isLogged 
            ? <>
              <Button variant="text" className={classes.button} href="/login">Log In</Button>
              <Button variant="text" className={classes.button} href="/register">Sign Up</Button>
            </>
            : <>
              <Button variant="text" className={classes.button} onClick={onLogout}>Log Out</Button>
            </>
        }
      </div>
    </Container>
  )
}

const Wrapper = () => {
  const [isLogged, setIsLogged] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setIsLogged(!!localStorage.getItem('authToken'))
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setIsLogged(false)
    router.push('/login')
  }

  return <Header isLogged={isLogged} onLogout={handleLogout} />
}

export default Wrapper
