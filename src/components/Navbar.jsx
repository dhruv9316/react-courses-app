import React from 'react'
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
  return (
    <div className='navbar_wrapper'>
        <div className='navbar_container'>
            <button
                onClick={() => {navigate('/')}}
                className={`${location.pathname === '/' ? 'nav_selected' : ''}`}
            >
                Home
            </button>
            <button 
                onClick={ () => {navigate('/dashboard')}}
                className={`${location.pathname === '/dashboard' ? 'nav_selected' : ''}`}
            >
                Dashboard
            </button>
        </div>
    </div>
  )
}

export default Navbar