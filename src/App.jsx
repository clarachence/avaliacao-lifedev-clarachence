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
import Register from "./pages/Register/Register"
import Dashboard from "./pages/Dashboard/Dashboard"
import CreatePost from "./pages/CreatePost/CreatePost"
import PostDetail from "./pages/PostDetail/PostDetail"
import EditPost from "./pages/EditPost/EditPost"
import About from "./pages/About/About"

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
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/post/new" element={user ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path="/post/:id" element={user ? <PostDetail /> : <Navigate to="/login" />} />
          <Route path="/post/edit/:id" element={user ? <EditPost /> : <Navigate to="/login" />} />
              <Route path="/about" element={<About />} />
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