import AllUsers from '../ui/allUsers'
import MyNavbar from '../ui/myNavbar'
import Welcome from '../ui/welcome'

export default function Dashboard () {
  return (
    <div className='w-full bg-black text-white min-h-screen'>
      <MyNavbar />
      <Welcome />
      <AllUsers />
    </div>
  )
}
