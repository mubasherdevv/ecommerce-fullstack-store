import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  
  const { register, error, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, user, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      const success = await register(name, email, password);
      // Let AuthContext's error state handle API failures
    }
  };

  return (
    <div className="container-custom py-16 flex justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-extrabold text-dark mb-6 text-center">Create Account</h1>
        
        {message && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 text-center">{message}</div>}
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 text-center">{error}</div>}
        
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-dark mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="input-field w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="input-field w-full"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-dark mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="input-field w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="input-field w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex justify-center py-3"
            disabled={loading}
          >
            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-medium">
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-primary font-semibold hover:underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}
