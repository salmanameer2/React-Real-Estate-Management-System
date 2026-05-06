import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import bannerImg from '../../assets/bannerimage.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <div className="bg-bg-alt min-h-screen pt-32 pb-24 flex items-center">
      <div className="container max-w-5xl">
        <div className="card-premium overflow-hidden flex flex-col md:flex-row shadow-2xl">
          
          {/* Image Side */}
          <div className="md:w-1/2 relative hidden md:block">
            <img src={bannerImg} alt="Luxury Real Estate" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
              <h2 className="text-3xl font-extrabold mb-4">Welcome Back</h2>
              <p className="text-white/80">Access your saved properties, manage your listings, and continue your journey with us.</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-text-main mb-2">Sign In</h2>
              <p className="text-text-muted">Enter your details to access your account</p>
            </div>

            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3 mb-8 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p><strong>Demo Note:</strong> Enter an email containing <code>admin</code> (e.g., admin@test.com) to access Admin Dashboard. Any other email logs you in as a regular user.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com" 
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm transition-colors" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-text-main">Password</label>
                  <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm transition-colors" 
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary py-4 mt-4 w-full gap-2">
                <LogIn size={18} /> Sign In
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-text-muted">
              Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
