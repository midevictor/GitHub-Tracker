import React from "react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { HiLightBulb } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";

function Navbar({ title }) {
  const [darkmode, setDarkmode] = useState(false);
  const [darkmodeIcon, setDarkmodeIcon] = useState(<HiLightBulb className="text-3xl" />);
  return (
    <nav className={`navbar mb-12  text-white {darkMode ? "dark" : ""}`}>
      <div className="mx-auto container fixed z-50 shadow-lg pb-4 pt-4">
        <div className="flex-none px-2 mx-2">
          <FaGithub className="inline pr-2 text-3xl" />
          <Link to="/" className="text-lg font-bold align-middle">
            {title}
          </Link>
        </div>

        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end gap-4">
           
            <Link
              to="/home"
              className="hidden btn btn-ghost hover:bg-indigo-700 btn-sm rounded-btn md:flex text-center justify-center  "
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hidden btn btn-ghost hover:bg-indigo-700 btn-sm rounded-btn md:flex text-center justify-center"
            >
              About
            </Link>
            <div className="darkmode shadow- rounded-full flex justify-center text-center">
              <button
                onClick={() => {
                  setDarkmode(!darkmode);
                  if (darkmode) {
                    setDarkmodeIcon(
                      <HiLightBulb className="cursor-pointer text-3xl " />
                    );
                  } else {
                    setDarkmodeIcon(
                      <HiOutlineLightBulb className="cursor-pointer text-3xl" />
                    );
                  }
                }}
                className="cursor-pointer "
              >
                {darkmodeIcon}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.defaultProps = {
  title: "Github Finder",
};
Navbar.propTypes = {
  title: PropTypes.string,
};
export default Navbar;
