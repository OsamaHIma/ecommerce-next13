"use client";
import { urlFor } from "@/lib/client";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from 'next/image'
const Product = ({ product: { name, image, slug, price } }) => {

  return (
    <Link href={`/products/${slug.current}`}>
      <div className="product-card">
      {image ? (
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
            alt="product image"
          />
        ) : (
          <Skeleton width={250} height={250} />
        )}
        <p className="image-name">{name || <Skeleton width={80}/>}</p>
        <p className="image-price">${price || <Skeleton width={50}/>}</p>
      </div>
    </Link>
  );
};
export default Product;
