import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPanel from './pages/AdminPanel';
import LoginRegister from './pages/auth/LoginRegister';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<LoginRegister />} />
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
