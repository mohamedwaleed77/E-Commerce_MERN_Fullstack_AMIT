'use client'
import React, { lazy, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../../../lib/lang';
import Cookies from 'js-cookie';
import Notfound from '../not-found';
const Usercard =lazy(()=>import('./userconfigComponents/usercard'));

export default function Page() {
    if (localStorage.getItem('role')!="admin"){
      return(<Notfound></Notfound>)
    }
  const t = useTranslation();
  const toggleLanguage = useSelector((state) => state.toggle.value);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const [showAddUser, setShowAddUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form input states
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Filter checkboxes
  const [filterAdmin, setFilterAdmin] = useState(false);
  const [filterUser, setFilterUser] = useState(false);
  const [filterEmailConfirmed, setFilterEmailConfirmed] = useState(false);
  const [filterEmailNotConfirmed, setFilterEmailNotConfirmed] = useState(false);

  const fetchUsers = async () => {
    let allUsers = [];
    let currentPage = 1;

    try {
      while (true) {
        const res = await fetch(`http://localhost:3004/?page=${currentPage}`, {
          method: 'GET',
          headers: {
            token: Cookies.get('token'),
          },
        });
        const data = await res.json();

        if (data.users.length === 0) break;

        allUsers = [...allUsers, ...data.users];
        currentPage++;
      }

      setUsers(allUsers);
      setFilteredUsers(allUsers);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  // Filter Logic
  useEffect(() => {
    let filtered = users.filter(user => {
      const nameMatches = user.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const idMatches = user._id?.toLowerCase().includes(searchQuery.toLowerCase());

      // Filters
      const isAdmin = user.role === 'admin';
      const isUser = user.role === 'user';
      const emailConfirmed = user.emailConfirmed === true;

      let pass = nameMatches || idMatches;

      if (filterAdmin && !isAdmin) pass = false;
      if (filterUser && !isUser) pass = false;
      if (filterEmailConfirmed && !emailConfirmed) pass = false;
      if (filterEmailNotConfirmed && emailConfirmed) pass = false;

      return pass;
    });

    setFilteredUsers(filtered);
    setPage(1);
  }, [searchQuery, users, filterAdmin, filterUser, filterEmailConfirmed, filterEmailNotConfirmed]);

  const currentPageUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const handleAddUser = async (name, email, password) => {
    try {
      const res = await fetch('http://localhost:3004/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: Cookies.get('token')
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (data.msg === 'done') {
        fetchUsers();
        setShowAddUser(false);
        setErrorMsg('');
        setNameInput('');
        setEmailInput('');
        setPasswordInput('');
      } else {
        setErrorMsg(data.msg || data.err || data.error);
      }
    } catch (err) {
      setErrorMsg('Error adding user');
      console.error('Error adding user:', err);
    }
  };

  const scrollToAddUserForm = () => {
    document.getElementById("addUserForm")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center bg-red-400 h-full'>
      <div className="flex items-center justify-center">
        <button
          onClick={() => {
            setShowAddUser(!showAddUser);
            if (!showAddUser) scrollToAddUserForm();
          }}
          className="mt-5 px-4 py-2 bg-green-500 text-white rounded-full cursor-pointer"
        >
          +  {i18n.t('AddUser')}
        </button>
      </div>

      {showAddUser && (
        <div id="addUserForm" className="mt-5 p-5 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl mb-3">{i18n.t('AddUser')}</h3>
          <input type="text" placeholder="Name" className="mb-3 p-2 w-full border rounded cursor-pointer" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
          <input type="email" placeholder="Email" className="mb-3 p-2 w-full border rounded cursor-pointer" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
          <input type="password" placeholder="Password" className="mb-3 p-2 w-full border rounded cursor-pointer" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
          <div className="flex gap-3 mt-4">
            <button onClick={() => handleAddUser(nameInput, emailInput, passwordInput)} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
              {i18n.t('AddUser')}
            </button>
            <button onClick={() => setShowAddUser(false)} className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer">
              {i18n.t('Cancel')}
            </button>
          </div>
          {errorMsg && <p className="text-red-500 ml-3 mt-2">{errorMsg}</p>}
        </div>
      )}

 
      <div className="flex flex-col items-center mt-10 w-full">
        <input
          type="text"
          placeholder={i18n.t('SearchbyIDorName')}
          className="text-xl h-10 w-1/2 text-black rounded-t-full bg-white text-center"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />

      </div>



      <div className='flex justify-center flex-col items-center  bg-slate-200 w-4/5 rounded-4xl'>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
          <label><input type="checkbox" checked={filterAdmin} onChange={() => setFilterAdmin(!filterAdmin)} /> {i18n.t('Admins')}</label>
          <label><input type="checkbox" checked={filterUser} onChange={() => setFilterUser(!filterUser)} /> {i18n.t('Users')}</label>
          <label><input type="checkbox" checked={filterEmailConfirmed} onChange={() => setFilterEmailConfirmed(!filterEmailConfirmed)} /> {i18n.t('emailconfirmed')}</label>
          <label><input type="checkbox" checked={filterEmailNotConfirmed} onChange={() => setFilterEmailNotConfirmed(!filterEmailNotConfirmed)} /> {i18n.t('emailNotconfirmed')}</label>
        </div>
      <div className='bg-slate-200 w-full  h-full flex justify-center'>
        <div className='mt-5'>
          <p className='text-2xl py-5 text-center'>{i18n.t('users')}:</p>
          <div className='flex flex-wrap justify-center gap-5'>
            {currentPageUsers.length > 0 ? (
              currentPageUsers.map((user) => (
                <Usercard key={user._id} user={user} />
              ))
            ) : (
              <p>{i18n.t('No users found')}</p>
            )}
          </div>
          <div className="pagination my-5 flex justify-center py-5">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              {i18n.t('Previous')}
            </button>
            <p>{`${i18n.t('Page')} ${page} ${i18n.t('of')} ${totalPages}`}</p>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              {i18n.t('Next')}
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
