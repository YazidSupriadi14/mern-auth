import React from 'react'
import FloatingShape from './components/FloatingShape.jsx'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import EmailVerificationPage from './pages/EmailVerificationPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import { Toaster } from 'react-hot-toast'
import DashboardPage from './pages/DashboardPage.jsx'
import { useAuthStore } from './store/AuthStore.js'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'


const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {

  const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-sky-900 to-indigo-900
      flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-sky-500" size="w-64 h-64" top="-5%" left="-5%" delay={0}/>  
      <FloatingShape color="bg-indigo-500" size="w-48 h-48" top="70%" left="80%" delay={5}/>  
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2}/>  

      <Routes>

      <Route
					path='/'
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
        <Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

        <Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path='/verify-email' element={<EmailVerificationPage />} />
				

				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />

      </Routes>
      <Toaster/>
    
    </div>
  )
}

export default App
