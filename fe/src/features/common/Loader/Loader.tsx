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
  background: rgba(255, 255, 255, 0.3);
  z-index: 2;

  ${props =>
    props.fullscreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(12px);
    `}
`
