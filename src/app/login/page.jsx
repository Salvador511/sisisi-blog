'use client'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { TextField, Button, Typography as T } from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors'
import { useRouter } from 'next/navigation'
import { EMPTY_OBJECT } from '~/app/Libs/Utils/constants'
import Loading from '~/app/Libs/SharedUI/Loading/Loading'
import CustomAlert from '~/app/Libs/SharedUI/CustomAlert/CustomAlert'
import getClassPrefixer from '~/app/Libs/getClassPrefixer'
import apiFetch from '~/app/Libs/apiFetch'
import Link from 'next/link'

const displayName = 'Login'
const classes = getClassPrefixer(displayName)

const Container = styled('div')({
  backgroundColor: blueGrey[500],
  width: '100vw',
  height: '100vh',
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
    backgroundColor: grey[300],
    padding: '2rem',
    gap: '1rem',
    borderRadius: '1ch'
  },
  [`& .${classes.registerButton}`]: {
    padding: '0',
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
    const token = await apiFetch({ payload: values, method: 'POST', url: '/api/user/login' })
    if (token.error) {
      setError(token.error)
      setValues(EMPTY_OBJECT)
      setLoading(false)
      return
    }
    localStorage.setItem('authToken', token)
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
  return <Home />
}

export default Wrapper
