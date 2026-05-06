import React, { createContext, useState, useContext, useEffect } from 'react';
import { dummyProperties } from '../data/dummyData';

const PropertyContext = createContext();

export const useProperties = () => {
  return useContext(PropertyContext);
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(() => {
    const savedProps = localStorage.getItem('properties');
    if (savedProps) {
      try {
        const parsedProps = JSON.parse(savedProps);
        
        if (!Array.isArray(parsedProps)) return dummyProperties;

        // Custom properties added by admin (not in dummy list)
        const customProps = parsedProps.filter(p => p && !dummyProperties.some(dp => dp.id === p.id));
        
        // Dummy properties (restored if deleted, or keeping edits if edited)
        const modifiedDummyProps = dummyProperties.map(dp => {
          const saved = parsedProps.find(p => p && p.id === dp.id);
          return saved ? saved : dp;
        });

        return [...customProps, ...modifiedDummyProps];
      } catch (error) {
        console.error('Error loading properties from storage:', error);
        return dummyProperties;
      }
    }
    return dummyProperties;
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('properties', JSON.stringify(properties));
    } catch (error) {
      console.error('Failed to save properties to localStorage:', error);
      if (error.name === 'QuotaExceededError') {
        alert('Storage limit reached! You may have uploaded too many high-resolution images. Try removing some images or using smaller files.');
      }
    }
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Admin Actions
  const addProperty = (newProperty) => {
    const id = Date.now().toString();
    setProperties([{ ...newProperty, id }, ...properties]);
  };

  const editProperty = (id, updatedData) => {
    setProperties(properties.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id));
    // Also remove from wishlist if deleted
    setWishlist(wishlist.filter(wId => wId !== id));
  };

  // User Actions
  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(wId => wId !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const value = {
    properties,
    wishlist,
    isLoading,
    addProperty,
    editProperty,
    deleteProperty,
    toggleWishlist
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};
