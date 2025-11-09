import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutUsers } from "../store/action/userActions";
import axios from "../api/config";

const Navbar = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Assuming your user reducer stores a single logged-in user
  const rawUser = useSelector((state) => state.usersReducer.user);
  // backend/auth actions sometimes store { token, user } while other
  // places may store the user object directly. Normalize both shapes.
  const user = rawUser?.user || rawUser;

  const navigate = useNavigate();

  // read cart from redux store so UI updates reactively when cart changes
  const cart = useSelector((state) => state.cartsReducers.carts);
  const cartCount = cart?.items?.reduce((sum, it) => sum + (it.quantity || 0), 0) || 0;

  console.log(user);

  const logout = () => {
    dispatch(asyncLogoutUsers());
    navigate("/login");
  };

  return (
    <nav className="bg-yellow-50 shadow-lg rounded-3xl px-4 py-3 flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="w-full flex justify-between items-center">
        <span className="text-2xl md:text-3xl font-extrabold text-brown-900 tracking-wide">ROLLIN.</span>
        <button className="md:hidden p-2 rounded-full bg-yellow-200" onClick={() => setMenuOpen(!menuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-brown-900"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      {/* Desktop menu */}
      <div className="hidden md:flex w-full justify-between items-center mt-4 md:mt-0">
        <div className="flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"}>Cake</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"}>Bakery</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"}>About Us</NavLink>
          <NavLink to="/cookies" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"}>Cookies</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"}>Contact</NavLink>
          {user && (
            <NavLink to="/myorders" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"}>My Orders</NavLink>
          )}
          {user && user.role === "admin" && (
            <>
              <NavLink to="/admin/create-product" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"}>Create Product</NavLink>
              <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"}>Manage Orders</NavLink>
            </>
          )}
        </div>
        <div className="flex items-center gap-6">
          <NavLink to="/cart" className="relative flex items-center group">
            <span className="flex w-8 h-8 bg-yellow-200 rounded-full items-center justify-center mr-2">
              {/* Cart icon placeholder */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brown-900"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.2a1 1 0 00.9-1.3L17 13M7 13V6h13" /></svg>
            </span>
            <span className="text-brown-900 font-semibold">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs font-bold shadow-lg">{cartCount}</span>
            )}
          </NavLink>
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-brown-900 font-bold py-2 px-4 rounded-full shadow transition"
              >
                <span className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-lg">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <span className="hidden md:inline">Profile</span>
              </button>
              
              {/* Sliding Profile Menu */}
              <div className={`absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl transform transition-all duration-300 ease-in-out ${profileOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0 pointer-events-none'}`}>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    My Orders
                  </NavLink>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-yellow-50 rounded-xl text-brown-900 w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink to="/login" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full shadow transition">Login</NavLink>
              <NavLink to="/register" className="bg-white hover:bg-yellow-100 text-brown-900 font-bold py-2 px-4 rounded-full shadow transition">Register</NavLink>
            </div>
          )}
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full shadow transition ml-4">Start Baking</button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden w-full mt-4 flex flex-col gap-4 animate-fade-in">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"} onClick={() => setMenuOpen(false)}>Cake</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"} onClick={() => setMenuOpen(false)}>Bakery</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"} onClick={() => setMenuOpen(false)}>About Us</NavLink>
          <NavLink to="/cookies" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"} onClick={() => setMenuOpen(false)}>Cookies</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"} onClick={() => setMenuOpen(false)}>Contact</NavLink>
          {user && (
            <NavLink to="/myorders" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"} onClick={() => setMenuOpen(false)}>My Orders</NavLink>
          )}
          {user && user.role === "admin" && (
            <>
              <NavLink to="/admin/create-product" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"} onClick={() => setMenuOpen(false)}>Create Product</NavLink>
              <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "text-yellow-600 font-bold" : "text-brown-900 hover:text-yellow-600 font-semibold"} onClick={() => setMenuOpen(false)}>Manage Orders</NavLink>
            </>
          )}
          <NavLink to="/cart" className="relative flex items-center group" onClick={() => setMenuOpen(false)}>
            <span className="flex w-8 h-8 bg-yellow-200 rounded-full items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brown-900"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.2a1 1 0 00.9-1.3L17 13M7 13V6h13" /></svg>
            </span>
            <span className="text-brown-900 font-semibold">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs font-bold shadow-lg">{cartCount}</span>
            )}
          </NavLink>
          {user ? (
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center justify-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-brown-900 font-bold py-2 px-4 rounded-full shadow transition"
              >
                <span className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-lg">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <span>Profile</span>
              </button>
              
              {/* Mobile Profile Menu */}
              {profileOpen && (
                <div className="bg-white rounded-2xl shadow-xl p-4 mt-2">
                  <div className="border-b border-gray-100 pb-4 mb-4">
                    <p className="text-lg font-bold text-brown-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <NavLink
                    to="/myorders"
                    onClick={() => {
                      setProfileOpen(false);
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-yellow-50 rounded-xl text-brown-900"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    My Orders
                  </NavLink>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      setMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-yellow-50 rounded-xl text-brown-900 w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <NavLink to="/login" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full shadow transition">Login</NavLink>
              <NavLink to="/register" className="bg-white hover:bg-yellow-100 text-brown-900 font-bold py-2 px-4 rounded-full shadow transition">Register</NavLink>
            </div>
          )}
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full shadow transition mt-4">Start Baking</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
