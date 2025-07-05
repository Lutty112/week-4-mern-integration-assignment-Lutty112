import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-yellow-800 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-3xl font-extrabold hover:text-orange-600">
        RecipeSharingApp
      </Link>

      <div className="space-x-6 flex items-center">
        {user ? (
          <>
            <span className="mr-4 text-lg">{user.name || user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-yellow-600 hover:bg-orange-500 px-4 py-2 rounded font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'underline font-semibold' : 'hover:text-orange-600 font-medium'
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? 'underline font-semibold' : 'hover:text-orange-600 font-medium'
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
