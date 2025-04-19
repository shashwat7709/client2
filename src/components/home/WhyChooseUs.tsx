
import { Shield, Check, Lightbulb, HeartHandshake, Clock, Award } from "lucide-react";

const features = [
  {
    title: "Quality Assurance",
    description: "All our products meet stringent international standards and undergo rigorous quality control",
    icon: Shield,
  },
  {
    title: "Technical Expertise",
    description: "Our team of technical experts provides guidance throughout your project lifecycle",
    icon: Lightbulb,
  },
  {
    title: "Customer Support",
    description: "Dedicated customer service team ensures prompt response to all your requirements",
    icon: HeartHandshake,
  },
  {
    title: "Timely Delivery",
    description: "Reliable supply chain ensures timely delivery, minimizing project delays",
    icon: Clock,
  },
  {
    title: "Proven Performance",
    description: "Products tested in demanding conditions across diverse construction projects",
    icon: Check,
  },
  {
    title: "Industry Recognition",
    description: "Trusted by leading construction companies and engineers worldwide",
    icon: Award,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Saint Woven Saver</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We pride ourselves on delivering construction chemicals that exceed expectations through quality, innovation, and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {features.map((feature, index) => (
            <div key={index} className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary">
                  <feature.icon size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
