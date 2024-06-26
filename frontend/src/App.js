import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import RoleCheck from './Pages/RoleCheck';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rolecheck" element={<RoleCheck/>} />
      </Routes>
    </div>
  );
}

export default App;
