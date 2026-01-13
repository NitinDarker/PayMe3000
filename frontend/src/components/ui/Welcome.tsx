import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/lib/config'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'

type WelcomeProps = {
  name: string
  balance: number
  onBalanceUpdate?: () => void
}

export default function Welcome ({ name, balance, onBalanceUpdate }: WelcomeProps) {
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddMoney = async () => {
    const numAmount = parseFloat(amount)
    if (!numAmount || numAmount <= 0) {
      toast.error('Enter a valid amount')
      return
    }
    if (numAmount > 100000) {
      toast.error('Maximum deposit limit is ₹1,00,000')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${API_URL}/api/account/deposit`,
        { amount: numAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data.success) {
        toast.success(`₹${numAmount} added successfully!`)
        setShowModal(false)
        setAmount('')
        onBalanceUpdate?.()
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to add money')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mb-4 mt-18 text-center text-3xl font-bold gap-4 flex flex-col justify-center items-center'>
      <p>Welcome {name}</p>
      <p className='text-neutral-400'>Your Balance: ₹{(balance / 100).toFixed(2)}</p>
      <button
        onClick={() => setShowModal(true)}
        className='flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-base font-medium px-4 py-2 rounded-lg transition-colors'
      >
        <Plus size={18} />
        Add Money
      </button>

      {showModal && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
          <div className='bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-sm mx-4'>
            <h2 className='text-xl font-bold mb-4'>Add Money</h2>
            <div className='mb-4'>
              <label className='block text-sm text-neutral-400 mb-2'>
                Amount (₹)
              </label>
              <input
                type='number'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder='Enter amount'
                className='w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500'
                min='1'
                max='100000'
              />
              <p className='text-xs text-neutral-500 mt-1'>
                Maximum: ₹1,00,000
              </p>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={() => {
                  setShowModal(false)
                  setAmount('')
                }}
                className='flex-1 bg-neutral-700 hover:bg-neutral-600 text-white py-2 rounded-lg transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={handleAddMoney}
                disabled={loading}
                className='flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white py-2 rounded-lg transition-colors'
              >
                {loading ? 'Adding...' : 'Add Money'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
