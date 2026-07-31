export function normalizeDatasetRows(datasetRows) {
  const diseases = {}
  for (const row of datasetRows) {
    const disease = (row['Disease'] || row['disease'] || '').trim()
    if (!disease) continue
    const symptoms = []
    for (let i = 1; i <= 20; i++) {
      const key = `Symptom_${i}`
      const raw = row[key] || row[`Symptom_${i}`] || row[`symptom_${i}`]
      if (raw && raw.trim()) symptoms.push(raw.trim())
    }
    // also collect any non-empty values beyond the fixed keys
    Object.values(row).forEach((v) => {
      if (!v) return
      const s = String(v).trim()
      if (s && !s.includes('Disease') && !s.match(/Symptom_\d+/) && !symptoms.includes(s)) {
        // ignore if it's the disease name
        if (s.toLowerCase() === disease.toLowerCase()) return
        // if it looks like a symptom token (underscore), include
        if (s.includes('_')) symptoms.push(s)
      }
    })

    if (!diseases[disease]) diseases[disease] = new Set()
    symptoms.forEach((s) => diseases[disease].add(s))
  }

  const normalized = Object.entries(diseases).map(([name, set]) => ({ name, symptoms: Array.from(set) }))
  return normalized
}

export function buildSeverityMap(severityRows) {
  const map = {}
  for (const r of severityRows) {
    const symptom = (r['Symptom'] || r['symptom'] || '').trim()
    const weight = Number(r['weight'] || r['Weight'] || r['weight '] || 0)
    if (symptom) map[symptom] = weight || 1
  }
  return map
}

export function buildPrecautionsMap(precRows) {
  const map = {}
  for (const r of precRows) {
    const disease = (r['Disease'] || r['disease'] || '').trim()
    if (!disease) continue
    map[disease] = []
    for (let i = 1; i <= 10; i++) {
      const k = `Precaution_${i}`
      if (r[k] && r[k].trim()) map[disease].push(r[k].trim())
    }
    // also try other keys
    Object.keys(r).forEach((k) => {
      if (k.toLowerCase().startsWith('precaution') && r[k] && r[k].trim()) {
        if (!map[disease].includes(r[k].trim())) map[disease].push(r[k].trim())
      }
    })
  }
  return map
}

export function normalizeMedicines(medRows) {
  return medRows.map((r, idx) => ({
    id: r['Name'] ? r['Name'].trim() : `med-${idx}`,
    name: r['Name'] || r['name'] || 'Unknown',
    category: r['Category'] || r['category'] || '',
    form: r['Dosage Form'] || r['Dosage_Form'] || r['form'] || '',
    strength: r['Strength'] || r['strength'] || '',
    manufacturer: r['Manufacturer'] || r['manufacturer'] || '',
    indication: r['Indication'] || r['indication'] || '',
    classification: r['Classification'] || r['classification'] || '',
  }))
}

export function buildDiseaseCounts(normalizedDiseases) {
  const counts = {}
  normalizedDiseases.forEach((d) => {
    counts[d.name] = (counts[d.name] || 0) + 1
  })
  return counts
}

export default {
  normalizeDatasetRows,
  buildSeverityMap,
  buildPrecautionsMap,
  normalizeMedicines,
  buildDiseaseCounts,
}
