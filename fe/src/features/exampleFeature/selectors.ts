import { RootState } from '../../redux/store'

export const selectExampleValue = (state: RootState) => state.exampleState.value
