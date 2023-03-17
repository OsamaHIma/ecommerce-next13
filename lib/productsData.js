import { client } from "./client";

const productsData = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);
  // if (!products.ok) {
  //     // This will activate the closest `error.js` Error Boundary
  //     throw new Error('Failed to fetch products');
  // }
//   console.log("products", products, typeof products === "object");
console.log(products);
  return products;
};

export default productsData;
