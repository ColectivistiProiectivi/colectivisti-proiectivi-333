import { CircularProgress, css, styled } from '@mui/material'

interface LoaderProps {
  fullscreen?: boolean
}

export const Loader: React.FC<LoaderProps> = ({ fullscreen = false }) => {
  return (
    <Container fullscreen={fullscreen}>
      <CircularProgress />
    </Container>
  )
}

const Container = styled('div')<{ fullscreen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.fullscreen &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100vh;
      height: 100vh;
    `}
`
