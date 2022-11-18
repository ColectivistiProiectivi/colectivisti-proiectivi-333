import React, { Suspense } from 'react'
import { Loader } from '../../common/Loader'

interface LoadingScreenProps {
  children: React.ReactNode
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ children }) => {
  return <Suspense fallback={<Loader fullscreen />}>{children}</Suspense>
}
