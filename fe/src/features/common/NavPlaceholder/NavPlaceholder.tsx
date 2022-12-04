import React from 'react'
import { styled } from '@mui/material'

export const NavPlaceholder: React.FC = () => {
  return <Container>Navbar Placeholder</Container>
}

const Container = styled('div')`
  width: 100%;
  height: 60px;
  background: #ddd;
  color: #777;

  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;

  position: fixed;
  z-index: 2;
`
