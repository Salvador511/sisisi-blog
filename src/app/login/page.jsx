'use client'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { TextField, Button, Typography as T } from '@mui/material'
import { green, grey } from '@mui/material/colors'
import { useRouter } from 'next/navigation'
import { EMPTY_OBJECT } from '~/app/Libs/Utils/constants'
import AuthWrapper from '~/app/Libs/SharedUI/AuthWrapper/AuthWrapper'
import Loading from '~/app/Libs/SharedUI/Loading/Loading'
import CustomAlert from '~/app/Libs/SharedUI/CustomAlert/CustomAlert'
import getClassPrefixer from '~/app/Libs/getClassPrefixer'
import apiFetch from '~/app/Libs/apiFetch'
import Link from 'next/link'

const displayName = 'Login'
const classes = getClassPrefixer(displayName)

const Container = styled('div')({
  backgroundColor: green[800],
  width: '100vw',
  flex: '1',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  [`& .${classes.form}`]: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: grey[50],
    padding: '2rem',
    gap: '1rem',
    borderRadius: '1ch',
  },
  [`& .${classes.registerButton}`]: {
    padding: '0',
  },
  [`& .${classes.input}`]: {
    borderColor: grey[50],
  }
})

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [values, setValues] = useState(EMPTY_OBJECT)

  const router = useRouter()

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const response = await apiFetch({ payload: values, method: 'POST', url: '/api/user/login' })
    if (response.error) {
      setError(response.error)
      setValues(EMPTY_OBJECT)
      setLoading(false)
      return
    }
    localStorage.setItem('authToken', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    setLoading(false)
    router.push('/home')
  }
  
  const isDisabled = !values.username || !values.password

  if (loading) return <Loading />

  return (
    <Container>
      <div className={classes.form}>
        {error ? <CustomAlert type='error' message={error} /> : null}
        <TextField
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          className={classes.input}
          type="password"
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleSubmit} disabled={isDisabled}>
          Log In
        </Button>
        <T type="body1">
          Don&apos;t have an account?{' '}
          <Button className={classes.registerButton}>
            <Link href="/register">Click here</Link>
          </Button>
        </T>
      </div>
    </Container>
  )
}

const Wrapper = () => {
  return (
    <AuthWrapper hasToBeLogged={false}>
      <Home />
    </AuthWrapper>
  )
}

export default Wrapper
