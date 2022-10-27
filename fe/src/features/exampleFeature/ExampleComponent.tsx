import React from 'react'

import { Button } from '../common/Button'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { selectExampleValue } from './selectors'
import { addToValue } from './slice'

export const ExampleComponent: React.FC = () => {
  const exampleValue = useAppSelector(selectExampleValue)
  const dispatch = useAppDispatch()

  return (
    <>
      <h2>This button increments by 7</h2>
      <Button onClick={() => dispatch(addToValue(7))} color="red">
        count is {exampleValue}
      </Button>
    </>
  )
}
