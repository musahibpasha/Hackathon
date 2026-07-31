import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import ProfileGuard from './components/ProfileGuard'
import DashboardLayout from './components/layout/DashboardLayout'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import CompleteHealthProfile from './pages/CompleteHealthProfile'
import Dashboard from './pages/Dashboard'
import SymptomChecker from './pages/SymptomChecker'
import UploadReport from './pages/UploadReport'
import AIResult from './pages/AIResult'
import MedicineReminder from './pages/MedicineReminder'
import HealthTimeline from './pages/HealthTimeline'
import Profile from './pages/Profile'
import FindDoctors from './pages/FindDoctors'
import Settings from './pages/Settings'
import Appointments from './pages/Appointments'
import BookAppointment from './pages/BookAppointment'
import MedicineLibrary from './pages/MedicineLibrary'
import PatientHistory from './pages/PatientHistory'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#ffffff',
              color: '#091c35',
              border: '1px solid #c3c6d6',
              borderRadius: '12px',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/complete-profile" element={<CompleteHealthProfile />} />

          <Route
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <DashboardLayout />
                </ProfileGuard>
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/doctor-recommendation" element={<FindDoctors />} />
            <Route path="/upload-report" element={<UploadReport />} />
            <Route path="/ai-result" element={<AIResult />} />
            <Route path="/medicine-reminder" element={<MedicineReminder />} />
            <Route path="/health-timeline" element={<HealthTimeline />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/medicine-library" element={<MedicineLibrary />} />
            <Route path="/patient-history" element={<PatientHistory />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
