import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginRegister from './page/LoginRegister/LoginRegister';
import AdminPanel from './page/AdminPanel/AdminPanel';

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
