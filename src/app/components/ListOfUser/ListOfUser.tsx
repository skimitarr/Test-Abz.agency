'use client'
import { useEffect, useState } from "react";
import applySpec from 'ramda/es/applySpec';
import fastDeepEqual from 'fast-deep-equal';

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectFromAppData } from '@/app/store/selectors/data';
import { ApiResponseUsers, User } from "@/app/store/types";
import { handleMouseEnter, handleMouseLeave } from "../utils/tooltipUtils";
import "./style.css";

type Selector = {
  answer: ApiResponseUsers,
  allUsers: User[],
};

const selector = applySpec<Selector>({
  answer: selectFromAppData('answer', {
    success: false,
    page: 0,
    total_pages: 0,
    total_users: 0,
    count: 0,
    links: { next_url: null, prev_url: null },
    users: [],
  }),
  allUsers: selectFromAppData('allUsers', [])
});

export function ListOfUser() {
  const { answer, allUsers } = useAppSelector<Selector>(selector, fastDeepEqual);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [showBtn, setShowBtn] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: 'actionType/getAllUsers', payload: { url: '/users?page=1&count=6' } });
  }, []);

  useEffect(() => {
    setCurrentUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    if (answer.links.next_url) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  }, [answer]);

  const showMore = () => {
    if (answer.links.next_url) {
      const parts = answer.links.next_url.split('v1');
      const url = parts[1];
      dispatch({ type: 'actionType/getAllUsers', payload: { url } });
    }
  }

  const handleChangePhoneNumber = (number: string) => {
    const cleanNumber = number.replace(/\D/g, '');
    const formattedNumber = `+${cleanNumber.slice(0, 2)} (${cleanNumber.slice(2, 5)}) ${cleanNumber.slice(5, 8)} ${cleanNumber.slice(8, 10)} ${cleanNumber.slice(10)}`;
    return formattedNumber;
  }

  return (
    <section id='GET-request' className='global-pad'>
      <h2 className="title">Working with GET request</h2>
      {currentUsers.length ?
        <ul className='list'>
          {currentUsers.map((user) => (
            <li key={user.registration_timestamp + user.id} className="card">
              <img src={user.photo || '/photo-cover.svg'} alt="user's photo" className="card__photo" />
              <p className="card__name card__attr"
                onMouseEnter={(event) => handleMouseEnter(event, `${user.name}`)}
                onMouseLeave={handleMouseLeave}
              >{user.name}</p>
              <p className="card__text card__attr"
                onMouseEnter={(event) => handleMouseEnter(event, `${user.position}`)}
                onMouseLeave={handleMouseLeave}
              >{user.position}</p>
              <p className="card__text card__attr"
                onMouseEnter={(event) => handleMouseEnter(event, `${user.email}`)}
                onMouseLeave={handleMouseLeave}
              >{user.email}</p>
              <p className="card__text">{handleChangePhoneNumber(user.phone)}</p>
            </li>
          ))}
        </ul>
        : <div className="flex">
          <img src={'/preloader.png'} alt="preloader" className="preloader" />
        </div>
      }
      {showBtn &&
        <div className='flex'>
          <button className='btn show-more' onClick={() => showMore()}>Show more</button>
        </div>}
    </section>
  )
}
