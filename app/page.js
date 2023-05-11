import { HeroBanner, FooterBanner, Product } from "@/components";
import productsData from "@/lib/productsData";
import bannerData from "@/lib/bannerData";

const Home = async () => {
  // Initiate both requests in parallel
  const getProducts = productsData();
  const getBanner = bannerData();
  // Wait for the promises to resolve
  const [products, banner] = await Promise.all([getProducts, getBanner]);

  return (
    <>
      <HeroBanner heroBanner={banner[0]} />
      <div className="products-heading">
        <h2 className="dark:text-slate-200">Best Selling Products</h2>
        <p className="dark:!text-gray-300 font-semibold">Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={banner && banner[1]} />
    </>
  );
};
export default Home;
