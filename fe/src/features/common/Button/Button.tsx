import React from 'react'

// Example Reusable Component
// We'll probably use a library for this, e.g. material-ui
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string
}

export const Button: React.FC<ButtonProps> = props => {
  const { color, children, ...htmlButtonProps } = props

  return (
    <button {...htmlButtonProps} style={{ color }}>
      {children}
    </button>
  )
}
