import React from "react";
import Layout from "../components/layout/Layout";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";
import HomeNews from "../module/home/HomeNews";
type Props = {};

const HomePage = (props: Props) => {
  return (
    <Layout>
      <HomeBanner />
      <HomeFeature />
      <HomeNews />
    </Layout>
  );
};

export default HomePage;
