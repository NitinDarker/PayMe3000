import { useEffect, useState } from 'react'
import axios from 'axios'
import type React from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '@/lib/config'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export default function ProtectedRoute ({ children }: ProtectedRouteProps) {
  const [isValid, setIsValid] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()

    const validateToken = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsValid(false)
        navigate('/', { replace: true })
        return
      }

      try {
        const response = await axios.get(`${API_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal
        })

        if (response.data.success) {
          setIsValid(true)
        } else {
          localStorage.removeItem('token')
          setIsValid(false)
          navigate('/', { replace: true })
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          localStorage.removeItem('token')
          setIsValid(false)
          navigate('/', { replace: true })
        }
      }
    }

    validateToken()
    return () => controller.abort()
  }, [navigate])

  if (isValid) return children
  return null
}
