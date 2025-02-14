import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
export let authContext = createContext()



export default function CreatContext({ children }) {
    let [token, setToken] = useState(localStorage.getItem("userToken"))

  

    return <authContext.Provider value={{ token, setToken }}>
        {children}
    </authContext.Provider>
}
