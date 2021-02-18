import Head from 'next/head'
import { useEffect, useState } from 'react';

import { users, messages, messages_users } from '../public/database.json';

export default function Home () {
  // .length(), .reverse(), .map(), .find(), .filter()

  // const garums = users.length();
  // const reversed = users.reverse();

  // const arr = users.map(u => {
  //   return {
  //     id: index,
  //     name: u.username,
  //     profilePicture: '/img/xx/sdkjfhs/dsf87' + u.avatar
  //   }
  // });

  // const arr = users.find(u => {
  //   return u.isBlocked === true;
  // });

  // const arr = users.filter(u => {
  //   return u.email.split('@')[1] === 'inbox.lv';
  // });

  // const arr = users.filter(u => {
  //   return u.email.split('@')[1] === 'gmail.com' && u.isBlocked === true;
  // });

  // console.log(arr);

  console.log(Array.from(new Set([3, 5, 1, 1, 2, 3, 4, 4, 5, 6, 1, 1, 3, 2])));

  return (
    <>
      <Head>
        <title>Social</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex flex-col p-8">
        {users.map((user, index) => (<div key={index}>{user.id} - {user.username} - {user.email}</div>))}
      </div>
    </>
  )
};
