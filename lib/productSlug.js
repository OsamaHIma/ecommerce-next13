import { client } from "./client";

const productSlug = async (slug) => {
  const productQuery = `*[_type == "product"slug && slug.current == '${slug}'][0]`;
  const product = await client.fetch(productQuery);
  // if (!product.ok) {
  //     // This will activate the closest `error.js` Error Boundary
  //     throw new Error('Failed to fetch products');
  // }
  console.log("product", product);

  return product;
};

export default productSlug;
