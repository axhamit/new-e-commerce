import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DiamondIcon from '@mui/icons-material/Diamond';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import SecondaryDropDownMenu from './SecondaryDropDownMenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector(state => state.cart);
  const { wishlistItems } = useSelector(state => state.wishlist);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100 fixed top-0 w-full z-50">
      {/* Main Navigation Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center flex-1">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-3 rounded-2xl text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 mr-2 group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MenuIcon className="group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <DiamondIcon sx={{ fontSize: 24, color: 'white' }} />
                </div>
                {/* 3D Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                  Aarohama Tresure
                </h1>
                <p className="text-gray-500 text-xs font-light tracking-wider">LUXURY BOUTIQUE</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-8 mx-8">
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/collections" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/new-arrivals" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              New Arrivals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/designers" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Designers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Desktop Action Items */}
          <div className="hidden lg:flex items-center justify-end space-x-4">
            
            {/* Search Icon */}
            <button 
              className="p-3 rounded-2xl text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 group"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <SearchIcon className="group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="p-3 rounded-2xl text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 group relative"
            >
              <FavoriteBorderIcon className="group-hover:scale-110 transition-transform duration-200" />
              {wishlistItems.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {wishlistItems.length}
                </div>
              )}
            </Link>

            {/* User Account Section */}
            {isAuthenticated === false ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-6 py-2.5 text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-purple-500/20"
                >
                  Join
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button 
                  className="flex items-center space-x-3 text-gray-700 font-medium hover:bg-purple-50 px-4 py-2.5 rounded-2xl transition-all duration-300 group"
                  onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-white/20">
                    {user.name ? user.name.charAt(0).toUpperCase() : <PersonIcon sx={{ fontSize: "20px" }} />}
                  </div>
                  <span className="max-w-24 truncate font-medium">{user.name && user.name.split(" ", 1)}</span>
                  <span className="transition-transform duration-300 group-hover:scale-110 text-gray-400">
                    {togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: "20px" }} /> : <ExpandMoreIcon sx={{ fontSize: "20px" }} />}
                  </span>
                </button>
                {togglePrimaryDropDown && <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />}
              </div>
            )}

            {/* Shopping Cart */}
            <Link 
              to="/cart" 
              className="flex items-center space-x-2 text-gray-700 font-medium hover:bg-purple-50 px-4 py-2.5 rounded-2xl transition-all duration-300 group relative"
            >
              <div className="relative">
                <ShoppingCartIcon className="group-hover:scale-110 transition-transform duration-200" />
                {cartItems.length > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {cartItems.length}
                  </div>
                )}
              </div>
              <span className="font-medium">Cart</span>
            </Link>
          </div>

          {/* Mobile Action Items */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile Search */}
            <button 
              className="p-3 rounded-2xl text-gray-600 hover:bg-purple-50 transition-all duration-300"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <SearchIcon />
            </button>

            {/* Mobile Wishlist */}
            <Link 
              to="/wishlist" 
              className="p-3 rounded-2xl text-gray-600 hover:bg-pink-50 transition-all duration-300 relative"
            >
              <FavoriteBorderIcon />
              {wishlistItems.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </div>
              )}
            </Link>

            {/* Mobile Cart */}
            <Link 
              to="/cart" 
              className="p-3 rounded-2xl text-gray-600 hover:bg-purple-50 transition-all duration-300 relative"
            >
              <ShoppingCartIcon />
              {cartItems.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar - Full Width when open */}
        {isSearchOpen && (
          <div className="pb-4 animate-fade-in">
            <Searchbar />
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl rounded-3xl mt-2 p-6 border border-gray-200 shadow-2xl animate-fade-in">
            <div className="flex flex-col space-y-4">
              
              {/* User Info if authenticated */}
              {isAuthenticated && (
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : <PersonIcon />}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold">{user.name}</p>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-2">
                <Link 
                  to="/products" 
                  className="block px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop All
                </Link>
                <Link 
                  to="/new-arrivals" 
                  className="block px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  New Arrivals
                </Link>
                <Link 
                  to="/collections" 
                  className="block px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Collections
                </Link>
                <Link 
                  to="/designers" 
                  className="block px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Designers
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated === false ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link 
                      to="/login" 
                      className="px-4 py-3 text-gray-700 font-medium rounded-xl border-2 border-gray-200 text-center hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/register" 
                      className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Join Free
                    </Link>
                  </div>
                ) : (
                  <button 
                    className="w-full px-4 py-3 text-gray-700 font-medium bg-gray-50 rounded-xl text-center transition-all duration-200 hover:bg-purple-50 hover:text-purple-600"
                    onClick={() => {
                      setTogglePrimaryDropDown(!togglePrimaryDropDown);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    My Account
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Background Blur Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;