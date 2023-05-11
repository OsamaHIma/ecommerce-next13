"use client";
import { urlFor } from "@/lib/client";
import Link from "next/link";

const HeroBanner = ({ heroBanner }) => {
  // const all = { ...heroBanner };
  const { smallText, midText, largeText1, image, product, buttonText, desc } =
  heroBanner;
  return (
    <div className="hero-banner-container dark:!bg-slate-500">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img
          src={urlFor(image)}
          alt="headphones"
          className="hero-banner-image"
        />
      </div>
      <div>
        <Link href={`/products/${product}`}>
          <button type="button">{buttonText}</button>
        </Link>
        <div className="desc">
          <h5 className="dark:!text-slate-300">Description</h5>
          <p className="dark:!text-gray-300">{desc}</p>
        </div>
      </div>
    </div>
  );
};
export default HeroBanner;
