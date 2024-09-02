import { Link , useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { signOut } from '../redux/user/userSlice'
import { toast } from 'react-toastify'

const Header = () => {
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = async () => {
      try {
        await fetch('/api/auth/signOut')
        dispatch(signOut())
        navigate('/sign-in')
        toast.success('Sign Out Successful', {
          className: 'text-green-600',
          autoClose: 1000,
          hideProgressBar: true,
        });
      } catch (error) {
        console.log(error);
        
      }
  }
  
  return (
    <div className='bg-slate-200'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
          <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
          { currentUser ? (
              <>
                <li>
                  <Link to='/profile' >
                    <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover'/>
                  </Link>
                </li>
                <li onClick={handleSignOut} className='text-red-600 font-bold cursor-pointer'>
                  Sign Out
                </li>
              </>
          ) : (
            <li>
              <Link to='/sign-in'>Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header
