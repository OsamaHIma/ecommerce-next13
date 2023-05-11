import "./globals.css";
import { Footer, Navbar } from "@/components";
import { StateContext } from "@/app/context/stateContext";
import Providers from "@/components/Providers";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body
        className={`${poppins.className} transition-all ease-in bg-slate-50 dark:bg-slate-800`}
      >
        {/* <StateContext> */}
        <Providers>
          <header>
            <Navbar />
          </header>
          <main className="main-container">{children}</main>
          {/* </StateContext> */}
          <footer>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
