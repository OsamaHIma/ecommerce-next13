import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="footer-container">
      <p className="dark:!text-slate-300">2023 &copy; Crown store All rights reserved</p>
      <p className="icons">
        <AiFillInstagram className="dark:!text-slate-400" />
        <AiOutlineTwitter className="dark:!text-slate-400" />
      </p>
    </div>
  );
};
export default Footer;
