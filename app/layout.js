import { Footer, Navbar } from "@/components";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <header>
          <Navbar />
        </header>
        <main className="main-container">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
