import styles from './PostDetail.module.css'
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const PostDetail = () => {
  const { id } = useParams()
  const { document: post } = useFetchDocument("posts", id)

  return (
    <div className={styles.post_container}>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p className={styles.content}>{post.content}</p>
          <div className={styles.author}>
            <p>por: {post.createdBy}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default PostDetail