import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Home as HomeIcon, Key, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';
import bannerImg from '../assets/bannerimage.png';

const Home = () => {
  const { properties, isLoading } = useProperties();
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);
  const navigate = useNavigate();
  const [heroLocation, setHeroLocation] = useState('');
  const [heroType, setHeroType] = useState('All');

  const handleHeroSearch = () => {
    const params = new URLSearchParams();
    if (heroLocation.trim()) params.set('search', heroLocation.trim());
    if (heroType !== 'All') params.set('type', heroType);
    navigate(`/properties?${params.toString()}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-[90vh]">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-light/40 to-bg-main"></div>
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4"></div>
        
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <div className="badge bg-primary-light text-primary mb-6">
              Premium Real Estate
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-text-main leading-tight mb-6">
              Find Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Dream Property
              </span>
            </h1>
            <p className="text-lg text-text-muted mb-10 max-w-lg leading-relaxed">
              Discover the most luxurious properties in the finest locations. We bring you a seamless experience to find a place you can call home.
            </p>

            {/* Search Box */}
            <div className="glass p-4 rounded-3xl flex flex-col md:flex-row items-center gap-4 w-full shadow-xl">
              <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-border-color">
                <MapPin className="text-primary" size={20} />
                <div className="flex flex-col w-full">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Location</span>
                  <input 
                    type="text" 
                    placeholder="Where do you want to live?" 
                    value={heroLocation}
                    onChange={(e) => setHeroLocation(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleHeroSearch()}
                    className="bg-transparent border-none outline-none font-semibold w-full text-sm placeholder:font-normal" 
                  />
                </div>
              </div>
              <div className="flex-1 w-full flex items-center gap-3 px-4 py-2">
                <HomeIcon className="text-primary" size={20} />
                <div className="flex flex-col w-full">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Property Type</span>
                  <select 
                    value={heroType}
                    onChange={(e) => setHeroType(e.target.value)}
                    className="bg-transparent border-none outline-none font-semibold w-full text-sm appearance-none cursor-pointer"
                  >
                    <option value="All">All Types</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Townhouse">Townhouse</option>
                  </select>
                </div>
              </div>
              <button onClick={handleHeroSearch} className="btn btn-primary h-14 w-full md:w-auto px-8 rounded-2xl md:rounded-xl shadow-lg">
                <Search size={20} />
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-text-main">2k+</span>
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Properties</span>
              </div>
              <div className="w-px h-12 bg-border-color"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-text-main">1.5k+</span>
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Happy Customers</span>
              </div>
              <div className="w-px h-12 bg-border-color hidden sm:block"></div>
              <div className="flex flex-col hidden sm:flex">
                <span className="text-3xl font-extrabold text-text-main">150+</span>
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Awards</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img src={bannerImg} alt="Luxury Home" className="w-full h-auto object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700" />
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute bottom-10 left-10 glass px-6 py-4 rounded-2xl flex items-center gap-4 shadow-xl"
              >
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-text-main m-0 text-sm">Verified Properties</h4>
                  <p className="text-xs text-text-muted m-0">100% Safe Transactions</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-bg-alt">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="badge bg-primary-light text-primary mb-4">Our Top Picks</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-text-main mb-4">Featured Properties</h2>
              <p className="text-text-muted text-lg">Explore our handpicked selection of premium properties offering the best in luxury, comfort, and design.</p>
            </div>
            <Link to="/properties" className="btn btn-outline whitespace-nowrap">
              View All Properties
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="loader"></div>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="badge bg-primary-light text-primary mb-4">Process</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-main mb-4">How It Works</h2>
            <p className="text-text-muted text-lg">Finding your dream home has never been easier. Follow our simple process to start your new journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border-color -z-10"></div>
            
            {[
              { icon: Search, title: 'Search Property', desc: 'Browse our extensive collection of premium properties.' },
              { icon: HomeIcon, title: 'Visit & Tour', desc: 'Schedule a visit and take a guided tour of the property.' },
              { icon: Key, title: 'Get the Keys', desc: 'Complete the paperwork and move into your new home.' }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="card-premium p-8 text-center relative group"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-text-main text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:bg-primary transition-colors">
                  {idx + 1}
                </div>
                <div className="w-20 h-20 bg-primary-light text-primary rounded-2xl flex items-center justify-center mx-auto mt-4 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-text-main">{step.title}</h3>
                <p className="text-text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
