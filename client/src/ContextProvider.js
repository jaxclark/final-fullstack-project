import React, { useState } from 'react'
import axios from 'axios'

export const storiesAxios = axios.create()
const outlinesAxios = axios.create()

storiesAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`
    return config
})
outlinesAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const WriterContext = React.createContext()

function ContextProvider(props) {
    const [userState, setUserState] = useState({
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || ""
    })
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {})
    // const [token, setToken] = useState(localStorage.getItem("token") || "")

    const [stories, setStories] = useState([])
    const [outlines, setOutlines] = useState([])

    const getStories = () => {
        return storiesAxios.get('/writer/story')
            .then(res => {
                setStories(res.data)
                return res
            })
        }

    const addStory = (newStory) => {
        return storiesAxios.post('/writer/story', newStory)
            .then(res => {
                // setStories(prev => [...prev, newStory])
                getStories()
                return res
            });
    }

    const editStory = (storyId, story) => {
        return storiesAxios.put(`/writer/story/${storyId}`, story)
            .then(res => {
                setStories(prev => {
                    const updatedStories = prev.map(story => {
                        return story._id === res.data._id ? res.data : story
                    })
                    return (updatedStories)
                })
                // return res;
            })
    }

    const deleteStory = (storyId) => {
        return storiesAxios.delete(`/writer/story/${storyId}`)
            .then(res => {
                setStories(prev => {
                    const updatedStories = prev.filter(story => {
                        return story._id !== storyId
                    })
                    return (updatedStories)
                })
                return res;
            })
    }

    const getOutlines = () => {
        return outlinesAxios.get('/writer/outline')
            .then(res => {
                setOutlines(res.data)
            })
            .catch(err => console.log(err))
    }

    const addOutline = (newOutline, story) => {

        return outlinesAxios.post('/writer/story', newOutline)
        .then(res => {
            getOutlines()
            return res
        });
    }

    const editOutline = (outlineId, outline) => {
        return outlinesAxios.put(`/writer/outline/${outlineId}`, outline)
            .then(res => {
                setOutlines(prev => {
                    const updatedOutlines = prev.map(outline => {
                        return outline._id === res.data._id ? res.data : outline
                    })
                    return (updatedOutlines)
                })
                return res;
            })
    }

    const deleteOutline = (outlineId) => {
        return outlinesAxios.delete(`/writer/outline/${outlineId}`)
            .then(res => {
                setOutlines(prev => {
                    const updatedOutlines = prev.filter(outline => {
                        return outline._id !== outlineId
                    })
                    return (updatedOutlines)
                })
                return res;
            })
    }

    const signup = (userInfo) => {
        console.log('sign provider')
        return axios.post('/auth/signup', userInfo)
            .then(response => {
                const { user, token } = response.data
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                setUserState(prev => ({
                    ...prev, user, token
                }))
                return response;
            })
    }

    const login = (credentials) => {
        return axios.post('/auth/login', credentials)
            .then(response => {
                const { token, user } = response.data;
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prev => ({
                    ...prev, user, token
                }))
                // getStories()
                // getOutlines()
                return response
            })
    }

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setStories([]);
        setUserState({
            user: {},
            token: ''
        })
    }
    // console.log(userState, stories)
    return(
        <WriterContext.Provider
            value={{
                ...userState,
                stories,
                getStories,
                addStory,
                editStory,
                deleteStory,
                outlines,
                getOutlines,
                addOutline,
                editOutline,
                deleteOutline,
                signup,
                login,
                logout
            }}>
            { props.children }
        </WriterContext.Provider>
    )
}

export { ContextProvider, WriterContext }