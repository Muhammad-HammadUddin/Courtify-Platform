import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Building2, Mail, Lock, Eye, EyeOff, UserCircle } from 'lucide-react';
import { toast } from 'react-toastify';

import { API_PATH } from '../utils/apiPath.js';
import axiosInstance from '../utils/axios.js';

export default function AuthPage() {
  const { mode } = useParams();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState(mode === 'signup' ? 'signup' : 'login');
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'signup' || mode === 'login') setAuthMode(mode);
  }, [mode]);

  console.log(import.meta.env.VITE_API_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        if (!email || !password) {
          setError('Please fill all fields');
          setLoading(false);
          return;
        }

        const res = await axiosInstance.post(API_PATH.AUTH.LOGIN_USER, {
          email,
          password
        },{withCredentials: true});
        console.log(res.data)
        
        localStorage.setItem('token', res.data.user.token);
        toast.success('Login successful!');

        // role comes from backend, assuming response has user.role
        const userRole = res.data.user.role;
        if (userRole === 'user') navigate('/user/dashboard');
        else if (userRole=== "court_owner") navigate('/owner/dashboard');
        else if (userRole === 'admin') navigate('/admin/dashboard');


      } else {
        // signup
        if (!username || !email || !password || !role) {
          setError('Please fill all fields');
          setLoading(false);
          return;
        }

        await axiosInstance.post(API_PATH.AUTH.REGISTER_USER, {
          username,
          email,
          password,
          role
        });

        toast.success('Account created successfully!');
        navigate('/auth/login');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    const newMode = authMode === 'login' ? 'signup' : 'login';
    navigate(`/auth/${newMode}`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side Image + Welcome */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 lg:hidden"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        />
        <div className="absolute inset-0 backdrop-blur-md lg:backdrop-blur-none lg:hidden" />
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/50">
              <span className="text-3xl font-bold text-white">C</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Courtify</h1>
            <p className="text-gray-400">
              {authMode === 'login' ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-800">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Signup Fields */}
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                    <div className="relative">
                      <UserCircle
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                        placeholder="johndoe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl outline-none"
                    >
                      <option value="user">User</option>
                      <option value="court_owner">Court Owner</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-11 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={toggleAuthMode}
                className="text-sm text-gray-400 hover:text-blue-500 transition-colors"
              >
                {authMode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <span className="font-semibold text-white">Sign up</span>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <span className="font-semibold text-white">Sign in</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div
        className="hidden lg:block lg:w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-900/40 to-blue-800/40" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center max-w-lg">
            <h2 className="text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
              Book Your Court,<br />Play Your Game
            </h2>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
              Join thousands of players and court owners using Courtify to streamline bookings and elevate the game.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
