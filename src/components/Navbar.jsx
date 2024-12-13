import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [navbg, setNavBg] = useState();
  const changeNavBg = () => {
    window.scrollY >= 10 ? setNavBg(true) : setNavBg(false);
  };
  useEffect(() => {
    window.addEventListener('scroll', changeNavBg);
    return () => {
      window.removeEventListener('scroll', changeNavBg);
    };
  }, []);

  return (
    <>
      <div onScroll={changeNavBg} className={`${navbg === true ? 'bg-dark-bg duration-500 shadow-white opacity-95' : ''} fixed w-full z-40 bg-gradient-to-b from-black`}>
        <div className=" flex justify-between gap-5 lg:px-20 p-4 items-center  text-dark-typo">
          <Link to={'/'} className="text-2xl font-bold shadow-white">
            MOVIE
            <span className="text-dark-primary"> HYPE</span>
          </Link>

          <ul className="hidden md:flex justify-center gap-5 items-center">
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/discover'}>Discover</Link>
            </li>

            <li>
              <Link to={'/upcoming'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-dark-typo">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </Link>
            </li>
          </ul>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:hidden size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Navbar;
