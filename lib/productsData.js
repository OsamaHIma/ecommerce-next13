import { client } from "./client";

const productsData = async () => {
  const productQuery = '*[_type == "products"]';
  const products = await client.fetch(productQuery);
  const productsArray = products.map((product) => {
    return { ...product, quantity: 1 };
  });
  return productsArray;
};

export default productsData;
