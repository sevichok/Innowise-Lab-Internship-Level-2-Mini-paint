import { useState, useEffect, useCallback } from 'react'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from '../sources/firebase'

export const useImagesHook = (activeUser: string | null, validReq: boolean) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [images, setImages] = useState<string[]>([])

  const sendRequest = useCallback(async () => {
    setLoading(true)
    setImages([])
    const imagesListRef = ref(storage, `images/${activeUser}`)
    const response = await listAll(imagesListRef)
    const data = response.items.map((item) => {
      return getDownloadURL(item)
    })
    Promise.all(data)
      .then((urls) => {
        setImages(urls)
      })
      .finally(() => setLoading(false))
  }, [activeUser])

  useEffect(() => {
    sendRequest()
  }, [activeUser, validReq, sendRequest])

  return { images, loading }
}
