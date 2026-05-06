import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProperties } from '../../context/PropertyContext';

const PropertyCard = ({ property, index }) => {
  const { toggleWishlist, wishlist } = useProperties();
  const isWishlisted = wishlist.includes(property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-premium overflow-hidden group flex flex-col h-full relative"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.images?.[0] || property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`badge ${property.status === 'For Sale' ? 'bg-primary text-white' : 'bg-blue-600 text-white'}`}>
            {property.status}
          </span>
          {property.featured && (
            <span className="badge bg-yellow-400 text-yellow-900">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(property.id);
          }}
          className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow-sm z-10"
        >
          <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-text-muted text-sm mb-3">
          <MapPin size={16} className="text-primary" />
          <span className="truncate">{property.location}</span>
        </div>
        
        <Link to={`/properties/${property.id}`} className="inline-block mb-2">
          <h3 className="text-xl font-bold text-text-main line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
        </Link>
        
        <div className="text-2xl font-extrabold text-primary mb-6">
          ${property.price.toLocaleString()}
          {property.status === 'For Rent' && <span className="text-sm text-text-muted font-normal">/mo</span>}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-border-color mt-auto">
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <Bed size={18} className="text-primary/70" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <Bath size={18} className="text-primary/70" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <Square size={18} className="text-primary/70" />
            <span>{property.area} sqft</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <Link 
            to={`/properties/${property.id}`} 
            className="btn btn-primary w-full text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
