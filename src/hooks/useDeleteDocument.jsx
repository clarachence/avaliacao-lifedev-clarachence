import { useState, useEffect, useReducer } from "react"
import { db } from "../firebase/config"
import { doc, deleteDoc } from "firebase/firestore"

export const useDeleteDocument = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const deleteDocument = async (collection, id) => {
    try {
      setLoading(true)
      setError(null)

      const docRef = doc(db, collection, id)
      await deleteDoc(docRef)

      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return { deleteDocument, error, loading }
}