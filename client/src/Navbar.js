import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { WriterContext } from './ContextProvider'

function Navbar() {
    const { token, logout } = useContext(WriterContext)
    return(
        <nav className="navbar-wrapper">
            {token === '' ? 
                <>
                    <div className="nav-link">
                        <Link to="/signup">Sign Up</Link>
                    </div>
                    <div className="nav-link">
                        <Link to="/login">Log In</Link>
                    </div>
                </>
            :
                <>
                    <div className="nav-link">
                        <Link to='/landingpage' >Home</Link>
                    </div>
                    <div className="nav-link">
                        <Link to='/stories' >Stories</Link>
                    </div>
                    <div className="nav-link">
                        <button onClick={logout}>Logout</button>
                    </div>
                </>
            }
        </nav>
    )
}

export default Navbar