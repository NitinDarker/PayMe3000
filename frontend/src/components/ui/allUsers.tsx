import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { Send, Search, X } from 'lucide-react'
import Avatar from './Avatar'
import toast from 'react-hot-toast'

type User = {
  _id: string
  username: string
  phone?: string
  firstName?: string
  lastName?: string
}

type AllUsersProps = {
  onTransferComplete?: () => void
}

export default function AllUsers ({ onTransferComplete }: AllUsersProps) {
  const [users, setUsers] = useState<User[]>([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [amount, setAmount] = useState('')
  const [sending, setSending] = useState(false)

  const fetchUsers = useCallback(async (search = '') => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `http://localhost:3001/api/user/bulk?filter=${encodeURIComponent(
          search
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (response.data.success) {
        setUsers(response.data.users)
      } else {
        setUsers([])
      }
    } catch (err) {
      console.error(err)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [])

  // ✅ Fetch all initially
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // ✅ Debounced search effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsers(filter)
    }, 300)
    return () => clearTimeout(timeout)
  }, [filter, fetchUsers])

  const openSendModal = (user: User) => {
    setSelectedUser(user)
    setAmount('')
  }

  const closeSendModal = () => {
    setSelectedUser(null)
    setAmount('')
  }

  const handleSendMoney = async () => {
    if (!selectedUser || !amount) return

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    try {
      setSending(true)
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:3001/api/account/transfer',
        { to: selectedUser._id, amount: numAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data.success) {
        toast.success(`Sent ₹${numAmount} to ${selectedUser.firstName || selectedUser.username}`)
        closeSendModal()
        onTransferComplete?.()
      } else {
        toast.error(response.data.error || 'Transfer failed')
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Transfer failed'
      toast.error(errorMsg)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className='p-8 text-white'>
      <div className='flex items-center justify-between mb-6'>
        {/* Left side — heading and count */}
        <div>
          <h1 className='text-3xl font-semibold mb-1'>All Users</h1>
          <p className='text-neutral-400 text-sm'>
            {users.length} {users.length === 1 ? 'user' : 'users'} found
          </p>
        </div>

        {/* Right side — search bar */}
        <div className='relative w-md md:w-1/3'>
          <Search
            size={18}
            className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500'
          />
          <input
            type='text'
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder='Search users by name...'
            className='w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-neutral-500'
          />
        </div>
      </div>

      {/* Users grid */}
      {loading ? (
        <p className='text-center text-neutral-400 italic'>Loading...</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {users.length > 0 ? (
            users.map(u => {
              const colorIndex =
                [...u.username].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 6

              return (
                <div
                  key={u._id}
                  className='flex justify-between items-center bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-150 rounded-xl p-5'
                >
                  <div className='flex items-center gap-4'>
                    <Avatar
                      firstName={u.firstName || u.username}
                      lastName={u.lastName}
                      size={48}
                      colorIndex={colorIndex}
                    />

                    <div>
                      <p className='text-lg font-medium'>
                        {u.firstName} {u.lastName}
                      </p>
                      <p className='text-sm text-neutral-400'>@{u.username}</p>
                      <p className='text-sm text-neutral-500'>
                        📞 {u.phone || 'No phone'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => openSendModal(u)}
                    className='flex items-center gap-2 bg-blue-600 hover:bg-blue-800 py-2 px-4 rounded-lg font-medium transition-all cursor-pointer duration-150'
                  >
                    <Send size={16} />
                    Send
                  </button>
                </div>
              )
            })
          ) : (
            <div className='col-span-2 text-center text-neutral-400 py-10 italic'>
              No users found
            </div>
          )}
        </div>
      )}

      {/* Send Money Modal */}
      {selectedUser && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
          <div className='bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-md mx-4'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Send Money</h2>
              <button
                onClick={closeSendModal}
                className='text-neutral-400 hover:text-white transition-colors'
              >
                <X size={20} />
              </button>
            </div>

            <div className='flex items-center gap-3 mb-6 p-3 bg-neutral-800 rounded-lg'>
              <Avatar
                firstName={selectedUser.firstName || selectedUser.username}
                lastName={selectedUser.lastName}
                size={40}
                colorIndex={[...selectedUser.username].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 6}
              />
              <div>
                <p className='font-medium'>
                  {selectedUser.firstName} {selectedUser.lastName}
                </p>
                <p className='text-sm text-neutral-400'>@{selectedUser.username}</p>
              </div>
            </div>

            <div className='mb-6'>
              <label className='block text-sm text-neutral-400 mb-2'>
                Amount (₹)
              </label>
              <input
                type='number'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder='Enter amount'
                min='1'
                step='0.01'
                className='w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 text-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-neutral-500'
                autoFocus
              />
            </div>

            <div className='flex gap-3'>
              <button
                onClick={closeSendModal}
                className='flex-1 py-3 px-4 border border-neutral-700 rounded-lg font-medium hover:bg-neutral-800 transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={handleSendMoney}
                disabled={sending || !amount}
                className='flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center justify-center gap-2'
              >
                {sending ? 'Sending...' : (
                  <>
                    <Send size={16} />
                    Send Money
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
