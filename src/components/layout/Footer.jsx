import React from "react";

function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="footer p-10  shadow-lg text-primary-content footer-center">
      <div>
      <p className='text-slate-700 font-bold dark:text-gray-200'>Built by:  <span className='text-indigo-600'>ehiz.dev</span> &copy; {footerYear}</p> 
      </div>
    </footer>
  );
}

export default Footer;
