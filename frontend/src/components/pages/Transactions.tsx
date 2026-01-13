import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { API_URL } from '@/lib/config'
import MyNavbar from '@/components/ui/MyNavbar'
import type { Transaction } from '@/types'

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const token = localStorage.getItem('token')
    let userDataLoaded = false
    let historyLoaded = false

    const checkLoadingComplete = () => {
      if (userDataLoaded && historyLoaded) {
        setLoading(false)
      }
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal
        })
        if (response.data.success) {
          setFirstName(response.data.data.firstName)
          setLastName(response.data.data.lastName)
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err)
          toast.error('Failed to load user data')
        }
      } finally {
        userDataLoaded = true
        checkLoadingComplete()
      }
    }

    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/account/history`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal
        })
        if (response.data.success) {
          setTransactions(response.data.data)
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err)
          toast.error('Failed to load transaction history')
        }
      } finally {
        historyLoaded = true
        checkLoadingComplete()
      }
    }

    fetchUserData()
    fetchHistory()

    return () => controller.abort()
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className='w-full bg-black text-white min-h-screen'>
      <MyNavbar firstName={firstName} lastName={lastName} />
      <div className='p-8 max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold mb-2'>Transaction History</h1>
        <p className='text-neutral-400 mb-8'>Your recent transactions</p>

        {loading ? (
          <p className='text-center text-neutral-400 italic py-10'>Loading...</p>
        ) : transactions.length === 0 ? (
          <div className='text-center text-neutral-400 py-16 bg-neutral-900 rounded-xl border border-neutral-800'>
            <p className='text-lg'>No transactions yet</p>
            <p className='text-sm mt-2'>Send money to see your history here</p>
          </div>
        ) : (
          <div className='space-y-3'>
            {transactions.map((t) => (
              <div
                key={t.id}
                className='flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-colors'
              >
                <div className='flex items-center gap-4'>
                  <div
                    className={`p-2 rounded-full ${
                      t.type === 'sent'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {t.type === 'sent' ? (
                      <ArrowUpRight size={20} />
                    ) : (
                      <ArrowDownLeft size={20} />
                    )}
                  </div>
                  <div>
                    <p className='font-medium'>
                      {t.type === 'sent' ? 'Sent to ' : 'Received from '}
                      <span className='text-neutral-300'>
                        {t.type === 'sent'
                          ? `${t.to.firstName || ''} ${t.to.lastName || ''}`.trim() || t.to.username
                          : `${t.from.firstName || ''} ${t.from.lastName || ''}`.trim() || t.from.username}
                      </span>
                    </p>
                    <p className='text-sm text-neutral-500'>
                      {formatDate(t.timestamp)}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-lg font-semibold ${
                    t.type === 'sent' ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {t.type === 'sent' ? '-' : '+'}₹{(t.amount / 100).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
