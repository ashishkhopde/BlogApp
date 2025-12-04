import React, { useState } from 'react'
import Register from '../components/Register';
import Login from '../components/Login';

export default function Auth({ setUser }) {

    const [isRegister, setIsRegister] = useState(false);

    return (
        <div>
            {
                isRegister ? <Register setIsRegister={setIsRegister} setUser={setUser}/>
                    : <Login setIsRegister={setIsRegister} setUser={setUser}/>
            }
        </div>
    )
}
