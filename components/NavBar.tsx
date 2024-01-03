import { useCallback, useEffect, useState } from "react";
import MobileMenu2 from "./MobileMenu2";
import NavbarItem from "./NavbarItem";
import { MdMenu } from "react-icons/md";
import { BsBell, BsChevronDown } from "react-icons/bs";
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/router";

const TOP_OFFSET = 66;

const NavBar = () => {
     const [showMobileMenu, setShowMobileMenu] = useState(false);
     const [showAccountMenu, setShowAccountMenu] = useState(false);
     const [showBackground, setShowBackground] = useState(false);

     const router = useRouter();

     useEffect(() => {
          const handleScroll = () => {
               if (window.scrollY >= TOP_OFFSET) {
                    setShowBackground(true);
               } else {
                    setShowBackground(false);
               }
               window.addEventListener("scroll", handleScroll);
               return () => {
                    window.removeEventListener("scroll", handleScroll);
               };
          };
     }, []);
     const toggleMobileMenu = useCallback(() => {
          setShowMobileMenu((prev) => !prev);
     }, []);
     const toggleAccountMenu = useCallback(() => {
          setShowAccountMenu((prev) => !prev);
     }, []);
     return (
          <nav className="w-full fixed z-40">
               <div
                    className={`
                        px-4
                        md:px-16
                        py-6
                        flex
                        flex-row
                        items-center
                        transition
                        duration-500
                        ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}
                        `}
               >
                    <img className="h-4 lg:h-7" src="/images/80plexx2.png" alt="80Plexx" />
                    <div
                         className="
             flex-row
             ml-8
              gap-7
              hidden
              lg:flex
          "
                    >
                         <NavbarItem label="Home" />
                         <div onClick={() => router.push("/profiles")}>
                              <NavbarItem label="Entertainment" />
                         </div>

                         <NavbarItem label="War Room" />
                    </div>
                    <div
                         onClick={toggleMobileMenu}
                         className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
                    >
                         <p className="text-sm text-white"></p>
                         <MdMenu className="text-white h-10 transition" />
                         <MobileMenu2 visible={showMobileMenu} />
                    </div>
                    <div className="flex flex-row ml-auto gap-7 items-center">
                         {/* <div className="text-gray-200 hove:text-gray-300 cursor-pointer transition">Search</div> */}
                         <div className="text-gray-200 hove:text-gray-300 cursor-pointer transition">
                              <BsBell />
                         </div>
                         <div
                              onClick={toggleAccountMenu}
                              className="flex flex-row items-center gap-2 cursor-pointer relative"
                         >
                              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                                   <img src="/images/default-red.png" alt="Photo" />
                              </div>
                              <BsChevronDown
                                   className={`text-white transition ${showAccountMenu ? "rotate-180" : "rotate-0"}`}
                              />
                              <AccountMenu visible={showAccountMenu} />
                         </div>
                    </div>
               </div>
          </nav>
     );
};

export default NavBar;
