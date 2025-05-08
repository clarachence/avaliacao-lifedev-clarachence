import { NavLink } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../context/AuthContext'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { user } = useAuthValue()
  const { logout } = useAuthentication()

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <NavLink to="/" className={styles.brand}>
          Mini <span>Blog</span>
        </NavLink>
      </div>
      <ul className={styles.links_list}>
        {!user && (
          <li>
            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>
              Login
            </NavLink>
          </li>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : '')}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/post/new" className={({ isActive }) => (isActive ? styles.active : '')}>
                Novo Post
              </NavLink>
            </li>
            <li>
              <button onClick={logout} className={styles.logout_btn}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar