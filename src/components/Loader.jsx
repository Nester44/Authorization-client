import React from 'react'
import { CircularProgress, Container } from '@mui/material'

const Loader = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <CircularProgress size={80}/>
      
    </Container>
  )
}

export default Loader