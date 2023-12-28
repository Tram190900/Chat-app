import React, { useState } from 'react'
import Style from './PaneListFriend.module.scss'
import clsx from 'clsx';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';

export default function PaneListFriend({selectActiveFriend}) {
    const ACTIVITY1 = "FriendsList";
    const ACTIVITY2 = "FriendRequest";
    const [selected, setSelected] = useState(ACTIVITY1);
  
    const handleSelect = (activity) => {
      setSelected(activity);
    };
    return (
      <div className={clsx(Style.listMethod)}>
        <div
          className={clsx(
            Style.btnListFriend,
            selected === ACTIVITY1 ? Style.action : ""
          )}
          onClick={() => {
            handleSelect(ACTIVITY1);
            selectActiveFriend(ACTIVITY1);
          }}
        >
          <MdOutlinePeopleAlt size={35} />
          Friends List
        </div>
        <div
          className={clsx(
            Style.btnFriendRequest,
            selected === ACTIVITY2 ? Style.action : ""
          )}
          onClick={() => {
            handleSelect(ACTIVITY2);
            selectActiveFriend(ACTIVITY2);
          }}
        >
          <AiOutlineUserAdd size={34} />
          Friend request
        </div>
      </div>
    );
}
