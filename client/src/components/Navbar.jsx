import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutUsers } from "../store/action/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Redux state
  const rawUser = useSelector((state) => state.usersReducer.user);
  const user = rawUser?.user || rawUser;
  const cart = useSelector((state) => state.cartsReducers.carts);
  const cartCount =
    cart?.items?.reduce((sum, it) => sum + (it.quantity || 0), 0) || 0;

  // Outside click for profile
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    dispatch(asyncLogoutUsers());
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white relative transition-all">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2">
        <span className="text-2xl md:text-3xl text-red-400 font-extrabold">
          BAKE & COFFEE
        </span>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className={({ isActive }) =>
          isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
        }>Home</NavLink>

        <NavLink to="/products" className={({ isActive }) =>
          isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
        }>Menu</NavLink>

        {user && (
          <NavLink to="/myorders" className={({ isActive }) =>
            isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
          }>My Orders</NavLink>
        )}
        {user?.role === "admin" && (
          <>
            <NavLink to="/admin/create-product" className={({ isActive }) =>
              isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
            }>Create Product</NavLink>
            <NavLink to="/admin/orders" className={({ isActive }) =>
              isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
            }>Manage Orders</NavLink>
          </>
        )}

        {/* Search bar */}
        {/* <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div> */}

        {/* Cart */}
        {user?.role === "user" && (

        <NavLink to="/cart" className="relative cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#615fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {cartCount > 0 && (
            <button className="absolute -top-2 -right-3 text-xs text-white bg-red-500 w-[18px] h-[18px] rounded-full">
              {cartCount}
            </button>
          )}
        </NavLink>
        )}

        {/* Profile / Auth */}
        {user ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex z-50 items-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-brown-900 font-bold py-2 px-4 rounded-full shadow transition"
            >
              <span className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-lg">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
              <span className="hidden md:inline">Profile</span>
            </button>

            {/* Dropdown */}
            <div
              className={`absolute z-50 right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl transform transition-all duration-300 ease-in-out ${
                profileOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0 pointer-events-none"
              }`}
            >
              <div className="p-4 border-b border-gray-100">
                <p className="text-lg font-bold text-brown-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="p-2">
                <NavLink
                  to="/myorders"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-yellow-50 rounded-xl text-brown-900"
                >
                  My Orders
                </NavLink>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-yellow-50 rounded-xl text-brown-900 w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <NavLink
              to="/login"
              className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="cursor-pointer px-6 py-2 border border-indigo-500 text-indigo-500 hover:bg-indigo-50 transition rounded-full"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      {user?.role === "user" && (

      <NavLink to="/cart" className="md:hidden absolute top-6 right-15 cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#615fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {cartCount > 0 && (
            <button className="absolute -right-2 -top-3 text-xs text-white bg-red-500 w-[18px] h-[18px] rounded-full">
              {cartCount}
            </button>
          )}
        </NavLink>
      )}
      
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
        className="sm:hidden z-50"
      >
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } absolute z-50 top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={() => setMenuOpen(false)}>
          Menu
        </NavLink>
        {user && (
          <NavLink to="/myorders" onClick={() => setMenuOpen(false)}>
            My Orders
          </NavLink>
        )}
        {user?.role === "admin" && (
          <>
            <NavLink to="/admin/create-product" onClick={() => setMenuOpen(false)}>
              Create Product
            </NavLink>
            <NavLink to="/admin/orders" onClick={() => setMenuOpen(false)}>
              Manage Orders
            </NavLink>
          </>
        )}
        {user?.role === "user" && (

        <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
          Cart ({cartCount})
        </NavLink>
        )}
        {user ? (
        <div className="flex justify-between items-center w-full" >

        <div className="py-2 px-4 border-3  rounded-full border-gray-100">
                <p className="text-sm  text-brown-900">Name : {user.name}</p>
                <p className="text-sm text-gray-600">Email : {user.email}</p>
              </div>
          <button
            onClick={() => {
              setMenuOpen(false);
              logout();
            }}
            className="cursor-pointer px-6 h-10 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
            >
            Logout
          </button>
            </div>
        ) : (
          <>
            <NavLink
              to="/login"
              className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="cursor-pointer px-6 py-2 mt-2 border border-indigo-500 text-indigo-500 hover:bg-indigo-50 transition rounded-full text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;