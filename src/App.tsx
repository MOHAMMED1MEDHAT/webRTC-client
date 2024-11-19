import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useAuthStore } from './store/authStore';
import { AuthGuard } from './components/AuthGuard';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Meeting } from './pages/Meeting';

function App() {
  const { setUser } = useAuthStore();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
        <Route path="/meeting/:id" element={<AuthGuard><Meeting /></AuthGuard>} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;