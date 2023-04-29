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
import { useStateContext } from "@/app/context/stateContext";
import { Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/swiper.css";

const ProductDetails = ({ params: { slug } }) => {
  const sliderSittings = {
    slidesPerView: 1,
    spaceBetween: 50,
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2,
      },
      750: {
        slidesPerView: 3,
      },
      1100: {
        slidesPerView: 4,
      },
    },
  };

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
  }, [slug]);

  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  const { incQty, decQty, onAdd, setShowCart, qty } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <>
      <Toaster />
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
                <Skeleton
                  className="product-detail-skeleton"
                  borderRadius={13}
                />
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
              )) || <Skeleton width={310} height={70} borderRadius={5} />}
            </div>
          </div>

          <div className="product-detail-desc">
            <h1>{name || <Skeleton width={130} />}</h1>
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
            <p>{details || <Skeleton width={300} height={20} />}</p>
            <p className="price">${price || <Skeleton width={50} />}</p>
            <div className="quantity">
              <h3>Quantity:</h3>
              <p className="quantity-desc">
                <span className="minus" onClick={decQty}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
            <div className="buttons">
              <button
                className="add-to-cart"
                onClick={() => onAdd(product, qty)}
              >
                Add to cart
              </button>
              <button className="buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="maylike-products-wrapper">
          <h2>You may also Like</h2>
          <p>Swipe left for more</p>
          <Swiper {...sliderSittings}>
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <Product key={item._id} product={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </article>
    </>
  );
};

export default ProductDetails;
