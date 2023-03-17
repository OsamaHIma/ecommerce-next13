"use client";
import { Product } from "@/components";
import { urlFor, client } from "@/lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { useState, useEffect, use } from "react";
import productSlug from "@/lib/productSlug";
import productsData from "@/lib/productsData";

const ProductDetails = ({ params: { slug } }) => {
  console.log(slug);
  // const [product, setProduct] = useState({});
  // const [products, setProducts] = useState([]);
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);

  //   const productSlug = async () => {
  //     const query = `*[_type == "product"] {
  //       slug {
  //         current
  //       }
  //     }
  //     `;

  //     const products = await client.fetch(query);

  //     const paths = products.map((product) => ({
  //       slug: product.slug.current,
  //     }));

  //     const productQuery = `*[_type == "product"slug && slug.current == '${slug}'][0]`;
  //     const productData = await client.fetch(productQuery);
  //     console.log("product", productData);
  //     setProduct(productData);
  //   };

  //   const productsData = async () => {
  //     const productQuery = '*[_type == "product"]';
  //     const productsData = await client.fetch(productQuery);
  //     setProducts(productsData);
  //   };

  //   console.log(product, products);
  //   setLoading(false);
  // }, []);

  // if (isLoading) return <p>Loading...</p>;
  // const product = use(productSlug(slug))
  const products = use(productsData())
  // const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);
  return (
    <article>
      {/* <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[0])}
              alt=""
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                // key={index}
                src={urlFor(item)}
                alt=""
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="products-details-desc">
          <h1>{name}</h1>
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
          <p>{details}</p>
          <p className="price">${price}</p>
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
      </div> */}
      <div className="maylike-products-wrapper">
        <h2>You may also Like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetails;
