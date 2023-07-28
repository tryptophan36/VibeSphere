import { useEffect, useMemo, useState } from 'react'
import {BrowserRouter, Navigate,Routes,Route} from 'react-router-dom'
import HomePage from './Pages/homepage/index'
import LoginPage from './Pages/loginpage/index'
import ProfilePage from './Pages/profilepage/index'
import ChatPage from './Pages/chatpage/index'
import './App.css'
import { ThemeProvider } from '@emotion/react'
import { themeSettings } from './themeSettings'
import { CssBaseline, createTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import {setMode,setLogout} from "./state/index"
import FlexBetween from './Components/flexBetween'

function App() {
  
  const mode = useSelector((state)=>state.mode)
  const token = useSelector((state)=>state.token)
  const theme = useMemo(()=> createTheme(themeSettings(mode)),[mode])
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={token?<HomePage/>:<Navigate to="/"/>} />
        <Route path="/profile/:userId" element={token?<ProfilePage/>:<Navigate to="/"/>} />
        <Route path="/chatPage" element={<ChatPage/>}/>
      </Routes>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
