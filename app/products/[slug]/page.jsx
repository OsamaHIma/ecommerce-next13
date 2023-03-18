"use client";
import { Product } from "@/components";
import { urlFor, client } from "@/lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetails = ({ params: { slug } }) => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productSlug = async () => {
      const productQuery = `*[_type == "products" && slug.current == '${slug}'][0]`;
      const productData = await client.fetch(productQuery);
      setProduct(productData);
    };
    productSlug();

    const productsData = async () => {
      const productQuery = '*[_type == "products"]';
      const productsData = await client.fetch(productQuery);
      setProducts(productsData);
    };
    productsData();

  }, []);

  const { image, name, details, price } = product;
  console.log("prod", product);

  const [index, setIndex] = useState(0);
  return (
    <>

      <article>
        <div className="product-detail-container">
          <div>
            <div className="image-container">
              {image ? (
                <img
                  src={urlFor(image[index])}
                  alt="main product image"
                  className="product-detail-image"
                />
              ) : (
                <Skeleton width={400} height={400} borderRadius={13} />
              )}
            </div>
            <div className="small-images-container">
              {image?.map((item, i) => (
                <img
                  key={i}
                  src={urlFor(item)}
                  alt="product images"
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={() => setIndex(i)}
                />
              )) || <Skeleton width={400} height={100} borderRadius={5} />}
            </div>
          </div>

          <div className="product-detail-desc">
            <h1>{name || <Skeleton width={80} />}</h1>
            <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>(20)</p>
            </div>
            <h4>Details:</h4>
            <p>{details || <Skeleton width={90} />}</p>
            <p className="price">${price || <Skeleton width={50} />}</p>
            <div className="quantity">
              <h3>Quantity:</h3>
              <p className="quantity-desc">
                <span className="minus" onClick="">
                  <AiOutlineMinus />
                </span>
                <span className="num" onClick="">
                  0
                </span>
                <span className="plus" onClick="">
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
            <div className="buttons">
              <button className="add-to-cart">Add to cart</button>
              <button className="buy-now">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="maylike-products-wrapper">
          <h2>You may also Like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products?.map((item) => (
                <Product key={item._id} product={item} />
              )) || <Skeleton height={100} />}
            </div>
          </div>
        </div>
      </article>

    </>
  );
};

export default ProductDetails;
