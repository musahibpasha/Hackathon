import { useMemo } from 'react'
import useData from './useData'
import normalize from '../data/normalizeData'

export default function useNormalizedData() {
  const { data, loading, error } = useData()

  const normalized = useMemo(() => {
    if (!data) return { diseases: [], severity: {}, precautions: {}, medicines: [], counts: {} }
    const diseases = normalize.normalizeDatasetRows(data.dataset || [])
    const severity = normalize.buildSeverityMap(data.severity || [])
    const precautions = normalize.buildPrecautionsMap(data.precautions || [])
    const medicines = normalize.normalizeMedicines(data.medicines || [])
    const counts = normalize.buildDiseaseCounts(diseases)
    return { diseases, severity, precautions, medicines, counts }
  }, [data])

  return { ...normalized, loading, error }
}
