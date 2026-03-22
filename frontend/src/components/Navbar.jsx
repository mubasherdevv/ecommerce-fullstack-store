import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, MagnifyingGlassIcon, HeartIcon, Bars3Icon, XMarkIcon, UserIcon, ChevronDownIcon, ClipboardDocumentListIcon, ChartBarIcon, CubeIcon, TagIcon, HomeIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
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
                      <>
                        <Link onClick={() => setUserMenuOpen(false)} to="/admin" className="block px-4 py-2 text-sm text-primary font-semibold hover:bg-primary/5 transition-colors border-t border-gray-50 mt-1 pt-2">
                          Admin Dashboard
                        </Link>
                        <Link onClick={() => setUserMenuOpen(false)} to="/admin/products" className="block px-4 py-2 text-sm text-dark hover:bg-gray-light hover:text-primary transition-colors">
                          Manage Products
                        </Link>
                        <Link onClick={() => setUserMenuOpen(false)} to="/admin/categories" className="block px-4 py-2 text-sm text-dark hover:bg-gray-light hover:text-primary transition-colors">
                          Manage Categories
                        </Link>
                        <Link onClick={() => setUserMenuOpen(false)} to="/admin/orders" className="block px-4 py-2 text-sm text-dark hover:bg-gray-light hover:text-primary transition-colors">
                          Manage Orders
                        </Link>
                      </>
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

              {/* Mobile profile */}
              {user ? (
                <Link to="/profile" className="p-2 text-dark hover:text-primary transition-colors md:hidden">
                  <UserIcon className="w-5 h-5" />
                </Link>
              ) : (
                <Link to="/login" className="p-2 text-dark hover:text-primary transition-colors md:hidden">
                  <UserIcon className="w-5 h-5" />
                </Link>
              )}

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
        <div className={`md:hidden bg-white transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-screen opacity-100 shadow-xl' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-6 space-y-6">
            {user ? (
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-dark truncate">{user.name}</p>
                  <p className="text-xs text-gray-medium truncate">{user.email}</p>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="bg-gray-light p-4 rounded-2xl">
                <p className="text-sm font-medium text-dark mb-3">Welcome, Guest!</p>
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileOpen(false)} 
                    className="btn-outline text-center text-sm py-2.5"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setMobileOpen(false)} 
                    className="btn-primary text-center text-sm py-2.5"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}

            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-3 bg-gray-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium hover:text-primary transition-colors">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </form>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-medium uppercase tracking-wider mb-2 px-2">Menu</p>
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-dark hover:bg-gray-light'
                    }`
                  }
                >
                  {link.to === '/' ? (
                    <HomeIcon className="w-5 h-5" />
                  ) : (
                    <RectangleStackIcon className="w-5 h-5" />
                  )}
                  {link.label}
                </NavLink>
              ))}
              <Link 
                to="/products" 
                onClick={() => setMobileOpen(false)} 
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-dark hover:bg-gray-light transition-colors"
              >
                <CubeIcon className="w-5 h-5" />
                All Products
              </Link>
            </div>
            
            {user && (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-medium uppercase tracking-wider mb-2 px-2">My Account</p>
                <Link 
                  to="/profile" 
                  onClick={() => setMobileOpen(false)} 
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-dark hover:bg-gray-light transition-colors"
                >
                  <UserIcon className="w-5 h-5" />
                  Profile
                </Link>
                <Link 
                  to="/orders" 
                  onClick={() => setMobileOpen(false)} 
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-dark hover:bg-gray-light transition-colors"
                >
                  <ClipboardDocumentListIcon className="w-5 h-5" />
                  My Orders
                </Link>
                {user.isAdmin && (
                  <>
                    <div className="pt-2">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 px-2">Admin</p>
                      <Link 
                        to="/admin" 
                        onClick={() => setMobileOpen(false)} 
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                      >
                        <ChartBarIcon className="w-5 h-5" />
                        Dashboard
                      </Link>
                      <Link 
                        to="/admin/products" 
                        onClick={() => setMobileOpen(false)} 
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-dark hover:bg-gray-light transition-colors"
                      >
                        <CubeIcon className="w-5 h-5" />
                        Products
                      </Link>
                      <Link 
                        to="/admin/categories" 
                        onClick={() => setMobileOpen(false)} 
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-dark hover:bg-gray-light transition-colors"
                      >
                        <TagIcon className="w-5 h-5" />
                        Categories
                      </Link>
                      <Link 
                        to="/admin/orders" 
                        onClick={() => setMobileOpen(false)} 
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-dark hover:bg-gray-light transition-colors"
                      >
                        <ShoppingCartIcon className="w-5 h-5" />
                        Orders
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              <Link 
                to="/cart" 
                onClick={() => setMobileOpen(false)} 
                className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                View Cart ({totalItems})
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
