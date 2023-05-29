import { useState, useEffect, use } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";

import { fetchDataFromApi } from "@/utils/api";

import { useSelector } from "react-redux";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);

  const controlNavbar = () => {
    //hide menu on scroll down > 200px
    if (window.scrollY > 200) {
      //if(current scroll position > lastscroll and not in mobile view then hide)
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        //else if the scroll position < lastscroll then show and add shadow
        setShow("shadow-xl");
      }
    } else {
      setShow("translate-y-0");
    }
    //set the lastscroll position
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    //subscribe the following method on window when the component mounts
    window.addEventListener("scroll", controlNavbar);
    //return medthod executes the following method when the component unmounts
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi("/api/categories?populate=*");
    setCategories(data);
  };

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky
                        top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60] flex justify-between items-center">
        {/* Nav Logo */}
        <Link href="/">
          <img
            src="/logo.svg"
            alt="Nike Logo"
            className="w-[40px] md:w-[60px]"
          />
        </Link>

        {/* Nav Manu */}
        <Menu
          showCategoryMenu={showCategoryMenu}
          setShowCategoryMenu={setShowCategoryMenu}
          categories={categories}
        />

        {mobileMenu && (
          <MenuMobile
            showCategoryMenu={showCategoryMenu}
            setShowCategoryMenu={setShowCategoryMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        {/* Nav Icons i.e cart etc */}
        <div className="flex items-center gap-2 text-black">
          {/* Icon Start */}
          <div
            className="w-8 h:8 md:w-12 md:h-12 rounded-full flex justify-center items-center
           hover:bg-black/[0.05] cursor-pointer relative"
          >
            <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
            <div
              className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full
              bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px]
              flex justify-center items-center px-[2px] md:px-[5px]"
            >
              10
            </div>
          </div>
          {/* Icon End */}

          {/* Icon Start */}
          <Link href="/cart">
            <div
              className="w-8 h:8 md:w-12 md:h-12 rounded-full flex justify-center items-center
           hover:bg-black/[0.05] cursor-pointer relative"
            >
              <BsCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div
                  className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full
              bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px]
              flex justify-center items-center px-[2px] md:px-[5px]"
                >
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>
          {/* Icon End */}

          {/* Mobile Hamburger Menu Start */}
          <div
            className="w-8 h:8 md:w-12 md:h-12 rounded-full flex justify-center items-center
           hover:bg-black/[0.05] cursor-pointer relative -mr-2 md:hidden"
          >
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile Hamburger Menu End */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
