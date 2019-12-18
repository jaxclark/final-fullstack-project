import React from 'react'
import { Link } from 'react-router-dom'
import '../styling/navStyles.scss'

function Menu() {
    return(
        <div className='menuDiv'>
            <div className="menuLink">
                <Link to='/landingpage' >Home</Link>
            </div>
            <div className="menuLink">
                <Link to='/stories' >Stories</Link>
            </div>
            <div className="menuLink">
                <Link to='/newstory'>New</Link>
            </div>
        </div>
    )
}

export default Menu