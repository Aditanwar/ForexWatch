import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import Navbar from './components/Navbar';
import AlertForm from './components/AlertForm';
import AlertList from './components/AlertList';
import Login from './pages/Login';
import Register from './pages/Register';

const Dashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  const handleAlertCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <AlertForm onAlertCreated={handleAlertCreated} />
      <AlertList refreshTrigger={refreshTrigger} />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
