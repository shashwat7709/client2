
import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import ProductCategories from "../components/home/ProductCategories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import FeaturedProjects from "../components/home/FeaturedProjects";
import ContactCTA from "../components/home/ContactCTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <ProductCategories />
      <WhyChooseUs />
      <FeaturedProjects />
      <ContactCTA />
    </Layout>
  );
};

export default Index;
