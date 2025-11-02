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

export default function Signup () {
  const [cred, setCred] = useState({
    username: '',
    phone: Number(),
    firstName: '',
    lastName: '',
    password: ''
  })
  const navigate = useNavigate()
  async function signupHandler () {
    const payload = {
      ...cred,
      phone: Number(cred.phone)
    }
    const response = await axios.post(
      'http://localhost:3000/api/user/signup',
      payload
    )
    if (response.data.success) {
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } else {
      console.log(response.data.error)
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
              <Label htmlFor='number'>Phone Number</Label>
              <Input
                id='phone'
                placeholder='Phone'
                onChange={handleChange}
                type='number'
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
            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                type='password'
                id='password'
                placeholder='Password'
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-3 items-center justify-center'>
            <Button
              type='submit'
              variant='primary'
              size='full'
              onClick={signupHandler}
            >
              Signup
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
