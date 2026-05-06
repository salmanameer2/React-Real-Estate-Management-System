import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Home, MapPin, DollarSign, Image as ImageIcon, ShieldAlert, Upload, X } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { properties, addProperty, editProperty, deleteProperty } = useProperties();
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '', price: '', location: '', type: 'House', status: 'For Sale', bedrooms: '', bathrooms: '', area: '', description: '', images: []
  });

  const resetForm = () => {
    setFormData({
      title: '', price: '', location: '', type: 'House', status: 'For Sale', bedrooms: '', bathrooms: '', area: '', description: '', images: []
    });
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Limit to 8 images total
    const currentCount = formData.images?.length || 0;
    const remainingCount = 8 - currentCount;
    
    if (remainingCount <= 0) {
      alert('Maximum 8 images allowed per property.');
      return;
    }

    files.slice(0, remainingCount).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Compress image using canvas
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimension 1200px
          const maxDim = 1200;
          if (width > height) {
            if (width > maxDim) {
              height *= maxDim / width;
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width *= maxDim / height;
              height = maxDim;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Quality 0.7 to save space
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          
          setFormData(prev => ({ 
            ...prev, 
            images: [...(prev.images || []), compressedDataUrl] 
          }));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({ 
      ...prev, 
      images: prev.images.filter((_, i) => i !== index) 
    }));
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (property) => {
    setFormData(property);
    setEditingId(property.id);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      editProperty(editingId, formData);
    } else {
      addProperty(formData);
    }
    setIsModalOpen(false);
    resetForm();
  };

  if (currentUser?.role !== 'admin') {
    return (
      <div className="bg-bg-alt min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="card-premium p-12 text-center max-w-lg">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-text-main mb-4">Access Denied</h2>
          <p className="text-text-muted mb-8">You do not have permission to view this page. This area is restricted to administrators only.</p>
          <Link to="/" className="btn btn-primary px-8">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-alt min-h-screen pt-32 pb-24">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-text-main mb-2">Admin Dashboard</h1>
            <p className="text-text-muted">Manage your property listings</p>
          </div>
          <button onClick={handleOpenAdd} className="btn btn-primary gap-2">
            <Plus size={18} /> Add New Property
          </button>
        </div>

        {/* Properties Table */}
        <div className="card-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-alt border-b border-border-color text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold">Property</th>
                  <th className="p-4 font-bold">Type/Status</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="border-b border-border-color last:border-b-0 hover:bg-bg-alt/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img src={property.images?.[0] || property.image} alt={property.title} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <div className="font-bold text-text-main mb-1">{property.title}</div>
                          <div className="text-sm text-text-muted flex items-center gap-1">
                            <MapPin size={12} /> {property.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col items-start gap-1">
                        <span className="badge bg-primary-light text-primary">{property.type}</span>
                        <span className={`badge ${property.status === 'For Sale' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {property.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-extrabold text-text-main">
                      ${Number(property.price).toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenEdit(property)} className="w-8 h-8 rounded-lg bg-bg-alt border border-border-color flex items-center justify-center text-text-muted hover:text-primary transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => deleteProperty(property.id)} className="w-8 h-8 rounded-lg bg-bg-alt border border-border-color flex items-center justify-center text-text-muted hover:text-red-500 hover:border-red-200 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {properties.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-text-muted">
                      No properties found. Add one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-extrabold text-text-main mb-6">
                {editingId ? 'Edit Property' : 'Add New Property'}
              </h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Title</label>
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Price</label>
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full pl-9 pr-3 py-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Location</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full pl-9 pr-3 py-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-text-main">Property Images</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="property-image-upload"
                    />
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {formData.images?.map((img, index) => (
                        <div key={index} className="relative group/img rounded-xl overflow-hidden border border-border-color aspect-square bg-bg-alt">
                          <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              type="button" 
                              onClick={() => handleRemoveImage(index)} 
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          {index === 0 && (
                            <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">Main</span>
                          )}
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-border-color bg-bg-alt hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group/upload"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/upload:bg-primary/20 transition-colors">
                          <Upload size={16} className="text-primary" />
                        </div>
                        <span className="text-[10px] font-semibold text-text-muted group-hover/upload:text-primary transition-colors">Add Image</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Property Type</label>
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm">
                      <option>House</option>
                      <option>Apartment</option>
                      <option>Villa</option>
                      <option>Townhouse</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm">
                      <option>For Sale</option>
                      <option>For Rent</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Bedrooms</label>
                    <input required type="number" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} className="w-full p-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Bathrooms</label>
                    <input required type="number" step="0.5" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} className="w-full p-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main">Area (sqft)</label>
                    <input required type="number" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} className="w-full p-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-text-main">Description</label>
                  <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm resize-none"></textarea>
                </div>

                <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-border-color">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Property'}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
