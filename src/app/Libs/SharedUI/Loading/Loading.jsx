'use client'
import { CircularProgress } from '@mui/material'
import { grey } from '@mui/material/colors'
import { styled } from '@mui/material/styles'

const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: grey[50],
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999
})

const Loading = () => {
  return (
    <Overlay>
      <CircularProgress size={60} />
    </Overlay>
  )
}

export default Loading
