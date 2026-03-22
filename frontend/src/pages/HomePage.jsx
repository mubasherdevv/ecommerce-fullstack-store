import { useEffect, useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, TruckIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';
import ProductContext from '../context/ProductContext';
import FAQSection from '../components/FAQSection';

import axios from 'axios';

function useCountUp(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const frameRef = useRef();

  useEffect(() => {
    const startTime = performance.now();
    const startValue = start;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      countRef.current = Math.round(startValue + (end - startValue) * easeOut);
      setCount(countRef.current);
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, start]);

  return count;
}

const features = [
  {
    icon: <TruckIcon className="w-8 h-8" />,
    title: 'Free Delivery',
    desc: 'For all orders over $50',
  },
  {
    icon: <ArrowPathIcon className="w-8 h-8" />,
    title: 'Easy Returns',
    desc: '30 day return policy',
  },
  {
    icon: <ShieldCheckIcon className="w-8 h-8" />,
    title: 'Secure Payment',
    desc: '100% secure transactions',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: '24/7 Support',
    desc: 'Always here to help you',
  },
];

export default function HomePage() {
  const { products, loading, error, fetchProducts } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [inView, setInView] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });
  const statsRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const productCount = useCountUp(inView ? 10000 : 0, 2000);
  const customerCount = useCountUp(inView ? 50000 : 0, 2000);
  const ratingValue = useCountUp(inView ? 48 : 0, 2000);

  useEffect(() => {
    let seconds = 45;
    let minutes = 32;
    let hours = 14;
    let days = 2;

    const interval = setInterval(() => {
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
      }
      if (minutes < 0) {
        minutes = 59;
        hours--;
      }
      if (hours < 0) {
        hours = 23;
        days--;
      }
      if (days < 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
        clearInterval(interval);
      }
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Display only top 8 products on home page
  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container-custom relative py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light border border-primary/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                🔥 Summer Collection 2026
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Shop the Best
                <span className="block text-primary mt-1">Deals Online</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
                Discover thousands of products across electronics, fashion, home & sports — at prices you'll love.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary flex items-center gap-2 group">
                  Shop Now
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/products" className="btn-outline border-white/30 text-white hover:bg-white hover:text-dark">
                  View Catalog
                </Link>
              </div>
              {/* Stats */}
              <div ref={statsRef} className="flex gap-8 mt-12 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {(productCount / 1000).toFixed(1)}K+
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {(customerCount / 1000).toFixed(1)}K+
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {(ratingValue / 10).toFixed(1)}★
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">Rating</div>
                </div>
              </div>
            </div>
            {/* Hero image */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/30 rounded-3xl blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
                  alt="Shopping"
                  className="relative rounded-3xl w-full h-full object-cover shadow-2xl"
                />
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white text-dark rounded-2xl p-3 shadow-xl flex items-center gap-2 text-sm font-semibold">
                  ⚡ Flash Sale
                  <span className="text-primary font-bold">30% OFF</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white text-dark rounded-2xl p-3 shadow-xl">
                  <div className="text-xs text-gray-medium">Today's Deals</div>
                  <div className="font-bold text-primary text-sm">✅ 200+ Items</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-custom py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-10 bg-primary rounded-sm" />
              <span className="text-sm font-semibold text-primary">Categories</span>
            </div>
            <h2 className="section-title">Browse By Category</h2>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-dark hover:text-primary transition-colors">
            View all <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth">
            {categories.slice(0, 8).map((cat, index) => (
              <Link
                key={cat._id}
                to={`/products?category=${cat.name}`}
                className="group flex-shrink-0 w-40 sm:w-44 md:w-48 bg-white rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 hover:border-primary/30 snap-start"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm border border-gray-100">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-gray-400 uppercase">{cat.name.substring(0, 2)}</span>
                  )}
                </div>
                <span className="text-sm font-semibold text-dark block mb-1">{cat.name}</span>
                <span className="text-xs text-gray-medium bg-gray-50 px-2 py-0.5 rounded-full">{cat.productCount || 0} items</span>
              </Link>
            ))}
          </div>
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-16 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="pb-16">
        <div className="container-custom mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-5 h-10 bg-primary rounded-sm" />
                <span className="text-sm font-semibold text-primary">This Month</span>
              </div>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link to="/products" className="flex items-center gap-2 btn-outline text-sm py-2 px-4">
              View All <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center mx-4">{error}</div>
        ) : (
          <>
            {/* Mobile/Tablet Grid */}
            <div className="block md:hidden">
              <div className="grid grid-cols-2 gap-3 px-3">
                {featuredProducts.map(product => (
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="aspect-square bg-gray-light overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-bold text-base text-dark mb-1">${product.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500 line-clamp-2 leading-tight">{product.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Grid - Responsive columns */}
            <div className="hidden lg:block container-custom mx-auto">
              <div className="grid grid-cols-4 gap-6">
                {featuredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>

            {/* Tablet Grid */}
            <div className="hidden md:block lg:hidden container-custom mx-auto">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
                {featuredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          </>
        )}

        <div className="text-center mt-8 md:hidden">
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            View All Products <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Limited Time Offer - New Design */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-dark to-gray-900 text-white py-12 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Limited Time Offer
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                Super Flash Sale
                <span className="block text-primary mt-1">50% OFF</span>
              </h2>
              
              <p className="text-gray-400 mb-8 max-w-md mx-auto lg:mx-0">
                Don't miss out on this exclusive deal! Get your favorite products at an unbeatable price. Offer ends soon.
              </p>

              {/* Animated Countdown */}
              <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
                {[
                  { value: countdown.days, label: 'Days' },
                  { value: countdown.hours, label: 'Hours' },
                  { value: countdown.minutes, label: 'Mins' },
                  { value: countdown.seconds, label: 'Secs' }
                ].map((item, idx) => (
                  <div key={item.label} className="text-center">
                    <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-3 sm:p-4 w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center shadow-lg border border-gray-700">
                      <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      {idx < 3 && (
                        <span className="absolute right-[-8px] text-primary font-bold text-lg">:</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-2 block">{item.label}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Shop Now <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
                  alt="Flash Sale"
                  className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-primary to-red-500 text-white rounded-2xl p-4 shadow-xl animate-bounce">
                  <span className="text-3xl font-extrabold">50%</span>
                  <span className="block text-xs font-medium">OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map(f => (
            <div key={f.title} className="group text-center p-6 rounded-2xl hover:bg-gray-light transition-colors duration-300">
              <div className="w-16 h-16 bg-dark text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-300">
                {f.icon}
              </div>
              <h3 className="font-bold text-dark mb-1">{f.title}</h3>
              <p className="text-sm text-gray-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container-custom text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Subscribe to Our Newsletter</h2>
          <p className="text-white/80 mb-8">Get the latest updates on new products and upcoming sales.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3.5 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-white/50 text-sm font-medium"
            />
            <button
              type="submit"
              className="bg-dark hover:bg-gray-900 text-white px-6 py-3.5 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
