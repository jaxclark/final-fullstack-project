import React, { useState, useContext } from 'react'
import { WriterContext } from '../ContextProvider'

function Login() {
    const { login } = useContext(WriterContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setError] = useState('')

    const handleChange = e => {
        const { name, value } = e.target
        if(name === 'username'){
            setUsername(value)
        } else {
            setPassword(value)
        }
    }

    const clearInputs = () => {
        setUsername('')
        setPassword('')
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        login({username, password})
            .then(() => {
            })
            .catch(err => {
                console.log(err)
                setError(err.response.data.message)
            })
            clearInputs()
    }

    return(
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <h3>Log In</h3>
                <input
                    onChange={handleChange}
                    value={username}
                    name="username"
                    type="text"
                    placeholder="username"/>
                <input
                    onChange={handleChange}
                    value={password}
                    name="password"
                    type="password"
                    placeholder="password"/>
                <button type="submit">Submit</button>
            </form>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        </div>
    )
}

export default Login