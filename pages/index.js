import Head from 'next/head'
import { useEffect, useState } from 'react';

import { users, messages, messages_users } from '../public/database.json';

export default function Home () {
  const [user, setUser] = useState(users.find(u => u.id === 1));
  const [respondent, setRespondent] = useState({ id: 0 });
  const [selectedChat, setSelectedChat] = useState([]);

  function changeUser () {
    if (user.id === users.length) {
      setUser(users.find(u => u.id === 1));
      setRespondent({ id: 0 });
    } else {
      setUser(users.find(u => u.id === user.id + 1));
      setRespondent({ id: 0 });
    }
  }

  function getAllConversations () {
    return messages_users.filter(i => i.from_user === user.id || i.to_user === user.id);
  }

  function getLatestMessages () {
    const set = new Set();

    for (const item of getAllConversations().reverse()) {
      if (item.from_user !== user.id) {
        set.add(item.from_user);
      }

      if (item.to_user !== user.id) {
        set.add(item.to_user);
      }
    }

    return Array.from(set);
  }

  useEffect(() => {
    if (respondent.id === 0 && getLatestMessages().length > 0) {
      setRespondent(users.find(u => u.id === getLatestMessages()[0]));
    }

    setSelectedChat(messages_users
      .filter(i => (i.from_user === user.id && i.to_user === respondent.id) || (i.from_user === respondent.id && i.to_user === user.id))
      .map(i => ({ ...i, message: messages.find(m => m.id === i.message_id).message }))
      .reverse()
    );
  }, [user, respondent]);

  return (
    <>
      <Head>
        <title>Social</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex flex-col">
        <div className="flex justify-end bg-white border-b py-1">
          <button className="flex items-center mx-4" onClick={() => changeUser()}>
            <img className="m-1 w-10 h-10 object-cover object-center rounded-full" src={user.avatar} />
            <div className="px-2">{user.username} ({user.id})</div>
          </button>
        </div>

        <div className="flex h-full overflow-y-auto">
          <div className="flex-none flex flex-col w-64 bg-gray-100 px-2">
            {getLatestMessages().map((id, index) => {
              return (
                <button
                  key={index}
                  className={`flex items-center mt-2 p-2 focus:outline-none rounded ${id === respondent.id ? 'bg-white' : 'hover:bg-gray-50'}`}
                  onClick={() => setRespondent(users.find(u => u.id === id))}
                >
                  <img className="w-12 h-12 object-cover object-center rounded-full" src={users.find(u => u.id === id).avatar} />
                  <p className="ml-4">{users.find(u => u.id === id).username} ({users.find(u => u.id === id).id})</p>
                </button>
              )
            })}
          </div>

          <div className="flex-auto flex flex-col overflow-y-auto border-l border-r">
            <div className="flex-auto flex flex-col-reverse overflow-y-auto">
              {selectedChat.map((item, index) => {
                return (
                  <div key={index} className={`flex w-3/4 ${item.from_user === user.id ? 'justify-end self-end' : ''}`}>
                    <div
                      className={`rounded mx-4 my-2 p-4 ${item.from_user !== user.id ? 'bg-gray-100' : 'bg-gray-700 text-white'}`}
                    >{item.message}</div>
                  </div>
                )
              })}
            </div>

            <div className="flex-none">
              <div className="flex items-center m-4">
                <input className="flex-auto bg-gray-100 p-4 rounded" type="text" placeholder="Message..." />
              </div>
            </div>
          </div>

          <div className="flex-none flex flex-col w-64 bg-gray-100 p-2 items-center">
            <div className="text-sm uppercase tracking-wider">Conversation Details</div>
          </div>
        </div>
      </div>
    </>
  )
};
