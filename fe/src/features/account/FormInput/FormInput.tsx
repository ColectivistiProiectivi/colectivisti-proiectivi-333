import React, { useEffect, useState } from 'react'
import { Chip, TextField, TextFieldProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export type FormInputProps = TextFieldProps & { fieldName: string; options?: RegisterOptions }

export const FormInput: React.FC<FormInputProps> = ({ fieldName, options, ...props }) => {
  const { register } = useFormContext()

  return (
    <TextField
      {...register(fieldName, options)}
      {...props}
      InputLabelProps={{ shrink: true }}
      size="small"
      color="secondary"
      fullWidth
    />
  )
}

export const ReadOnlyFormInput: React.FC<TextFieldProps> = props => (
  <TextField
    {...props}
    InputProps={{ readOnly: true }}
    InputLabelProps={{ shrink: true }}
    helperText="Cannot be modified"
    color="secondary"
    size="small"
    fullWidth
    disabled
  />
)

export const FormInputWithChips: React.FC<TextFieldProps & { fieldName: string }> = ({ fieldName, ...props }) => {
  const { setValue, setError, clearErrors } = useFormContext()

  const [enteredWords, setEnteredWords] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const maxWords = 5
  const maxCharactersPerWord = 30

  const hasErrors =
    currentInput.length > maxCharactersPerWord || (enteredWords.length === maxWords && currentInput.length > 0)

  useEffect(() => {
    if (hasErrors) {
      setError(fieldName, { type: 'Field Error' })
    } else {
      clearErrors(fieldName)
    }
  }, [hasErrors])

  const handleDeleteWord = (wordIndex: number) => {
    setEnteredWords(prevEnteredWords => {
      const newEnteredWords = [...prevEnteredWords.filter((_, index) => index !== wordIndex)]
      setValue(fieldName, newEnteredWords, { shouldDirty: false })

      return newEnteredWords
    })
  }

  const handleEnterPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && currentInput.length === 0 && enteredWords.length) {
      handleDeleteWord(enteredWords.length - 1)
    }

    if (event.key !== 'Enter' || enteredWords.length >= maxWords || currentInput.length >= maxCharactersPerWord) {
      return
    }

    event.preventDefault()

    setEnteredWords(prevEnteredWords => {
      const word = currentInput.trim()
      const newEnteredWords = [...prevEnteredWords, word]

      setValue(fieldName, newEnteredWords, { shouldDirty: false })
      setCurrentInput('')

      return newEnteredWords
    })
  }

  return (
    <TextField
      {...props}
      value={currentInput}
      InputProps={{
        startAdornment: enteredWords.map((word, index) => (
          <Chip key={index} tabIndex={-1} label={word} onDelete={() => handleDeleteWord(index)} />
        )),
        onKeyDown: handleEnterPress,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setCurrentInput(e.target.value)
        },
        sx: { padding: '10px', gap: '8px', overflow: 'hidden' },
      }}
      error={hasErrors}
      helperText={hasErrors ? 'Max 5 words. 30 characters per word' : 'Enter to input a word'}
      size="small"
      color="secondary"
      fullWidth
    />
  )
}
