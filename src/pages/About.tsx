
import Layout from "../components/layout/Layout";
import { Building2, Users, Award, Factory } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero section */}
      <div className="bg-primary text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">About Saint Woven Saver</h1>
            <p className="text-lg md:text-xl text-white/80">
              Leading manufacturer of high-performance construction chemical solutions, committed to quality and innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Company overview section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Company</h2>
              <p className="text-muted-foreground mb-4">
                Saint Woven Saver is a premier manufacturer of construction chemicals, dedicated to providing innovative solutions for the building and construction industry. With our state-of-the-art manufacturing facilities and research laboratories, we develop products that meet the highest standards of quality and performance.
              </p>
              <p className="text-muted-foreground mb-4">
                Founded in 2015, we have rapidly grown to become a trusted partner for construction professionals across the Middle East and beyond. Our comprehensive range of products addresses various construction needs, from concrete admixtures to waterproofing systems and beyond.
              </p>
              <p className="text-muted-foreground">
                We believe in sustainable development and continuously invest in research to develop environmentally friendly products without compromising on performance.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-muted rounded-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" 
                alt="Saint Woven Saver Headquarters" 
                className="rounded-lg shadow-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key features section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Strengths</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Factory size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">State-of-the-Art Facilities</h3>
              <p className="text-muted-foreground">
                Advanced manufacturing plants equipped with the latest technology to ensure product consistency and quality.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
              <p className="text-muted-foreground">
                Highly qualified professionals with extensive experience in construction chemistry and engineering.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Standards</h3>
              <p className="text-muted-foreground">
                All products comply with international standards and undergo rigorous quality control testing.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Building2 size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Presence</h3>
              <p className="text-muted-foreground">
                Our products are trusted by construction professionals across multiple countries and continents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Journey</h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <span className="inline-block px-4 py-2 bg-primary text-white font-semibold rounded-md">2015</span>
              </div>
              <div className="md:w-3/4 md:pl-8">
                <h3 className="text-xl font-semibold mb-2">Company Founded</h3>
                <p className="text-muted-foreground">
                  Saint Woven Saver was established with a vision to provide high-quality construction chemicals to the Middle Eastern market.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <span className="inline-block px-4 py-2 bg-primary text-white font-semibold rounded-md">2017</span>
              </div>
              <div className="md:w-3/4 md:pl-8">
                <h3 className="text-xl font-semibold mb-2">Product Line Expansion</h3>
                <p className="text-muted-foreground">
                  Introduced comprehensive range of waterproofing systems and concrete admixtures to meet growing market demands.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <span className="inline-block px-4 py-2 bg-primary text-white font-semibold rounded-md">2020</span>
              </div>
              <div className="md:w-3/4 md:pl-8">
                <h3 className="text-xl font-semibold mb-2">International Expansion</h3>
                <p className="text-muted-foreground">
                  Started exporting products to neighboring countries, establishing a strong presence in the regional construction market.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <span className="inline-block px-4 py-2 bg-primary text-white font-semibold rounded-md">2023</span>
              </div>
              <div className="md:w-3/4 md:pl-8">
                <h3 className="text-xl font-semibold mb-2">Research & Innovation Center</h3>
                <p className="text-muted-foreground">
                  Opened a state-of-the-art R&D facility to develop next-generation construction chemical solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
