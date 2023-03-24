import { client } from "./client";

const bannerData = async () => {
  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);
  return banner;
};

export default bannerData;
