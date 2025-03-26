'use client'
import { styled } from '@mui/material/styles'
import { Typography as T } from '@mui/material'
import { ErrorOutline, CheckCircleOutline, InfoOutlined, WarningAmberOutlined } from '@mui/icons-material'
import { blue, red, green, orange } from '@mui/material/colors'

const alertColors = {
  error: { color: red[700], icon: <ErrorOutline fontSize="small" /> },
  success: { color: green[700], icon: <CheckCircleOutline fontSize="small" /> },
  warning: { color: orange[700], icon: <WarningAmberOutlined fontSize="small" /> },
  info: { color: blue[700], icon: <InfoOutlined fontSize="small" /> }
}

const StyledAlert = styled('div')(({ theme, color }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: `${color}1A`,
  border: `1px solid ${color}`,
  borderRadius: '8px',
  padding: theme.spacing(1.5),
  gap: theme.spacing(1),
  color: color,
  width: '100%',
}))

const CustomAlert = ({ type = 'info', message }) => {
  const { color, icon } = alertColors[type] || alertColors.info

  return (
    <StyledAlert color={color}>
      {icon}
      <T variant="body2">{message}</T>
    </StyledAlert>
  )
}

export default CustomAlert
