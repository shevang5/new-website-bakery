import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncLoginUsers } from '../../store/action/userActions';
import axios from '../../api/config';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncLoginUsers({ email, password }))
      .then(() => navigate('/'))
      .catch((error) => console.log(error));
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMsg('');
    try {
      const { data } = await axios.post('/auth/forgot-password', { email: forgotEmail });
      setForgotMsg(data.message || 'If your email exists, a reset link was sent.');
    } catch (err) {
      setForgotMsg(err.response?.data?.message || 'Error sending reset link.');
    }
    setForgotLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
          <Link to="/register" className="text-blue-500 hover:text-blue-700">Don't have an account? Register</Link>
        </div>
        <div className="text-right">
          <button type="button" className="text-sm text-blue-600 hover:underline" onClick={() => setShowForgot(true)}>
            Forgot Password?
          </button>
        </div>
      </form>
      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => { setShowForgot(false); setForgotMsg(''); }}>&times;</button>
            <h3 className="text-lg font-bold mb-4">Reset Password</h3>
            <form onSubmit={handleForgot}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-3"
              />
              <button type="submit" disabled={forgotLoading} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold">
                {forgotLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            {forgotMsg && <p className="mt-3 text-sm text-center text-gray-700">{forgotMsg}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
