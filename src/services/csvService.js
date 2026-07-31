import Papa from 'papaparse'

async function tryFetch(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('not ok')
    return await res.text()
  } catch (e) {
    return null
  }
}

async function resolveUrl(filename) {
  const candidates = [`/data/${filename}`, `/${filename}`, `/public/data/${filename}`]
  for (const c of candidates) {
    const txt = await tryFetch(c)
    if (txt) return { url: c, text: txt }
  }
  return null
}

export async function parseCSVFromFilename(filename) {
  const resolved = await resolveUrl(filename)
  if (!resolved) throw new Error(`Could not find ${filename} in /data or project root. Place CSV in public/data/ or project root.`)
  const { text } = resolved
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true })
  return parsed.data
}

export async function loadAllCSVs() {
  const files = {
    dataset: 'dataset.csv',
    severity: 'Symptom-severity.csv',
    precautions: 'symptom_precaution.csv',
    medicines: 'medicine_dataset.csv',
    descriptions: 'symptom_Description.csv',
  }

  const results = {}
  for (const [key, fname] of Object.entries(files)) {
    try {
      results[key] = await parseCSVFromFilename(fname)
    } catch (e) {
      results[key] = []
      // swallow; hook will show empty state
    }
  }
  return results
}

export default { parseCSVFromFilename, loadAllCSVs }
