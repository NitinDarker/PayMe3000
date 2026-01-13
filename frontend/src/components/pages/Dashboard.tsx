import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import AllUsers from '../ui/allUsers'
import MyNavbar from '../ui/myNavbar'
import Welcome from '../ui/welcome'

export default function Dashboard () {
  const [balance, setBalance] = useState(0)
  const [name, setName] = useState('')

  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:3001/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.success) {
        setBalance(response.data.data.balance)
        setName(response.data.data.firstName + ' ' + response.data.data.lastName)
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  return (
    <div className='w-full bg-black text-white min-h-screen'>
      <MyNavbar />
      <Welcome name={name} balance={balance} />
      <AllUsers onTransferComplete={fetchUserData} />
    </div>
  )
}
