import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Home, Trash2, Camera, User, Settings, ShieldAlert, Upload } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import PropertyCard from '../../components/property/PropertyCard';

const UserDashboard = () => {
  const { properties, wishlist, toggleWishlist } = useProperties();
  const { currentUser, updateProfile } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const avatarInputRef = useRef(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfile({ avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  if (!currentUser) {
    return (
      <div className="bg-bg-alt min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="card-premium p-12 text-center max-w-lg">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-text-main mb-4">Please Log In</h2>
          <p className="text-text-muted mb-8">You need to be logged in to view your profile and wishlist.</p>
          <Link to="/login" className="btn btn-primary px-8">Log In</Link>
        </div>
      </div>
    );
  }

  const wishlistedProperties = properties.filter(p => wishlist.includes(p.id));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name });
    setIsEditing(false);
  };

  return (
    <div className="bg-bg-alt min-h-screen pt-32 pb-24">
      <div className="container max-w-6xl">
        
        {/* Profile Header & Tabs */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
          {/* Avatar Area */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <div className="relative">
              <img 
                src={currentUser.avatar} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
              />
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <button 
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <Camera size={18} />
              </button>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-text-main">{currentUser.name}</h2>
              <span className="badge bg-primary-light text-primary mt-2">{currentUser.role === 'admin' ? 'Administrator' : 'User'}</span>
            </div>
          </div>

          {/* Details & Tabs */}
          <div className="flex-1 w-full bg-white rounded-3xl p-2 shadow-sm flex flex-col justify-end border border-border-color">
            <div className="p-6 md:p-8 flex-1">
              <h3 className="text-xl font-bold mb-2">Welcome back, {currentUser.name}!</h3>
              <p className="text-text-muted">Manage your personal information and view your saved properties here.</p>
            </div>
            
            <div className="flex gap-2 p-2 bg-bg-alt rounded-2xl m-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'profile' ? 'bg-white shadow-sm text-primary' : 'text-text-muted hover:bg-white/50'}`}
              >
                <Settings size={18} /> Profile Settings
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'wishlist' ? 'bg-white shadow-sm text-primary' : 'text-text-muted hover:bg-white/50'}`}
              >
                <Heart size={18} /> My Wishlist
                <span className="ml-2 px-2 py-0.5 rounded-md bg-bg-alt text-xs">{wishlistedProperties.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          
          {/* PROFILE SETTINGS TAB */}
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-premium p-8">
              <div className="flex justify-between items-center mb-8 border-b border-border-color pb-4">
                <h3 className="text-2xl font-bold text-text-main">Personal Information</h3>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="btn btn-outline text-sm py-2">
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="flex flex-col gap-6 max-w-2xl">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Full Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="p-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Profile Photo</label>
                    <div className="flex items-center gap-4">
                      <div className="relative group/avatar">
                        <img 
                          src={currentUser.avatar} 
                          alt="Avatar preview" 
                          className="w-20 h-20 rounded-full object-cover border-2 border-border-color"
                        />
                        <button 
                          type="button" 
                          onClick={() => avatarInputRef.current?.click()}
                          className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <Camera size={20} className="text-white" />
                        </button>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => avatarInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-border-color bg-bg-alt hover:border-primary hover:bg-primary/5 transition-all text-sm font-semibold text-text-muted hover:text-primary cursor-pointer"
                      >
                        <Upload size={16} />
                        Upload New Photo
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 opacity-60">
                    <label className="text-sm font-bold text-text-main">Email (Cannot be changed)</label>
                    <input type="text" value={currentUser.email} disabled className="p-3 rounded-xl border border-border-color bg-gray-100 cursor-not-allowed text-sm" />
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline">Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                  <div>
                    <p className="text-sm font-bold text-text-muted mb-1 uppercase tracking-wider">Full Name</p>
                    <p className="text-lg font-semibold text-text-main">{currentUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-muted mb-1 uppercase tracking-wider">Email Address</p>
                    <p className="text-lg font-semibold text-text-main">{currentUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-muted mb-1 uppercase tracking-wider">Account Role</p>
                    <p className="text-lg font-semibold text-text-main capitalize">{currentUser.role}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === 'wishlist' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {wishlistedProperties.length === 0 ? (
                <div className="card-premium py-24 px-8 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-bg-alt rounded-full flex items-center justify-center text-text-muted mb-6">
                    <Home size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-text-main mb-2">Your wishlist is empty</h3>
                  <p className="text-text-muted mb-8 max-w-md">Looks like you haven't saved any properties yet. Browse our collection and click the heart icon to save your favorites.</p>
                  <Link to="/properties" className="btn btn-primary px-8 py-3">
                    Browse Properties
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {wishlistedProperties.map((property, index) => (
                    <div key={property.id} className="relative group h-full">
                      <PropertyCard property={property} index={index} />
                      {/* Remove button override for dashboard */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(property.id);
                        }}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 hover:scale-110 transition-all shadow-md z-20"
                        title="Remove from Wishlist"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
