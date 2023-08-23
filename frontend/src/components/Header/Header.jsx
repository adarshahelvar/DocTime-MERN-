import React from "react";
import "../../index.css";
import logo from "../../assets/images/logo.png";
import userImage from "../../assets/images/avatar-icon.png";
import { navLink, Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { BiMenu } from "react-icons/bi"

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickeyHeader = ()=>{
    window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
        headerRef.current.classList.add('stickey__header')
        
      }else {
        headerRef.current.classList.remove('stickey__header')
      }
    })
  }

  useEffect(()=>{
    handleStickeyHeader()
    return ()=> window.removeEventListener('scroll', handleStickeyHeader)
  })

  const toggleMenu = ()=>menuRef.current.classList.toggle('show__menu')

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div>
            <img src={logo} alt="Logo" />
          </div>

          {/* MENU */}

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </div>
          </div>

          {/* NAV RIGHT */}
          <div className="flex items-center gap-4">
            <div className="hidden">
              <Link to="/">
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img
                    src={userImage}
                    alt="userImage"
                    className="w-full rounded"
                  />
                </figure>
              </Link>
            </div>

            <Link to="/login">
              <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] ">
                Login
              </button>
            </Link>

            <span className="md:invisible " onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
