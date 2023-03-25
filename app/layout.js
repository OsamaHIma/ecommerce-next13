import { Footer, Navbar } from "@/components";
import "./globals.css";
import { StateContext } from "@/app/context/stateContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <StateContext>
          <header>
            <Navbar />
          </header>
          <main className="main-container">{children}</main>
        </StateContext>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
