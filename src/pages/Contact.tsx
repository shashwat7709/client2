
import Layout from "../components/layout/Layout";
import { Mail, Phone, MapPin, Clock, Building, Send } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      {/* Hero section */}
      <div className="bg-primary text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl text-white/80">
              Get in touch with our team for inquiries, technical support, or to request a consultation.
            </p>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your Company"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your Phone Number"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <select
                    id="subject"
                    className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="career">Career Information</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    <Send size={18} className="mr-2" />
                    Submit Message
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-lg">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 flex-shrink-0">
                      <Building size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Headquarters</h3>
                      <p className="text-muted-foreground">
                        Saint Woven Saver Industries LLC
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        Industrial Zone 3, Building A12<br />
                        P.O. Box 12345<br />
                        Dubai, United Arab Emirates
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">
                        Main: +971 4 123 4567<br />
                        Technical Support: +971 4 123 4568<br />
                        Sales: +971 4 123 4569
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        General Inquiries: info@saintwovensaver.com<br />
                        Technical Support: support@saintwovensaver.com<br />
                        Sales: sales@saintwovensaver.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 flex-shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 1:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social media links */}
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-primary/10 hover:bg-primary/20 text-primary rounded-full flex items-center justify-center transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary/10 hover:bg-primary/20 text-primary rounded-full flex items-center justify-center transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary/10 hover:bg-primary/20 text-primary rounded-full flex items-center justify-center transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary/10 hover:bg-primary/20 text-primary rounded-full flex items-center justify-center transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Location</h2>
          <div className="aspect-w-16 aspect-h-9 md:aspect-h-7 lg:aspect-h-5">
            {/* Placeholder for map - in a real implementation, this would be a Google Map or similar */}
            <div className="w-full h-96 bg-white border border-border rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Interactive map would be displayed here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
