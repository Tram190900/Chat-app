import React, { useContext } from 'react'
import { UserContext } from '../Context/userContext'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRouter({children}) {
let user = JSON.parse(localStorage.getItem('user'))
if(!user){
    return <Navigate to={'/chat-app/login'} replace></Navigate>
}
  return children
}
