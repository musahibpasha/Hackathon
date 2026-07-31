import { useEffect, useState } from 'react'
import csvService from '../services/csvService'

export function useData() {
  const [data, setData] = useState({ dataset: [], severity: [], precautions: [], medicines: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    csvService
      .loadAllCSVs()
      .then((res) => {
        if (!mounted) return
        setData(res)
        setLoading(false)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err)
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return { data, loading, error }
}

export default useData
