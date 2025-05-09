import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import styles from './EditPost.module.css'

const EditPost = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const { document: post } = useFetchDocument('posts', id)
  const { updateDocument, response } = useUpdateDocument()
  const navigate = useNavigate()

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [post])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const data = {
        title,
        content,
      }

      await updateDocument('posts', id, data)
      navigate('/dashboard')
    } catch (error) {
      setError('Erro ao atualizar o post, tente novamente mais tarde')
    }
  }

  return (
    <div className={styles.edit_post}>
      <h2>Editando post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bom título..."
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
        {!response?.loading && <button className="btn">Editar</button>}
        {response?.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default EditPost