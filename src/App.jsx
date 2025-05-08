import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { useAuthentication } from "./hooks/useAuthentication"
import { AuthProvider } from "./context/AuthContext"

// components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// pages
import Login from "./pages/Login/Login"
import Dashboard from "./pages/Dashboard/Dashboard"
import CreatePost from "./pages/CreatePost/CreatePost"
import PostDetail from "./pages/PostDetail/PostDetail"

function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <div className="load">Carregando...</div>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/post/new" element={user ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path="/post/:id" element={user ? <PostDetail /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App