
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Saint Woven Saver</h3>
            <p className="text-primary-foreground/80 mb-4">
              Leading manufacturer of high-performance construction chemical solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/mission" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Mission & Vision
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Product Range</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products#admixtures" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Admixtures
                </Link>
              </li>
              <li>
                <Link to="/products#bonding-agents" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Bonding Agents
                </Link>
              </li>
              <li>
                <Link to="/products#dry-mix" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Dry Mix Products
                </Link>
              </li>
              <li>
                <Link to="/products#joint-sealants" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Joint Sealants
                </Link>
              </li>
              <li>
                <Link to="/products#waterproofing" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Waterproofing Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-6 w-6 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  Saint Woven Saver, Industrial Zone, Dubai, UAE
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-6 w-6 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80">+971 4 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-6 w-6 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80">info@saintwovensaver.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Saint Woven Saver. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
