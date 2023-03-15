"use client";
import { urlFor } from "@/lib/client";
import Link from "next/link";

const Product = ({ product: { name, image, slug, price } }) => {

  return (
    <Link href={`/products/${slug.current}`}>
      <div className="product-card">
        <img
          src={urlFor(image && image[0])}
          width={250}
          height={250}
          className="product-image"
        />
        <p className="image-name">{name}</p>
        <p className="image-price">${price}</p>
      </div>
    </Link>
  );
};
export default Product;
