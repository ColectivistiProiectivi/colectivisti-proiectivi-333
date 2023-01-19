import React from 'react'
import { Divider, styled, Typography } from '@mui/material'

interface DividerWithTextProps {
  text: string
}

export const DividerWithText: React.FC<DividerWithTextProps> = ({ text }) => {
  return (
    <DividerWrapper>
      <OverlayText>{text}</OverlayText>
      <StyledDivider orientation="horizontal" />
    </DividerWrapper>
  )
}

const DividerWrapper = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  height: 15px;
`

const OverlayText = styled(Typography)`
  color: #777;
  background: white;
  padding: 0 20px;
`

const StyledDivider = styled(Divider)`
  position: absolute;
  width: 60%;
  margin-top: 10px;
  z-index: -1;
`
