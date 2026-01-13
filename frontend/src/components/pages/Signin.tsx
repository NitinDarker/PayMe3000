import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { DotBackgroundDemo } from '../ui/dotBackground'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { API_URL } from '@/lib/config'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function Signin () {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [cred, setCred] = useState({
    username: '',
    password: ''
  })

  async function signinHandler () {
    const payload = {
      ...cred
    }

    if (!payload.username) {
      toast.error('Please enter a username')
      return
    }
    if (!payload.password) {
      toast.error('Please enter your password')
      return
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/user/signin`,
        payload
      )

      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        toast.success(response.data.message)
        navigate('/dashboard')
      }
    } catch (e: any) {
      const errMsg = e.response?.data?.error || 'Sign in failed'
      toast.error(errMsg)
    }
  }

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    setCred({ ...cred, [e.target.id]: e.target.value })
  }

  return (
    <>
      <DotBackgroundDemo>
        <Card className='w-sm h-auto bg-neutral-900 text-white border-neutral-700'>
          <CardHeader>
            <CardTitle>Login</CardTitle>
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
                className='absolute right-1 w-auto top-7 text-gray-400 hover:cursor-pointer hover:text-neutral-300 transition-all duration-200 h-auto'
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
              onClick={signinHandler}
            >
              Sign In
            </Button>
            <div>
              <span>New user? </span>
              <Link
                to='/signup'
                className='text-neutral-400 underline font-medium'
              >
                Signup
              </Link>
            </div>
          </CardFooter>
        </Card>
      </DotBackgroundDemo>
    </>
  )
}
