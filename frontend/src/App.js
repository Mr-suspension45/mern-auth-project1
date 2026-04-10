import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 FORCE LOGIN PAGE */}
        <Route path="/" element={<Login />} />

        {/* OTHER ROUTES */}
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 🔥 ANY UNKNOWN PATH → LOGIN */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;