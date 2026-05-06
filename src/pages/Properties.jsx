import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';
import { Filter, Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Properties = () => {
  const { properties, isLoading } = useProperties();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filterType, setFilterType] = useState(searchParams.get('type') || 'All');
  const [filterStatus, setFilterStatus] = useState(searchParams.get('status') || 'All');

  // Sync filters when URL params change (e.g. navigating from Home search)
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setFilterType(searchParams.get('type') || 'All');
    setFilterStatus(searchParams.get('status') || 'All');
  }, [searchParams]);

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || p.type === filterType;
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="bg-bg-alt min-h-screen pt-32 pb-24">
      <div className="container">

        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-text-main mb-4">Properties</h1>
          <p className="text-text-muted">Browse our collection of premium properties and find your perfect match.</p>
        </div>

        {/* Filters and Search */}
        <div className="glass p-6 rounded-3xl mb-12 flex flex-col lg:flex-row gap-6 items-center shadow-sm">
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border-color bg-white outline-none focus:border-primary transition-colors text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-white border border-border-color rounded-xl px-4 py-3 w-full sm:w-auto">
              <Filter size={18} className="text-primary" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-semibold text-text-main w-full sm:w-32 cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Townhouse">Townhouse</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white border border-border-color rounded-xl px-4 py-3 w-full sm:w-auto">
              <Filter size={18} className="text-primary" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-semibold text-text-main w-full sm:w-32 cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="loader"></div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-border-color">
            <h3 className="text-2xl font-bold text-text-main mb-2">No properties found</h3>
            <p className="text-text-muted">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearchTerm(''); setFilterType('All'); setFilterStatus('All'); }}
              className="btn btn-outline mt-6"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Properties;
