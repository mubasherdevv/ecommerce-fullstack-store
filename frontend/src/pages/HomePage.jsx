import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, TruckIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';
import ProductContext from '../context/ProductContext';

const categories = [
  { name: 'Electronics', icon: '📱', color: 'from-blue-50 to-blue-100', textColor: 'text-blue-700' },
  { name: 'Fashion', icon: '👗', color: 'from-pink-50 to-pink-100', textColor: 'text-pink-700' },
  { name: 'Home', icon: '🏠', color: 'from-green-50 to-green-100', textColor: 'text-green-700' },
  { name: 'Sports', icon: '⚽', color: 'from-orange-50 to-orange-100', textColor: 'text-orange-700' },
];

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

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
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
                🔥 Summer Collection 2025
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
              <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
                {[['10K+', 'Products'], ['50K+', 'Customers'], ['4.8★', 'Rating']].map(([val, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-bold text-primary">{val}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                  </div>
                ))}
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

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className={`group bg-gradient-to-br ${cat.color} rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-primary/20`}
            >
              <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">{cat.icon}</div>
              <span className={`text-sm font-semibold ${cat.textColor}`}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-custom pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-10 bg-primary rounded-sm" />
              <span className="text-sm font-semibold text-primary">This Month</span>
            </div>
            <h2 className="section-title">Featured Products</h2>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-2 btn-outline text-sm py-2 px-4">
            View All <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 sm:hidden">
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            View All Products <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-dark text-white py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-2 block">Limited Time Offer</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                Get the Latest iPhone 15 <span className="text-primary">Up to 10% off</span>
              </h2>
              <div className="flex gap-4 mb-6">
                {[['23', 'Hours'], ['05', 'Days'], ['59', 'Minutes'], ['35', 'Seconds']].map(([val, label]) => (
                  <div key={label} className="text-center">
                    <div className="bg-white text-dark text-lg font-bold w-14 h-14 rounded-xl flex items-center justify-center shadow">{val}</div>
                    <div className="text-xs text-gray-400 mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <Link to="/products?category=Electronics" className="btn-primary inline-flex items-center gap-2">
                Buy Now <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="md:col-span-2">
              <img
                src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500"
                alt="iPhone 15"
                className="w-full rounded-2xl shadow-2xl max-h-72 object-cover"
              />
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
