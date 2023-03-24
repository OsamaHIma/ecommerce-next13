import { client } from "./client";

const bannerData = async () => {
  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);
  const bannerArray = banner.map((bannerItem) => {
    return { ...bannerItem, quantity: 1 };
  });
  return bannerArray;
};

export default bannerData;
