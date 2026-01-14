import React from 'react'
import { Link } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Button } from './ui/button'

const Header = () => {
  return (
    <div className="p-4 lg:px-32 xl:px-64 sticky-top flex flex-row items-center justify-between">
      <Link to={'/'}>
        <Button variant='ghost'>Workout Tracker</Button>
      </Link>
      <div className="flex flex-row gap-4">
        <Link className='text-[16px] ' to={'/login'}>
          <Button variant='link'>Log In</Button>
        </Link>
        <Link className='text-[16px]' to={'/signup'}>
          <Button variant='link'>Sign Up</Button>
        </Link>
      </div>


    </div>

  )
}

export default Header
