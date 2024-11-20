import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthGuard } from './components/AuthGuard';
import { ForgotPassword } from './pages/forget-password';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Meeting } from './pages/Meeting';
import { ResetPassword } from './pages/reset-password';
import { Signup } from './pages/signup';
import { useAuthStore } from './store/authStore';

function App() {
  const { setUser } = useAuthStore();

  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((user) => setUser(user))
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
        <Route path="/meeting/:id" element={<AuthGuard><Meeting /></AuthGuard>} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;