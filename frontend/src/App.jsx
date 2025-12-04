import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';

import Feed from './pages/Feed.jsx';
import SavedPost from './pages/SavedPost.jsx';
import Auth from './pages/Auth.jsx';
import Profile from './pages/Profile.jsx';
import CreatePost from './pages/CreatePost.jsx';


export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/saved' element={<SavedPost />} />
        <Route path='/auth' element={<Auth setUser={setUser}/>} />
        <Route path='/profile' element={<Profile user={user} setUser={setUser}/>} />
        <Route path='/create' element={<CreatePost/>}/>
      </Routes>
    </BrowserRouter>
  )
}
