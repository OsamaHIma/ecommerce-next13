import { client } from "./client";

const productSlug = async (slug) => {
  const productQuery = `*[_type == "product"slug && slug.current == '${slug}'][0]`;
  const product = await client.fetch(productQuery);

  return product;
};

export default productSlug;
