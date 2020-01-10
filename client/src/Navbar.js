import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { WriterContext } from './ContextProvider'
import './styling/navStyles.scss'

function Navbar() {
    const { user, token, logout } = useContext(WriterContext)
    return(
        <nav className="navbar">
            {token === '' ? 
                <>
                    <div className="navLink">
                        <Link to="/signup">Sign Up</Link>
                    </div>
                    <div className="navLink">
                        <Link to="/login">Log In</Link>
                    </div>
                </>
            :
                <>
                    <div className='verticalLogoDiv'>
                        <img className='verticalLogo' src="https://cdn.discordapp.com/attachments/632280517013930044/665311997021388830/combined_logo.png" alt="vertLogo"/>
                    </div>
                    <div className="logoutDiv">
                        <button className='logoutButton' onClick={logout}>Log Out</button>
                    </div>
                </>
            }
        </nav>
    )
}

export default Navbar