import React from 'react'
import SignupForm from '@/components/SignupForm'
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
 } from '@/components/ui/card'
 import { Link } from 'react-router-dom'

const SignupPage = () => {
  return (
    <div className='flex items-center justify-center w-full h-150'>
      <Card>
        <CardHeader>
          <CardTitle>Sign up for your account</CardTitle>
          <CardDescription>Enter your name, email and password below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-center gap-1 text-center w-full">
            Already have an account? Login 
            <Link to='/login' className='underline'>here</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignupPage
