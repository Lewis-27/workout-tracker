import React, { useEffect, useState } from 'react'
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
import { useUserStore } from '@/stores/userStore'

const Header = () => {
  const user = useUserStore((state) => state.user)
  const [scrolled, setScrolled] = useState(false)

  document.addEventListener('scroll', (e) => {
    if(window.scrollY > 0){
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  })


  return (
    <div id='nav' className="px-4 lg:px-32 xl:px-32 top-0 left-0 sticky">
    <div className={scrolled 
        ? "p-4 top-0 left-0 flex flex-row items-center justify-between bg-white shadow border border-gray-200 rounded-b-xl " 
        : "p-4 top-0 left-0 flex flex-row items-center justify-between  rounded-b-xl"}>
      <Link to={'/'}>
        <Button variant='secondary'>Workout Tracker</Button>
      </Link>
      {user.name
        ? <NavigationMenu >
            <NavigationMenuList >
              <NavigationMenuItem >
                <NavigationMenuTrigger >{user.name}</NavigationMenuTrigger>
                <NavigationMenuContent className={'w-64'}>
                  <ul className='w-24'>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to={'/editProfile'}>Edit Profile</Link>
                      </NavigationMenuLink>  
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to={'/logout'}>Logout</Link>
                      </NavigationMenuLink>  
                    </li>
                  </ul>
                  
                </NavigationMenuContent>
              </NavigationMenuItem>  
            </NavigationMenuList>
        
        </NavigationMenu>
        : <div className="flex flex-row gap-4">
        <Link className='text-[16px] ' to={'/login'}>
          <Button variant='link'>Log In</Button>
        </Link>
        <Link className='text-[16px]' to={'/signup'}>
          <Button variant='link'>Sign Up</Button>
        </Link>
      </div>}
      
      

    </div>
    </div>
  )
}

export default Header
