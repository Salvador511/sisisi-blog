'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthWrapper = ({ hasToBeLogged, children }) => {
  const router = useRouter()
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    if (hasToBeLogged && !storedToken) {
      router.push('/login')
    } 
    if (!hasToBeLogged && storedToken) {
      router.push('/home')
    }
  }, [hasToBeLogged, router])
  
  return children
}

export default AuthWrapper
