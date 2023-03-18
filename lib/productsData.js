import { client } from "./client";

const productsData = async () => {
  const productQuery = '*[_type == "products"]';
  const products = await client.fetch(productQuery);
  return products;
};

export default productsData;
