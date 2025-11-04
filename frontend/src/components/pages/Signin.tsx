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
import { DotBackgroundDemo } from '../ui/dotBackground'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

export default function Signin () {
  const [cred, setCred] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  async function signinHandler () {
    const payload = {
      ...cred
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/signin',
        payload
      )
      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        toast.success(response.data.message)
        navigate('/dashboard')
      }
    } catch (e: any) {
      const errMsg = e.response.data.error
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
                placeholder='Password'
                onChange={handleChange}
              />
              <Button
                onClick={() => setShowPassword(!showPassword)}
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
              Sign-in
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
