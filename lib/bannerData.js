import { client } from "./client";

const bannerData = async () => {
  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);
//   console.log("banner", banner);

  return banner;
};

export default bannerData;
