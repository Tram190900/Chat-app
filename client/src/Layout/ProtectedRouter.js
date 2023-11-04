import React, { useContext } from 'react'
import { UserContext } from '../Context/userContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouter({children}) {
const userContext = useContext(UserContext)
let token = userContext.user.token
if(!token){
    return <Navigate to={'/chat-app/login'} replace></Navigate>
}
  return children
}
