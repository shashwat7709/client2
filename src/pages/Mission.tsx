import Layout from "../components/layout/Layout";
import { Target, Lightbulb, Heart, Leaf, Award } from "lucide-react";
import { useEffect, useState } from "react";

const defaultMission = `To provide innovative, high-quality construction chemical solutions that enhance the durability, efficiency, and sustainability of buildings and infrastructure.\n\nWe are committed to delivering products that meet the highest standards of performance while providing exceptional technical support to our clients.`;
const defaultVision = `To be recognized globally as a leader in innovative construction chemical solutions, setting new standards for performance, reliability, and sustainability.\n\nWe aspire to contribute significantly to the advancement of construction technology, improving building practices worldwide.`;

const Mission = () => {
  const [missionText, setMissionText] = useState(defaultMission);
  const [visionText, setVisionText] = useState(defaultVision);

  useEffect(() => {
    const savedMission = localStorage.getItem('mission_text');
    const savedVision = localStorage.getItem('vision_text');
    if (savedMission && savedMission.trim().length > 0) setMissionText(savedMission);
    if (savedVision && savedVision.trim().length > 0) setVisionText(savedVision);
  }, []);

  return (
    <Layout>
      {/* Hero section */}
      <div className="bg-primary text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Our Mission & Vision</h1>
            <p className="text-lg md:text-xl text-white/80">
              Driven by purpose and guided by a clear vision to transform the construction industry with innovative chemical solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-primary to-primary/90 text-white p-8 md:p-12 rounded-lg shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
              {missionText.split('\n').map((para, idx) => (
                <p key={idx} className="text-lg text-white/80 mb-4">{para}</p>
              ))}
            </div>
            
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg border border-muted">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Lightbulb size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Vision</h2>
              {visionText.split('\n').map((para, idx) => (
                <p key={idx} className="text-lg text-muted-foreground mb-4">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">
              These principles guide our actions, decisions, and relationships with customers, partners, and employees.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Award size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in everything we do, from product development to customer service.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Lightbulb size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously invest in research and development to create cutting-edge solutions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Heart size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Integrity</h3>
              <p className="text-muted-foreground">
                We conduct business with honesty, transparency, and adherence to the highest ethical standards.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Leaf size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Sustainability</h3>
              <p className="text-muted-foreground">
                We are committed to developing products that minimize environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic goals section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Strategic Goals</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-muted">
              <h3 className="text-xl font-semibold mb-3">Market Leadership</h3>
              <p className="text-muted-foreground">
                Establish Saint Woven Saver as the preferred supplier of construction chemicals in our target markets through product excellence and customer service.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-muted">
              <h3 className="text-xl font-semibold mb-3">Innovation Pipeline</h3>
              <p className="text-muted-foreground">
                Develop and introduce at least five new product innovations annually that address emerging construction challenges and requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-muted">
              <h3 className="text-xl font-semibold mb-3">Global Expansion</h3>
              <p className="text-muted-foreground">
                Extend our reach to new international markets, establishing presence in at least ten countries by 2026.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-muted">
              <h3 className="text-xl font-semibold mb-3">Sustainability Leadership</h3>
              <p className="text-muted-foreground">
                Lead the industry in developing and promoting environmentally sustainable construction chemical solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Mission;
