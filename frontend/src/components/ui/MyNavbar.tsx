import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu
} from '@/components/ui/ResizableNavbar'
import Avatar from '@/components/ui/Avatar'

type MyNavbarProps = {
  firstName?: string
  lastName?: string
}

export default function MyNavbar ({ firstName, lastName }: MyNavbarProps) {
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      link: '/dashboard'
    },
    {
      name: 'Transactions',
      link: '/transactions'
    }
  ]

  function handleLogout () {
    console.log('logout')
    localStorage.removeItem('token')
    navigate('/')
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody className='border-2 border-neutral-700'>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className='flex items-center gap-4'>
          <Avatar firstName={firstName || 'U'} lastName={lastName || ''} />
          <NavbarButton variant='primary' onClick={handleLogout}>
            Logout
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              to={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className='relative text-neutral-300'
            >
              <span className='block'>{item.name}</span>
            </Link>
          ))}
          <div className='flex w-full flex-col gap-4'>
            <NavbarButton
              onClick={() => {
                setIsMobileMenuOpen(false)
                handleLogout()
              }}
              variant='primary'
              className='w-full'
            >
              Logout
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
