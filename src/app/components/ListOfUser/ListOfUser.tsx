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
  allUsers: ApiResponseUsers,
};

const selector = applySpec<Selector>({
  allUsers: selectFromAppData('allUsers', {
    success: false,
    page: 0,
    total_pages: 0,
    total_users: 0,
    count: 0,
    links: { next_url: null, prev_url: null },
    users: [],
  }),
});

export function ListOfUser() {
  const { allUsers } = useAppSelector<Selector>(selector, fastDeepEqual);
  const users = allUsers.users;
  const [currentUsers, setCurrentUsers] = useState<User[]>([])
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: 'actionType/getAllUsers' });
  }, []);

  useEffect(() => {
    setCurrentUsers(users.slice(0, 6));
  }, [users]);

  const showMore = () => {
    const userPerPage = 6;
    let userOnPage = (count + 1) * userPerPage;
    setCount(prevCount => prevCount + 1);
    setCurrentUsers(users.slice(0, userOnPage));
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
            <li key={user.id} className="card">
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
      {currentUsers.length < users.length &&
        <div className='flex'>
          <button className='btn show-more' onClick={() => showMore()}>Show more</button>
        </div>}
    </section>
  )
}
