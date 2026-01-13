import { useState, useCallback, useEffect, useRef } from 'react'
import axios from 'axios'
import AllUsers from '../ui/allUsers'
import MyNavbar from '../ui/myNavbar'
import Welcome from '../ui/welcome'
import { API_URL } from '@/lib/config'
import toast from 'react-hot-toast'

export default function Dashboard () {
  const [balance, setBalance] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const controllerRef = useRef<AbortController | null>(null)

  const fetchUserData = useCallback(async () => {
    controllerRef.current?.abort()
    controllerRef.current = new AbortController()

    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        signal: controllerRef.current.signal
      })
      if (response.data.success) {
        setBalance(response.data.data.balance)
        setFirstName(response.data.data.firstName)
        setLastName(response.data.data.lastName)
      }
    } catch (e) {
      if (!axios.isCancel(e)) {
        console.error(e)
        toast.error('Failed to load user data')
      }
    }
  }, [])

  useEffect(() => {
    fetchUserData()
    return () => controllerRef.current?.abort()
  }, [fetchUserData])

  return (
    <div className='w-full bg-black text-white min-h-screen'>
      <MyNavbar firstName={firstName} lastName={lastName} />
      <Welcome name={`${firstName} ${lastName}`} balance={balance} onBalanceUpdate={fetchUserData} />
      <AllUsers onTransferComplete={fetchUserData} />
    </div>
  )
}
