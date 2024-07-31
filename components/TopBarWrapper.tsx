import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { MdOutlineLogin } from "react-icons/md";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useUser } from "@hooks/UserContext";
import { LINKS } from "@constants/constants";
import { FaDiscord } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const TopbarWrapper = ({ children }) => {
  const { discordId, discordUsername, discordEmail, discordImage } = useUser(); // Destructure user data
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleSignOut = async () => {
    NProgress.start();
    await signOut();
    NProgress.done();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row">
      <div className="fixed top-0 left-0 right-0 bg-neutral-800 h-14 px-4 flex justify-between items-center z-40 border-b-[1px] border-neutral-600">
        <div className="flex items-center justify-center">
          <Link href="/">
            <h6 className="sm:text-2xl text-xl font-bold text-oncehuman-lightBlue flex items-end">
              Mayfly<span className="text-white">.</span>
              <span className="text-oncehuman-lightRed">Market</span>
            </h6>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link
            href={LINKS.discord}
            className="hover:underline mr-5 text-neutral-400 hover:text-neutral-200"
          >
            <FaDiscord className="h-7 w-7" />
          </Link>

          {!!discordId ? ( // Check if userId is available
            <div className="relative" ref={dropdownRef}>
              <img
                src={discordImage}
                className="rounded-full border border-neutral-600 sm:h-9 sm:w-9 h-8 w-8 cursor-pointer"
                onClick={handleDropdownClick}
              ></img>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-600 border border-neutral-500 rounded-md shadow-lg z-50">
                  <ul>
                    <li>
                      <Link
                        href="/my-profile"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-white hover:bg-neutral-500"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-neutral-500"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => signIn("discord")}>
              <FaUserCircle className="text-neutral-400 hover:text-neutral-200 sm:h-8 sm:w-8 h-7 w-7" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-14 w-full relative overflow-x-auto overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default TopbarWrapper;
