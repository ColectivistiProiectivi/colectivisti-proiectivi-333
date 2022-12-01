import { useEffect, useState } from 'react'

/**
 * Custom hook to easily set and retrieve localStorage values
 * @param key - the 'field' we want to modify within localStorage
 * @param initialValue - initial data to be stored in localStorage
 */
export function useLocalStorage<T>(key: string, initialValue?: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)

    if (jsonValue != null) {
      return JSON.parse(jsonValue)
    }

    if (typeof initialValue === 'function') {
      return (initialValue as () => T)()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as [T, typeof setValue]
}
