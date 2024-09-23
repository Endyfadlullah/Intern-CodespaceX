import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPanel from './pages/AdminPanel';
import LoginRegister from './pages/auth/LoginRegister';
import ForgotPassword from './pages/auth/ForgotPassword';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<LoginRegister />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
