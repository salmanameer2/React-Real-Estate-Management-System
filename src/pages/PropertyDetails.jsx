import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Check, ArrowLeft, Heart, Share2, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';

const PropertyDetails = () => {
  const { id } = useParams();
  const { properties, toggleWishlist, wishlist } = useProperties();
  const { currentUser } = useAuth();

  const property = properties.find(p => p.id === id);
  const isWishlisted = wishlist.includes(id);
  const [activeImage, setActiveImage] = useState(0);

  const images = property?.images || [property?.image];

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <Link to="/properties" className="btn btn-primary">Back to Properties</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-alt min-h-screen pt-32 pb-24">
      <div className="container max-w-6xl">

        {/* Back navigation */}
        <Link to="/properties" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 font-semibold">
          <ArrowLeft size={20} /> Back to Listings
        </Link>

        {/* Header & Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`badge ${property.status === 'For Sale' ? 'bg-primary text-white' : 'bg-blue-600 text-white'}`}>
                {property.status}
              </span>
              <span className="badge bg-white border border-border-color text-text-main">
                {property.type}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-main mb-2">{property.title}</h1>
            <div className="flex items-center gap-2 text-text-muted">
              <MapPin size={18} className="text-primary" />
              <span>{property.location}</span>
            </div>
          </div>

          <div className="text-left md:text-right">
            <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
              ${property.price.toLocaleString()}
              {property.status === 'For Rent' && <span className="text-xl text-text-muted font-normal">/mo</span>}
            </div>
            <div className="flex gap-3 justify-start md:justify-end">
              <button
                onClick={() => toggleWishlist(property.id)}
                className="w-12 h-12 rounded-xl bg-white border border-border-color flex items-center justify-center text-text-muted hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
              >
                <Heart size={22} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
              </button>
              <button className="w-12 h-12 rounded-xl bg-white border border-border-color flex items-center justify-center text-text-muted hover:text-primary hover:border-primary-light transition-all shadow-sm">
                <Share2 size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="flex flex-col gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-4xl overflow-hidden shadow-xl h-[40vh] md:h-[60vh] relative group bg-black"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={images[activeImage]}
                alt={property.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => setActiveImage(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </motion.div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-24 md:w-32 aspect-4/3 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${activeImage === index ? 'border-primary shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Details */}
          <div className={`${currentUser?.role === 'admin' ? 'lg:col-span-3' : 'lg:col-span-2'} flex flex-col gap-12`}>

            {/* Overview */}
            <div className="card-premium p-8">
              <h3 className="text-xl font-bold text-text-main mb-6">Overview</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-text-muted">
                    <Bed size={20} className="text-primary" />
                    <span className="font-semibold text-sm uppercase tracking-wider">Bedrooms</span>
                  </div>
                  <span className="text-xl font-extrabold">{property.bedrooms}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-text-muted">
                    <Bath size={20} className="text-primary" />
                    <span className="font-semibold text-sm uppercase tracking-wider">Bathrooms</span>
                  </div>
                  <span className="text-xl font-extrabold">{property.bathrooms}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-text-muted">
                    <Square size={20} className="text-primary" />
                    <span className="font-semibold text-sm uppercase tracking-wider">Area</span>
                  </div>
                  <span className="text-xl font-extrabold">{property.area} sqft</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card-premium p-8">
              <h3 className="text-xl font-bold text-text-main mb-4">Description</h3>
              <p className="text-text-muted leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="card-premium p-8">
              <h3 className="text-xl font-bold text-text-main mb-6">Features & Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-text-main font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          {currentUser?.role !== 'admin' && (
            <div className="lg:col-span-1">
              <div className="card-premium p-8 sticky top-32">
                <h3 className="text-xl font-bold text-text-main mb-6">Contact Agent</h3>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-border-color overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Agent+Smith&background=0d9488&color=fff" alt="Agent" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main text-lg">Jane Smith</h4>
                    <p className="text-text-muted text-sm">Senior Property Agent</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                  <a href="#" className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-bg-alt flex items-center justify-center text-primary shrink-0">
                      <Phone size={18} />
                    </div>
                    <span className="font-semibold">+1 (555) 123-4567</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-bg-alt flex items-center justify-center text-primary shrink-0">
                      <Mail size={18} />
                    </div>
                    <span className="font-semibold">jane.smith@realestate.com</span>
                  </a>
                </div>

                <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
                  <input type="text" placeholder="Your Name" className="w-full p-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm" />
                  <input type="email" placeholder="Your Email" className="w-full p-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm" />
                  <input type="tel" placeholder="Your Phone" className="w-full p-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm" />
                  <textarea placeholder="Message" rows="4" className="w-full p-3 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm resize-none"></textarea>
                  <button className="btn btn-primary w-full py-4 mt-2">Send Message</button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
