import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'

export default function App() {
  const [signedIn, setSignedIn] = useState(false)

  return (
    <BrowserRouter>
      <header className="site-header">
        <span className="brand-mark" aria-hidden="true">▶</span>
        <span>Playwright 로그인 실습</span>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={signedIn ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={() => setSignedIn(true)} />}
        />
        <Route
          path="/dashboard"
          element={signedIn ? <DashboardPage onLogout={() => setSignedIn(false)} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
