import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Style from './LayoutChat.module.scss'
import { BsSnapchat, BsChatDots } from "react-icons/bs";
import { MdOutlinePeopleAlt, MdLogout } from "react-icons/md";

export default function LayoutChat() {
  const location = useLocation()
const navigate = useNavigate()

  const [active, setActiveItem] = useState(-1)

  useEffect(()=>{
    const pathName = location.pathname
    setActiveItem(pathName==='/chat-app/chat' ? -1 : 1)
  },[location])
  return (
    <div className={clsx(Style.container, 'container-fluid')}>
      <div className={clsx(Style.menuWrap, 'col-sm-6 col-lg-1')}>
        <div>
          <BsSnapchat size={30} color="white" />
          <h4>CNM</h4>
        </div>
        <div className={clsx(Style.menuCenter)}>
          <BsChatDots size={35} className={clsx(Style.chatDots, active===-1? Style.active:'')} onClick={()=>{navigate('/chat-app/chat')}}/>
          <MdOutlinePeopleAlt size={35} className={clsx(Style.peopleAlt,'mt-4', active===1? Style.active:'')} onClick={()=>{navigate('/chat-app/chat/list-friend')}}/>
        </div>
        <div className="mb-4">
          <MdLogout size={35} />
        </div>
      </div>
      <div className="col-lg-11 col-sm-6">
        <Outlet/>
      </div>
    </div>
  );
}
