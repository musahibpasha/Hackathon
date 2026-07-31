import { useEffect, useState } from 'react'

export default function useVoiceInput(initialLanguage = 'English') {
  const [language, setLanguage] = useState(initialLanguage)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [lastCaptured, setLastCaptured] = useState('')

  useEffect(() => {
    let timer
    if (listening) {
      timer = setTimeout(() => {
        const placeholderTranscripts = {
          English: 'I have headaches, fatigue and some dizziness.',
          Hindi: 'मुझे सिरदर्द, थकान और चक्कर आ रहे हैं।',
          Kannada: 'ನನಗೆ ತಲೆನೋವು, ದಣுக்கು ಮತ್ತು ತಲೆತಿರುಗುವಿಕೆ ಇದೆ.',
          Tamil: 'எனக்கு தலையில் தொடர் வலி, சோர்வு மற்றும் தலைசுற்றல் உள்ளது.',
          Telugu: 'నాకు తలనొప్పి, అలసట మరియు తల తిరుగు ఉంది.',
        }
        const newTranscript = placeholderTranscripts[language] || placeholderTranscripts.English
        setTranscript(newTranscript)
        setLastCaptured(newTranscript)
        setListening(false)
      }, 2200)
    }
    return () => clearTimeout(timer)
  }, [listening, language])

  const startListening = () => {
    setTranscript('')
    setListening(true)
  }

  const stopListening = () => {
    setListening(false)
  }

  return {
    language,
    setLanguage,
    listening,
    transcript,
    lastCaptured,
    startListening,
    stopListening,
  }
}
