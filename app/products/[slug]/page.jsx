"use client";
import { Product } from "@/components";
import { urlFor, client } from "@/lib/client";
import {
  AiOutlineRightCircle,
  AiFillStar,
  AiOutlineStar,
  AiOutlineLeftCircle,
} from "react-icons/ai";
import { useState, useEffect, useRef } from "react";

// Swiper
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/swiper.css";

import { useDispatch } from "react-redux";
import {
  addItemToCart,
  openCart,
  updateCartItems,
} from "@/store/features/cartSlice";

// Skeleton
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetails = ({ params: { slug } }) => {
  const dispatch = useDispatch();
  const handleOpenCart = () => {
    dispatch(openCart());
  };
  const swiperRef = useRef();
  const sliderSittings = {
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".right-swi",
      prevEl: ".swiper-button-prev",
    },
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

  const SwiperButtons = () => {
    const swiper = useSwiper();

    return (
      <div className="mt-5 flex items-center">
        <div className="mx-auto flex items-center gap-5">
          <AiOutlineLeftCircle
            className="text-slate-500 dark:text-slate-100 cursor-pointer"
            size={37}
            onClick={() => swiper.slidePrev()}
          />
          <AiOutlineRightCircle
            className="text-slate-500 dark:text-slate-100 cursor-pointer"
            size={37}
            onClick={() => swiper.slideNext()}
          />
        </div>
      </div>
    );
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

  // const { incQty, decQty, onAdd, setShowCart, qty } = useStateContext();

  const addProductToCart = () => {
    dispatch(addItemToCart(product));
    dispatch(updateCartItems());
  };

  const handleBuyNow = () => {
    addProductToCart(product);
    handleOpenCart();
  };
  console.log(product);
  return (
    <>
      <article>
        <div className="product-detail-container dark:text-slate-50">
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
                  baseColor="#888"
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
              )) || <Skeleton width={310} height={70} borderRadius={5} baseColor="#888" />}
            </div>
          </div>

          <div className="product-detail-desc">
            <h1>{name || <Skeleton width={130} baseColor="#888" />}</h1>
            <div className="reviews">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <p className="dark:!text-red-700">(20)</p>
            </div>
            <h4>Details:</h4>
            <p>{details || <Skeleton width={300} height={20} baseColor="#888" />}</p>
            <p className="price">${price || <Skeleton width={50} baseColor="#888" />}</p>
            <div className="buttons">
              <button
                className="add-to-cart"
                onClick={() => addProductToCart(product)}
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
          <h2 className="dark:text-gray-50">You may also Like</h2>
          {/* <p className="dark:text-gray-300">Swipe left for more</p> */}
          <Swiper ref={swiperRef} {...sliderSittings}>
            <SwiperButtons />
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
