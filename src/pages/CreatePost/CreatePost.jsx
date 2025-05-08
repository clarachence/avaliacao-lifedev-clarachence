import styles from './CreatePost.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useAuthValue } from '../../context/AuthContext'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")

  const { user } = useAuthValue()
  const navigate = useNavigate()

  const { insertDocument, response } = useInsertDocument("posts")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    
    if (!title || !content) {
      setError("Por favor, preencha todos os campos!")
      return
    }

    try {
      await insertDocument({
        title,
        content,
        createdBy: user.displayName,
        uid: user.uid,
      })

    
      navigate("/dashboard")
    } catch (error) {
      setError("Erro ao criar post, tente novamente mais tarde")
    }
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense num bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="content"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        </label>
        {!response.loading && <button className="btn">Criar post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default CreatePost