import styles from './Dashboard.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [posts, setPosts] = useState([])
  const { documents: postsData, loading } = useFetchDocuments("posts")
  const { deleteDocument } = useDeleteDocument()
  const navigate = useNavigate()

  useEffect(() => {
    if (postsData) {
      setPosts(postsData)
    }
  }, [postsData])

  if (loading) {
    return <div className="loading">Carregando posts...</div>
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <div className={styles.post_header}>
        <span>Posts</span>
        <Link to="/post/new" className="btn">
          Criar Post
        </Link>
      </div>
      <div className={styles.post_container}>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/post/new" className="btn">
              Criar primeiro post
            </Link>
          </div>
        ) : (
          posts &&
          posts.map((post) => (
            <div key={post.id} className={styles.post_card}>
              <h3>{post.title}</h3>
              <p>por: {post.createdBy}</p>
              <div className={styles.actions}>
                <Link to={`/post/${post.id}`} className="btn">
                  Ver
                </Link>
                <Link to={`/post/edit/${post.id}`} className="btn btn-outline">
                  Editar
                </Link>
                <button onClick={() => deleteDocument("posts", post.id)} className="btn btn-outline btn-danger">
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard