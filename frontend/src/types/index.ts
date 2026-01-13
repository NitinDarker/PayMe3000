export type User = {
  _id: string
  username: string
  phone?: string
  firstName?: string
  lastName?: string
}

export type Transaction = {
  id: string
  from: User
  to: User
  amount: number
  timestamp: string
  type: 'sent' | 'received'
}
