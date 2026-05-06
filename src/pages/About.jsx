import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, TrendingUp } from 'lucide-react';
import bannerImg from '../assets/bannerimage.png';

const About = () => {
  return (
    <div className="bg-bg-alt min-h-screen pt-32 pb-24">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="badge bg-primary-light text-primary mb-4">About Us</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-main mb-6">
            Redefining the <span className="text-primary">Real Estate</span> Experience
          </h1>
          <p className="text-lg text-text-muted">
            We are a premium real estate agency dedicated to helping our clients find their dream homes with unparalleled service, transparency, and expertise.
          </p>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <img src={bannerImg} alt="Luxury Real Estate" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl font-extrabold text-text-main">Our Mission</h2>
            <p className="text-text-muted leading-relaxed">
              To provide a seamless, luxurious, and highly personalized real estate experience. We believe that finding a home is more than just a transaction; it's the beginning of a new chapter. Our team of experts is committed to guiding you every step of the way.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              {[
                'Premium exclusive listings',
                'Expert market analysis',
                'Personalized concierge service',
                'Transparent and secure transactions'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  <span className="font-semibold text-text-main">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {[
            { icon: Users, stat: '10k+', label: 'Happy Clients' },
            { icon: Award, stat: '150+', label: 'Awards Won' },
            { icon: TrendingUp, stat: '5B+', label: 'Property Sales' },
            { icon: CheckCircle, stat: '20+', label: 'Years Experience' },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-premium p-8 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-primary-light text-primary rounded-2xl flex items-center justify-center mb-4">
                <item.icon size={28} />
              </div>
              <h3 className="text-3xl font-extrabold text-text-main mb-2">{item.stat}</h3>
              <p className="text-sm font-bold text-text-muted uppercase tracking-wider">{item.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;
