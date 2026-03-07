import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, MagnifyingGlassIcon, HeartIcon, Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
            <div className="flex items-center gap-3">
              <button className="hidden md:flex p-2 text-dark hover:text-primary transition-colors rounded-full hover:bg-primary-light">
                <HeartIcon className="w-5 h-5" />
              </button>
              <Link to="/cart" className="relative p-2 text-dark hover:text-primary transition-colors rounded-full hover:bg-primary-light">
                <ShoppingCartIcon className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>
              <button className="hidden md:flex p-2 text-dark hover:text-primary transition-colors rounded-full hover:bg-primary-light">
                <UserIcon className="w-5 h-5" />
              </button>

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
            <NavLink to="/cart" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-dark border-b border-gray-100">
              Cart {totalItems > 0 && <span className="ml-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">{totalItems}</span>}
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}
