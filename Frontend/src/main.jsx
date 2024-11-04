import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = ()=>{
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState(false);
  return (
    <Context.Provider value={{isAuthenticated, setisAuthenticated, user, setUser}}>
      <App />
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper></AppWrapper>
  </StrictMode>,
)
