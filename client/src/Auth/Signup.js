import React, { useState, useContext } from 'react'
import { WriterContext } from '../ContextProvider'

function Signup() {
    const { signup } = useContext(WriterContext)

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
        console.log('submit')
        signup({username, password})
            .then(() => {
                console.log('signed up')
            })
            .catch(err => {
                setError(err.response.data.message)
            })
            clearInputs()
    }

    return(
        <div className="signup">
            <div className='authLogoDiv'>
                <img className='authLogo' src="https://cdn.discordapp.com/attachments/632280517013930044/665311997021388830/combined_logo.png" alt="vertLogo"/>
            </div>
            <form className='signupForm' onSubmit={handleSubmit}>
                <div className='signupDiv'>
                    <h2>Sign Up</h2>
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
                    <button type="submit">Create Account</button>
                </div>
            </form>
            {(errorMessage) && <p style={{color: 'red'}}>{errorMessage}</p>}
        </div>
    )
}

export default Signup