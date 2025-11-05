import Welcome from '../ui/welcome'
import DummyContent from '../ui/dummyContent'
import { NavbarDemo } from '../ui/Navbar'

export default function Dashboard () {
  
  return (
    <>
      <div className='bg-black text-white'>
        <NavbarDemo />
        <Welcome />
        <DummyContent />
      </div>
    </>
  )
}
