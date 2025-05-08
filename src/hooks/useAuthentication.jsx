import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { 
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  
  const [cancelled, setCancelled] = useState(false)

  function checkIfIsCancelled() {
    if (cancelled) {
      return
    }
  }

  const signInWithGoogle = async () => {
    checkIfIsCancelled()
    setLoading(true)
    setError(null)

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      setLoading(false)
      return result
    } catch (error) {
      let systemErrorMessage
      if (error.message) {
        systemErrorMessage = error.message
      } else {
        systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
      }
      setError(systemErrorMessage)
      setLoading(false)
    }
  }

  const logout = () => {
    checkIfIsCancelled()
    signOut(auth)
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    signInWithGoogle,
    logout,
    error,
    loading,
  }
}