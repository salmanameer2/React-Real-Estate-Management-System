import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import bannerImg from '../../assets/bannerimage.png';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
    navigate('/');
  };

  return (
    <div className="bg-bg-alt min-h-screen pt-32 pb-24 flex items-center">
      <div className="container max-w-5xl">
        <div className="card-premium overflow-hidden flex flex-col md:flex-row-reverse shadow-2xl">
          
          {/* Image Side */}
          <div className="md:w-1/2 relative hidden md:block">
            <img src={bannerImg} alt="Luxury Real Estate" className="w-full h-full object-cover scale-x-[-1]" />
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
              <h2 className="text-3xl font-extrabold mb-4">Start Your Journey</h2>
              <p className="text-white/80">Create an account to save your favorite properties, schedule viewings, and contact agents directly.</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-text-main mb-2">Create Account</h2>
              <p className="text-text-muted">Join us to explore premium real estate</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe" 
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm transition-colors" 
                  />
                </div>
              </div>

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
                <label className="text-sm font-bold text-text-main">Password</label>
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
                <UserPlus size={18} /> Sign Up
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-text-muted">
              Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
