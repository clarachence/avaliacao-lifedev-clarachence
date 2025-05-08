import styles from './Login.module.css'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [error, setError] = useState('')
  const { signInWithGoogle, error: authError, loading } = useAuthentication()
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
      navigate('/dashboard')
    } catch (error) {
      setError('Ocorreu um erro ao fazer login com Google')
    }
  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para utilizar o sistema</p>
      <button 
        className={styles.google_button} 
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'Entrar com Google'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default Login