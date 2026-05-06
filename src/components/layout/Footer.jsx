import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Globe, MessageCircle, Camera, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border-color pt-20 pb-8 mt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold shadow-md">
                <Home size={18} />
              </div>
              <span className="text-xl font-extrabold text-text-main">
                Real<span className="text-primary">Estate</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-8">
              Premium real estate services offering the best properties in prime locations. We help you find your dream home with a seamless and luxurious experience.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, Camera, Share2].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-bg-alt flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-extrabold mb-6 text-text-main">Quick Links</h4>
            <div className="flex flex-col gap-4">
              {['Home', 'About Us', 'Properties', 'Agents', 'Contact'].map((link) => (
                <Link key={link} to="#" className="text-text-muted text-sm hover:text-primary transition-colors hover:translate-x-1 duration-300 inline-block w-fit">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-extrabold mb-6 text-text-main">Contact Info</h4>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3 text-text-muted text-sm">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>123 Luxury Avenue, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center gap-3 text-text-muted text-sm">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-text-muted text-sm">
                <Mail size={18} className="text-primary shrink-0" />
                <span>info@realestate.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-extrabold mb-6 text-text-main">Newsletter</h4>
            <p className="text-text-muted text-sm mb-6">
              Subscribe to our newsletter to get the latest updates on premium properties.
            </p>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full py-3 pl-4 pr-32 rounded-xl bg-bg-alt border border-border-color outline-none text-sm focus:border-primary transition-colors"
              />
              <button className="btn btn-primary absolute right-1 py-2 px-4 text-xs h-[calc(100%-8px)] rounded-lg">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-color pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} RealEstate Premium. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
