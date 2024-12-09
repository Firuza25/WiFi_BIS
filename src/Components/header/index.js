import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    return (
        <nav className='header-container'>
            {
                userLoggedIn
                    ?
                    <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-purple-600 underline'>
                        Logout
                    </button>
                    :
                    <>
                        <Link className='text-sm text-purple-600 underline' to={'/login'}>Login</Link>
                        <Link className='text-sm text-purple-600 underline' to={'/register'}>Register New Account</Link>
                    </>
            }
        </nav>
    )
}

export default Header
