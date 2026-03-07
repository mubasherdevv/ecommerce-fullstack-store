import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState('');
  
  const { login, error, user, loading } = useAuth();
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
    setSubmitError('');
    const success = await login(email, password);
    if (!success && error) {
      setSubmitError(error);
    }
  };

  return (
    <div className="container-custom py-16 flex justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-extrabold text-dark mb-6 text-center">Welcome Back</h1>
        
        {submitError && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 text-center">{submitError}</div>}
        {error && !submitError && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 text-center">{error}</div>}
        
        <form onSubmit={submitHandler} className="space-y-4">
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

          <button
            type="submit"
            className="btn-primary w-full flex justify-center py-3"
            disabled={loading}
          >
            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-medium">
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-primary font-semibold hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
