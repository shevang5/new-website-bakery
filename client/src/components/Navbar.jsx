import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutUsers } from "../store/action/userActions";
import { User, ShoppingBag, Menu, X } from "lucide-react";

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
    <>
      <nav className="md:px-12 px-2 py-4 bg-red-500 shadow-sm font-sans relative z-20">
        <div className="bg-white py-3 md:px-10 px-2 rounded-lg w-full flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <NavLink to="/" className="flex items-center gap-2">
              <div className="p-1 rounded-full border-2 border-orange-500">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                  BC
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-red-600 font-bold text-lg tracking-wide">BAKE</span>
                <span className="text-blue-900 font-bold text-sm tracking-widest">COFFEE</span>
              </div>
            </NavLink>

            {/* Search Bar */}
            {/* <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 ml-8 w-64 lg:w-80">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-500"
              />
            </div> */}
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
            <NavLink to="/" className={({ isActive }) =>
              isActive ? "text-red-600 font-semibold" : "hover:text-red-600 transition-colors"
            }>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) =>
              isActive ? "text-red-600 font-semibold" : "hover:text-red-600 transition-colors"
            }>Menu</NavLink>
            {user && (
              <NavLink to="/myorders" className={({ isActive }) =>
                isActive ? "text-red-600 font-semibold" : "hover:text-red-600 transition-colors"
              }>My Orders</NavLink>
            )}
            {user?.role === "admin" && (
              <>
                <NavLink to="/admin/create-product" className={({ isActive }) =>
                  isActive ? "text-red-600 font-semibold" : "hover:text-red-600 transition-colors"
                }>Create</NavLink>
                <NavLink to="/admin/orders" className={({ isActive }) =>
                  isActive ? "text-red-600 font-semibold" : "hover:text-red-600 transition-colors"
                }>Manage</NavLink>
              </>
            )}
          </div>

          {/* Account & Cart */}
          <div className="flex items-center gap-4">

            {/* Cart Button */}
            {user?.role === "user" && (
              <NavLink to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            )}

            {/* Profile Button */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <User className="w-5 h-5 text-gray-700" />
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute z-50 right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl transform transition-all duration-300 ease-in-out ${profileOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0 pointer-events-none"
                    }`}
                >
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-lg font-bold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    {/* <p className="text-sm text-gray-600">{user.role}</p> */}
                  </div>
                  <div className="p-2">
                    <NavLink
                      to="/myorders"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-gray-900"
                    >
                      My Orders
                    </NavLink>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                      className="flex items-center bg-red-600  p-3 hover:bg-gray-50 rounded-lg text-white w-full"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            {/* Auth Buttons */}
            {user ? (
              <button
                onClick={() => {
                  logout();
                }}
                className="bg-red-500 hidden hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Login
                </NavLink>
              </>
            )}

            {/* Mobile Menu Button */}
            {/* <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button> */}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white mt-3 rounded-lg shadow-md py-4 px-5 mx-2">
            <div className="flex flex-col gap-4 text-sm font-medium text-gray-700 border-b border-gray-200 pb-4">
              <NavLink to="/" onClick={() => setMenuOpen(false)} className="hover:text-red-600">
                Home
              </NavLink>
              <NavLink to="/products" onClick={() => setMenuOpen(false)} className="hover:text-red-600">
                Menu
              </NavLink>
              {user?.role === "user" && (
                <NavLink to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-red-600">
                  Cart ({cartCount})
                </NavLink>
              )}
            </div>

            <div className="flex flex-col gap-4 text-sm font-medium text-gray-700 mt-4">
              {user && (
                <NavLink to="/myorders" onClick={() => setMenuOpen(false)} className="hover:text-red-600">
                  My Orders
                </NavLink>
              )}
              {user?.role === "admin" && (
                <>
                  <NavLink to="/admin/create-product" onClick={() => setMenuOpen(false)} className="hover:text-red-600">
                    Create Product
                  </NavLink>
                  <NavLink to="/admin/orders" onClick={() => setMenuOpen(false)} className="hover:text-red-600">
                    Manage Orders
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation Bar - Mobile & Tablet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around py-2 px-2">
          <NavLink to="/" className={({ isActive }) =>
            isActive ? "flex flex-col items-center justify-center py-2 px-3 text-red-600 font-semibold text-xs" : "flex flex-col items-center justify-center py-2 px-3 text-gray-600 hover:text-red-600 text-xs"
          }>
            <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            Home
          </NavLink>

          <NavLink to="/products" className={({ isActive }) =>
            isActive ? "flex flex-col items-center justify-center py-2 px-3 text-red-600 font-semibold text-xs" : "flex flex-col items-center justify-center py-2 px-3 text-gray-600 hover:text-red-600 text-xs"
          }>
            <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-. 9-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7.17 11.12c.51.6 1.35 1.38 2.83 1.38s2.32-.78 2.83-1.38l6-7.2h2.2L4.2 3h-3.2l6.17 8.12zm13.73 1.88H4.18l-.02-.12c-.15-1.07-.67-3.15-2.4-4.53l.5-.83c2.2 1.73 2.66 4.1 2.8 5.48h15.12c.14-1.38.6-3.75 2.8-5.48l.5.83c-1.73 1.38-2.25 3.46-2.4 4.53l-.02.12z" />
            </svg>
            Menu
          </NavLink>

          {user?.role === "user" && (
            <NavLink to="/cart" className={({ isActive }) =>
              isActive ? "flex flex-col items-center justify-center py-2 px-3 text-red-600 font-semibold text-xs relative" : "flex flex-col items-center justify-center py-2 px-3 text-gray-600 hover:text-red-600 text-xs relative"
            }>
              <ShoppingBag className="w-6 h-6 mb-1" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
              Cart
            </NavLink>
          )}

          {user && (
            <NavLink to="/myorders" className={({ isActive }) =>
              isActive ? "flex flex-col items-center justify-center py-2 px-3 text-red-600 font-semibold text-xs" : "flex flex-col items-center justify-center py-2 px-3 text-gray-600 hover:text-red-600 text-xs"
            }>
              <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h6v-6zm0-6h-6v6h6v-6zM13 7h-6v6h6V7zm-6 6H1v6h6v-6zm6-6V1H7v6h6zm6 0h-6v6h6V7zm6-6h-6v6h19V1zm0 6h-6v6h6v-6z" />
              </svg>
              Orders
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink to="/admin/orders" className={({ isActive }) =>
              isActive ? "flex flex-col items-center justify-center py-2 px-3 text-red-600 font-semibold text-xs" : "flex flex-col items-center justify-center py-2 px-3 text-gray-600 hover:text-red-600 text-xs"
            }>
              <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
              manage <br />
              orders
            </NavLink>
          )}

          {!user ? (
            <NavLink to="/login" className={({ isActive }) =>
              isActive ? "flex flex-col items-center justify-center py-2 px-3 text-red-600 font-semibold text-xs" : "flex flex-col items-center justify-center py-2 px-3 text-gray-600 hover:text-red-600 text-xs"
            }>
              <User className="w-6 h-6 mb-1" />
              Login
            </NavLink>
          ) : null}
        </div>
      </div>

      {/* Add padding to body to account for fixed bottom nav */}
      <style>{`
        @media (max-width: 1024px) {
          body {
            padding-bottom: 70px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;