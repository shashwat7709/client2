
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ContactCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Construction Projects?</h2>
            <p className="text-white/80 text-lg mb-8">
              Our team of experts is ready to help you select the right products for your specific requirements. Contact us for personalized solutions and technical support.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-secondary" />
                <span>+971 4 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-secondary" />
                <span>info@saintwovensaver.com</span>
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Get In Touch
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-6">Request Information</h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50 text-white placeholder:text-white/50"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50 text-white placeholder:text-white/50"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  id="company"
                  className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50 text-white placeholder:text-white/50"
                  placeholder="Your Company"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-white/20 border border-white/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50 text-white placeholder:text-white/50"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
