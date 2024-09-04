import { useSelector } from 'react-redux'
import { Link , useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminLogout } from '../redux/admin/adminSlice'

const AdminHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout')
      dispatch(adminLogout())
      navigate('/admin')
    } catch (error) {
      console.log(error);
      
    }
  }
  const { admin } = useSelector(state => state.admin)
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/admin/home'>
          <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-4'>
        { admin ? (
              <li className="text-slate-600">{ admin.name }</li>
            ) : ''}
            { admin ? (
              <li onClick={handleLogout} className="text-red-600 font-bold cursor-pointer">Sign Out</li>
            ) : ''}
        </ul>
      </div>
    </div>
  )
}

export default AdminHeader
