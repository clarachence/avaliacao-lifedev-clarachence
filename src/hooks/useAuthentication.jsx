import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { 
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
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
      provider.setCustomParameters({
        prompt: 'select_account'
      })
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
      throw error
    }
  }

  const logout = () => {
    checkIfIsCancelled()
    signOut(auth)
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  const signInWithEmail = async (email, password) => {
    checkIfIsCancelled()
    setLoading(true)
    setError(null)

    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      setLoading(false)
      return result
    } catch (error) {
      let systemErrorMessage
      if (error.code === 'auth/invalid-credential') {
        systemErrorMessage = 'Email ou senha inválidos.'
      } else if (error.code === 'auth/user-not-found') {
        systemErrorMessage = 'Usuário não encontrado.'
      } else if (error.code === 'auth/wrong-password') {
        systemErrorMessage = 'Senha incorreta.'
      } else {
        systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
      }
      setError(systemErrorMessage)
      setLoading(false)
      throw error
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled()
    setLoading(true)
    setError(null)

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await updateProfile(user, {
        displayName: data.displayName,
      })

      setLoading(false)
      return user
    } catch (error) {
      let systemErrorMessage
      if (error.code === 'auth/email-already-in-use') {
        systemErrorMessage = 'Email já cadastrado.'
      } else if (error.code === 'auth/weak-password') {
        systemErrorMessage = 'A senha precisa ter pelo menos 6 caracteres.'
      } else if (error.code === 'auth/invalid-email') {
        systemErrorMessage = 'Email inválido.'
      } else {
        systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
      }
      setError(systemErrorMessage)
      setLoading(false)
      throw error
    }
  }

  return {
    auth,
    signInWithGoogle,
    signInWithEmail,
    createUser,
    logout,
    error,
    loading,
  }
}