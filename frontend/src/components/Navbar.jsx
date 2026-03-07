import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, MagnifyingGlassIcon, HeartIcon, Bars3Icon, XMarkIcon, UserIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-dark text-white text-xs text-center py-2 px-4">
        <span>Summer Sale! Up to 30% off — &nbsp;</span>
        <Link to="/products" className="underline font-semibold hover:text-primary transition-colors">Shop Now</Link>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-extrabold text-primary tracking-tight">Exclusive</span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors relative group ${
                      isActive ? 'text-primary' : 'text-dark hover:text-primary'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 bg-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium hover:text-primary transition-colors">
                <MagnifyingGlassIcon className="w-4 h-4" />
              </button>
            </form>

            {/* Icons */}
            <div className="flex items-center gap-2 md:gap-3">
              <button className="hidden md:flex p-2 text-dark hover:text-primary transition-colors rounded-full hover:bg-primary-light">
                <HeartIcon className="w-5 h-5" />
              </button>
              <Link to="/cart" className="relative p-2 text-dark hover:text-primary transition-colors rounded-full hover:bg-primary-light hidden md:flex">
                <ShoppingCartIcon className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              {/* User / Auth */}
              <div className="relative hidden md:block" ref={userMenuRef}>
                {user ? (
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 p-1.5 pl-3 pr-2 text-sm font-medium text-dark hover:text-primary bg-gray-light hover:bg-primary/5 transition-colors rounded-full border border-gray-100"
                  >
                    <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDownIcon className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-dark hover:text-primary border border-gray-200 px-4 py-1.5 rounded-full hover:border-primary/30 transition-colors">
                    <UserIcon className="w-4 h-4" /> Login
                  </Link>
                )}

                {/* Dropdown Menu */}
                {user && userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-sm font-bold text-dark truncate">{user.name}</p>
                      <p className="text-xs text-gray-medium truncate">{user.email}</p>
                    </div>
                    <Link onClick={() => setUserMenuOpen(false)} to="/profile" className="block px-4 py-2 text-sm text-dark hover:bg-gray-light hover:text-primary transition-colors">
                      Profile
                    </Link>
                    <Link onClick={() => setUserMenuOpen(false)} to="/orders" className="block px-4 py-2 text-sm text-dark hover:bg-gray-light hover:text-primary transition-colors">
                      My Orders
                    </Link>
                    {user.isAdmin && (
                      <Link onClick={() => setUserMenuOpen(false)} to="/admin" className="block px-4 py-2 text-sm text-primary font-semibold hover:bg-primary/5 transition-colors border-t border-gray-50 mt-1 pt-2">
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-gray-50 mt-1 pt-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile cart */}
              <Link to="/cart" className="relative p-2 text-dark hover:text-primary transition-colors md:hidden">
                <ShoppingCartIcon className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-dark hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="container-custom pb-4 pt-2 space-y-4 border-t border-gray-100">
            {user ? (
              <div className="bg-gray-light p-3 rounded-lg flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold text-dark text-sm truncate">{user.name}</p>
                  <p className="text-xs text-gray-medium">{user.email}</p>
                </div>
                <button onClick={handleLogout} className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-md">Logout</button>
              </div>
            ) : (
               <div className="grid grid-cols-2 gap-2 mb-4">
                 <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-outline text-center text-sm py-2">Login</Link>
                 <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary text-center text-sm py-2">Register</Link>
               </div>
            )}
            
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2.5 bg-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium">
                <MagnifyingGlassIcon className="w-4 h-4" />
              </button>
            </form>
            
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-sm font-medium border-b border-gray-100 ${isActive ? 'text-primary' : 'text-dark'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            {user && (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-dark border-b border-gray-100">
                  Profile & Orders
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-primary border-b border-gray-100">
                    Admin Dashboard
                  </Link>
                )}
              </>
            )}
            
          </div>
        </div>
      </header>
    </>
  );
}
