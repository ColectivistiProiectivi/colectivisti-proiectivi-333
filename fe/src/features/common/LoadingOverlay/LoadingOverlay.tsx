import { Loader } from '../Loader'

interface LoadingOverlayProps {
  visible: boolean
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
  if (!visible) {
    return null
  }

  return <Loader fullscreen />
}
