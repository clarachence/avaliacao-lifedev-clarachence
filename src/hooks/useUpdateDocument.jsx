import { useState, useEffect, useReducer } from "react"
import { db } from "../firebase/config"
import { doc, updateDoc } from "firebase/firestore"

export const useUpdateDocument = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const updateDocument = async (collection, id, data) => {
    try {
      setLoading(true)
      setError(null)

      const docRef = doc(db, collection, id)
      await updateDoc(docRef, data)

      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return { updateDocument, error, loading }
}