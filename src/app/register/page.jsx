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

const displayName = 'Register'
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
    const response = await apiFetch({ payload: values, method: 'POST', url: '/api/user' })
    if (response.error) {
      setLoading(false)
      setError(response.error)
      return
    }

    setLoading(false)
    if (response.error) {
      setError(response.error)
      return
    }

    localStorage.setItem('authToken', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    router.push('/home')
  }

  const isDisabled = !values.username || !values.password || !values.name || !values.lastName

  if (loading) return <Loading />

  return (
    <Container>
      <div className={classes.form}>
        {error ? <CustomAlert type='error' message={error} /> : null}
        <TextField
          className={classes.input}
          id="name"
          label="Name"
          variant="outlined"
          name="name"
          onChange={handleChange}
        />
        <TextField
          id="lastName"
          className={classes.input}
          label="Last Name"
          variant="outlined"
          name="lastName"
          onChange={handleChange}

        />
        <TextField
          id="username"
          className={classes.input}
          label="Username"
          variant="outlined"
          name="username"
          onChange={handleChange}

        />
        <TextField
          id="password"
          className={classes.input}
          label="Password"
          variant="outlined"
          name="password"
          onChange={handleChange}

        />
        <Button
          variant="contained" disabled={isDisabled} onClick={handleSubmit}
        >
          Register
        </Button>
        <T type="body1">
          Already have an account?{' '}
          <Button className={classes.registerButton}>
            <Link href="/login">Click Here</Link>
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

