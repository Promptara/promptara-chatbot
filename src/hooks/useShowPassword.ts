import { useState } from 'react'

export default function useShowPassword() {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return {
    showPassword,
    handleClickShowPassword,
  }
}
