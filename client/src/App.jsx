import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WeatherSearch from './components/Weather';
import SignUp from './components/SignUp';
import Login from './components/Login';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import Reports from './components/Reports';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
    {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute element={<WeatherSearch />} />} // Protect this route
        />
        <Route path="/reports" element={<Reports />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
