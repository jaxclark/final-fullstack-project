import React, { useContext } from 'react'
import StoriesList from './StoriesList'
import { WriterContext } from '../ContextProvider'
import '../styling/storiesStyles.scss'
import Menu from './Menu'

export default function() {
    const { user } = useContext(WriterContext)
    return(
        <div className='landingPage'>
            <Menu />
            <h1>{user.username}</h1>
            <StoriesList type='userPage' />
        </div>
    )
}