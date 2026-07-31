import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-[280px]">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="pt-20 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
