import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { WriterContext } from '../ContextProvider'

function ProtectedRoute(props) {
    const { token } = useContext(WriterContext)
    const { component: Component, ...rest } = props
    
    return(
        token ?
            <Route {...rest} component={Component} /> 
            :
            <Redirect to='/login' />
    )
}

export default ProtectedRoute