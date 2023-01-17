import { useAppSelector } from '../../../redux/hooks'
import { selectUserData } from '../../account/selectors'
import { Role } from '../../../types/User'

export const useAccountRole = (): Role | undefined => {
  const userData = useAppSelector(selectUserData)

  return userData?.role
}
