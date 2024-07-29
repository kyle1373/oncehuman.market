import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { MdOutlineLogin } from "react-icons/md";

const TopbarWrapper = ({ children }) => {
  const { data: session } = useSession();
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row">
      <div className="fixed top-0 left-0 right-0 bg-neutral-800 h-14 px-4 flex justify-between items-center z-30 border-b-[1px] border-neutral-600">
        <Link href="/">
          <h6 className="text-2xl font-bold text-oncehuman-lightBlue">
            Once Human <span className="text-oncehuman-lightRed">Market</span>
          </h6>
        </Link>
        {!!session ? (
          <div className="relative" ref={dropdownRef}>
            <img
              src={session.user?.image}
              className="rounded-full border-[1px] border-neutral-600 h-11 w-11 cursor-pointer"
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
                      onClick={() => signOut()}
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
            <MdOutlineLogin size={35} />
          </button>
        )}
      </div>

      <div className="mt-14 w-full relative overflow-x-auto">{children}</div>
    </div>
  );
};

export default TopbarWrapper;
