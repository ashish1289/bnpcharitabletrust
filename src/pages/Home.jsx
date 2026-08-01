import React from "react";
import Layout from "../layout/Layout";
import Hero from "../sections/Hero";
import ScholarshipPromoSection from "../sections/ScholarshipPromoSection";
import Programs from "../sections/Programs";
import Mission from "../sections/Mission";
// import Impact from "../components/Impact";

const Home = () => {
  return (
    <Layout >
      <Hero />
      <ScholarshipPromoSection />
      <Programs />
      {/* <Impact/> */}
      <Mission />
    </Layout>
  );
};

export default Home;
