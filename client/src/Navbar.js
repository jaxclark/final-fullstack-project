import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { WriterContext } from './ContextProvider'
import './styling/navStyles.scss'

function Navbar() {
    const { token, logout } = useContext(WriterContext)
    return(
        <nav className="navbar">
            {token === '' ? 
                <>
                    <div className="signupButton">
                        <Link to="/signup">Sign Up</Link>
                    </div>
                    <div className="loginButton">
                        <Link to="/login">Log In</Link>
                    </div>
                </>
            :
                <>
                    <div className="navLink">
                        <Link to='/landingpage' >Home</Link>
                    </div>
                    <div className="navLink">
                        <Link to='/stories' >Stories</Link>
                    </div>
                    <div className="navLink">
                        <Link to='/outlines'>Outlines</Link>
                    </div>
                    <div className="logoutDiv">
                        <button className='logoutButton' onClick={logout}>Logout</button>
                    </div>
                </>
            }
        </nav>
    )
}

export default Navbar