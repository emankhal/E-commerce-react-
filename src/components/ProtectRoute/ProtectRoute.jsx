
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'
import style from'./ProtectRoute.module.css'

export default function ProtectRoute({children}) {
  if(localStorage.getItem("userToken")){
    return children
  }else{
    return <Navigate to={"/login"} />
  }

}
