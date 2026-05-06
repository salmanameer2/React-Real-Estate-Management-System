import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-bg-alt min-h-screen pt-32 pb-24">
      <div className="container max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge bg-primary-light text-primary mb-4">Contact Us</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-main mb-6">
            Get In Touch
          </h1>
          <p className="text-lg text-text-muted">
            Have questions about a property or want to sell your home? Our team of experts is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {[
              { icon: MapPin, title: 'Office Address', detail: '123 Luxury Avenue, Beverly Hills, CA 90210' },
              { icon: Phone, title: 'Phone Number', detail: '+1 (800) 123-4567\n+1 (800) 987-6543' },
              { icon: Mail, title: 'Email Address', detail: 'info@realestate.com\nsupport@realestate.com' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-premium p-8 flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center shrink-0 mt-1">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-text-main mb-2 text-lg">{item.title}</h3>
                  <p className="text-text-muted whitespace-pre-line">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 card-premium p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-text-main mb-8">Send Us A Message</h2>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main">First Name</label>
                  <input type="text" placeholder="John" className="w-full p-4 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full p-4 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full p-4 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main">Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full p-4 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main">Message</label>
                <textarea rows="5" placeholder="How can we help you?" className="w-full p-4 rounded-xl border border-border-color bg-bg-alt outline-none focus:border-primary text-sm transition-colors resize-none"></textarea>
              </div>
              <button type="submit" className="btn btn-primary py-4 text-base gap-2 mt-4">
                <Send size={18} /> Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
