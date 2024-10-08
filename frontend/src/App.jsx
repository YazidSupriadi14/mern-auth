import React from 'react'
import FloatingShape from './components/FloatingShape.jsx'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import EmailVerificationPage from './pages/EmailVerificationPage.jsx'
import { Toaster } from 'react-hot-toast'
import DashboardPage from './pages/DashboardPage.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-sky-900 to-indigo-900
      flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-sky-500" size="w-64 h-64" top="-5%" left="-5%" delay={0}/>  
      <FloatingShape color="bg-indigo-500" size="w-48 h-48" top="70%" left="80%" delay={5}/>  
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2}/>  

      <Routes>

          <Route path="/" element= {<DashboardPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/verify-email' element={<EmailVerificationPage />} />

      </Routes>
      <Toaster/>
    
    </div>
  )
}

export default App
