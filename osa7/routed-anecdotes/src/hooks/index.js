import { useState } from 'react'


export const useField = (name) => {
  const [value, setValue] = useState('')

  const reset = () => {
    setValue('')
  }

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    field: {
      name,
      value,
      onChange,
    },
    reset
  }
}
