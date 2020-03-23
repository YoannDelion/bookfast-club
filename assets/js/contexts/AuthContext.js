import React from 'react'

//On décrit la FORME du contexte, et non ses valeurs
export default React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: value => {}
})