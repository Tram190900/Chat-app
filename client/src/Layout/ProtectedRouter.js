import React, { useContext } from 'react'
import { UserContext } from '../Context/userContext'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRouter({children}) {
let token = JSON.parse(localStorage.getItem('user')).token
if(!token){
    return <Navigate to={'/chat-app/login'} replace></Navigate>
}
  return children
}
