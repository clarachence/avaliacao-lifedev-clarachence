import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where
} from "firebase/firestore"

export const useFetchDocuments = (docCollection) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        setLoading(true)

        try {
            const collectionRef = collection(db, docCollection)
            const q = query(collectionRef, orderBy("createdAt", "desc"))

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                setDocuments(
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                )
            })

            setLoading(false)
            return () => unsubscribe()

        } catch (error) {
            console.log(error)
            setError(error.message)
            setLoading(false)
        }
    }, [docCollection])

    return { documents, loading, error }
}