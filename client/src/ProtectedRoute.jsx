import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem('token'); // Retrieve the token from local storage
  return token ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;