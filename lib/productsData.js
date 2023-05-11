import { client } from "./client";

const productsData = async () => {
  const productQuery = '*[_type == "products"]';
  const products = await client.fetch(productQuery);
  const productsArray = products.map((product) => {
    return { quantity: 1, ...product };
  });
  return productsArray;
};

export default productsData;
