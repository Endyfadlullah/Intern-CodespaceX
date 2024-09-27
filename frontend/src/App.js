import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPanel from './pages/AdminPanel';
import LoginRegister from './pages/auth/LoginRegister';
import ForgotPassword from './pages/auth/ForgotPassword';
import CodeOTP from './pages/auth/CodeOTP';
import ResetPassword from './pages/auth/ResetPassword';
import PublicRoute from './pages/auth/PublicRoute';
import ProtectedRoute from './pages/auth/protectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PublicRoute element={LoginRegister} />} />
        <Route path="/forgot" element={<PublicRoute element={ForgotPassword} />} />
        <Route path="/reset" element={<PublicRoute element={ResetPassword} />} />
        <Route path="/otp" element={<PublicRoute element={CodeOTP} />} />
        <Route path="/admin/*" element={<ProtectedRoute element={AdminPanel} role="admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
