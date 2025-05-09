import styles from './Login.module.css'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signInWithGoogle, signInWithEmail, error: authError, loading } = useAuthentication()
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

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await signInWithEmail(email, password)
      navigate('/dashboard')
    } catch (error) {
      setError('Ocorreu um erro ao fazer login')
    }
  }

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para utilizar o sistema</p>
      <form onSubmit={handleEmailLogin} className={styles.form}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail do usuário"
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha do usuário"
          />
        </label>
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
      <div className={styles.separator}>
        <span>ou</span>
      </div>
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