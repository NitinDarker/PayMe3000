import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { DotBackgroundDemo } from '@/components/ui/DotBackground'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'
import { API_URL } from '@/lib/config'

export default function Signup () {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [cred, setCred] = useState({
    username: '',
    phone: Number(),
    firstName: '',
    lastName: '',
    password: ''
  })

  async function handleSignup () {
    const payload = {
      ...cred,
      phone: Number(cred.phone)
    }

    if (!payload.username.trim()) return toast.error('Please enter a username.')
    if (payload.username.trim().length < 3)
      return toast.error('Username must be at least 3 characters long.')
    if (!payload.phone) return toast.error('Please enter a valid phone number.')
    if (!/^\d{10}$/.test(payload.phone.toString()))
      return toast.error('Phone number must be exactly 10 digits.')

    if (!payload.firstName.trim())
      return toast.error('Please enter your first name.')
    if (!payload.lastName.trim())
      return toast.error('Please enter your last name.')

    if (!payload.password.trim()) return toast.error('Please set a password.')
    if (payload.password.length < 8)
      return toast.error('Password must be at least 8 characters long.')

    const response = await toast.promise(
      axios.post(`${API_URL}/api/user/signup`, payload),
      {
        loading: 'Creating your account...',
        success: `Account created successfully!`,
        error: err =>
          err?.response?.data?.error || 'Signup failed. Please try again.'
      }
    )

    if (response.data.success) {
      localStorage.setItem('token', response.data.token)
      setTimeout(() => navigate('/dashboard'), 500)
    }
  }

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    setCred({ ...cred, [e.target.id]: e.target.value })
  }

  return (
    <>
      <DotBackgroundDemo>
        <Card className='w-md h-auto bg-neutral-900 text-white border-neutral-700'>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
          </CardHeader>
          <CardContent className='flex gap-6 flex-col'>
            <div>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                placeholder='Enter your username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input
                id='phone'
                placeholder='Phone Number'
                onChange={handleChange}
                type='tel'
                inputMode='numeric'
              />
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <div>
                <Label htmlFor='firstName'>First Name</Label>
                <Input
                  id='firstName'
                  placeholder='First Name'
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor='lastName'>Last Name</Label>
                <Input
                  id='lastName'
                  placeholder='Last Name'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='relative'>
              <Label htmlFor='password'>Password</Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='Enter your Password'
                onChange={handleChange}
              />
              <Button
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
                className='absolute right-1 w-auto top-7 text-gray-400 cursor-pointer hover:text-neutral-300 transition-all duration-200 h-auto'
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={2} />
                ) : (
                  <Eye size={18} strokeWidth={2} />
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-3 items-center justify-center'>
            <Button
              type='submit'
              variant='primary'
              size='full'
              onClick={handleSignup}
            >
              Sign Up
            </Button>
            <div>
              <span>Already have an account? </span>
              <Link to='/signin' className='text-neutral-400 underline'>
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </DotBackgroundDemo>
    </>
  )
}
