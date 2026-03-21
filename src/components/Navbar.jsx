import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaRegSun, FaRegMoon, FaRegWindowClose } from "react-icons/fa";
import { TbLanguage, TbLanguageHiragana } from "react-icons/tb";
import { GiMoneyStack, GiShoppingCart } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";
import { HiBarsArrowDown } from "react-icons/hi2";
import ViewCart from "./ViewCart";

function Navbar() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const { total, cart } = useCart();
  const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow p-4 relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1
        className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent animate-pulse">
          {t("ecommerce")}
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ViewCart/>

          <button onClick={toggleTheme} className="justify-center font-bold hover:text-gray-500 cursor-pointer">
            {theme === "dark" 
            ? <FaRegMoon size={22}/>
            : <FaRegSun size={22}/>}
          </button>

          <button onClick={toggleLanguage} className="font-semibold cursor-pointer hover:text-gray-500">
            {language === "es" 
            ? <TbLanguage className="text-3xl"/> 
            : <TbLanguageHiragana className="text-3xl"/>}
          </button>
          
          <div className="flex gap-4">
            <button onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-semibold text-center rounded cursor-pointer">
              <IoMdLogOut className="text-lg"/><span>{t("logout")}</span>
            </button>
          </div>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setMenuOpen(true)}
        className="text-2xl cursor-pointer hover:text-gray-500 dark:text-white dark:hover:text-gray-400">
          <HiBarsArrowDown size={28}/>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-end items-start pt-16 pr-4 rounded-sm">
          <div ref={menuRef} className="w-72 h-auto rounded-l-xl bg-white dark:bg-gray-800 p-4 shadow-xl">
            {/* Close */}
            <button onClick={() => setMenuOpen(false)}
            className="text-xl mb-4 right-0 font-bold hover:text-gray-500 dark:hover:text-white cursor-pointer">
              <FaRegWindowClose size={26}/>
            </button>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
              <Link to="/cart"
              className="fw-full flex items-center justify-center font-bold text-center text-base hover:text-gray-500 dark:hover:text-green-500 rounded">
                <GiShoppingCart size={26}/>{t("viewCart")}
              </Link>
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl text-green-600 dark:text-green-400">
                  <GiMoneyStack size={24}/> ${total}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-300 font-extrabold">
                  {itemsCount} Item(s)
                </span>
              </div>
            </div>

              <div className="flex gap-4">
              <button onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 font-semibold hover:bg-gray-200 hover:text-gray-600 dark:hover:text-black rounded">
                {theme === "dark" 
                ? <><FaRegMoon size={22}/>{t("dark")}</> 
                : <><FaRegSun size={22}/>{t("light")}</>}
              </button>
              </div>
              
              <div className="flex gap-4">
              <button onClick={toggleLanguage}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 font-semibold hover:bg-gray-200 hover:text-gray-600 dark:hover:text-black rounded">
                {language === "es" 
                ? <><TbLanguage className="text-lg"/>{t("english")}</> 
                : <><TbLanguageHiragana className="text-lg"/>{t("spanish")}</>}
              </button>
              </div>

              <div className="flex gap-4">
              <button onClick={() => {logout(); setMenuOpen(false);}}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-semibold text-center rounded cursor-pointer">
                <IoMdLogOut className="text-lg"/><span>{t("logout")}</span>
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;