import { useSelector } from "react-redux"
import { Outlet , Navigate } from "react-router-dom"

const AdminPrivateRoute = () => {
  const { admin } = useSelector(state => state.admin)
  return admin ? <Outlet /> : <Navigate to='/admin' />
}

export default AdminPrivateRoute
