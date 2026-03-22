import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  StarIcon, HeartIcon, ShoppingCartIcon, TruckIcon,
  ShieldCheckIcon, ArrowLeftIcon, ShareIcon, CheckIcon,
  EyeIcon, ArrowRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ProductContext from '../context/ProductContext';

const extraImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=120',
  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=120',
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { product, products, loading, error, fetchProductDetails, fetchProducts } = useContext(ProductContext);

  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [imageZoom, setImageZoom] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchProductDetails(id);
    fetchProducts();
    setQuantity(1);
    setSelectedImage(0);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (products.length > 0) {
      setAllProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const filtered = stored.filter(p => p._id !== product._id);
      const updated = [product, ...filtered].slice(0, 8);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      setRecentlyViewed(updated.slice(1));
    }
  }, [product]);

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-24 text-center">
        <div className="bg-red-50 text-red-500 p-6 rounded-xl inline-block">
          <h2 className="text-xl font-bold mb-2">Error Loading Product</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/products')} className="mt-4 btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const discountedPrice = product.originalPrice && product.originalPrice > product.price
    ? product.price.toFixed(2)
    : product.price.toFixed(2);

  const discountDisplay = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = allProducts.filter(p => p.category === product.category && p._id !== product._id).slice(0, 8);
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating || 0));

  const thumbnails = [product.image, ...extraImages];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-dark hover:text-primary transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-semibold text-dark truncate max-w-[200px]">{product.name}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWished(!wished)}
            className={`p-2 rounded-full transition-colors ${wished ? 'text-primary' : 'text-gray-medium'
              }`}
          >
            <HeartIcon className={`w-5 h-5 ${wished ? 'fill-primary' : ''}`} />
          </button>
          <button className="p-2 text-gray-medium">
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="container-custom py-4 lg:py-8">
        {/* Breadcrumb - Desktop only */}
        <nav className="hidden lg:flex items-center gap-2 text-sm text-gray-medium mb-6 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-dark font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 mb-12 lg:mb-16">
          {/* Image Gallery */}
          <div className="space-y-3 lg:space-y-4">
            {/* Main image */}
            <div
              className="aspect-square rounded-2xl overflow-hidden bg-gray-200 relative"
              onClick={() => setImageZoom(!imageZoom)}
            >
              <img
                src={thumbnails[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${imageZoom ? 'scale-125' : ''}`}
              />
              {/* Discount badge */}
              {discountDisplay > 0 && (
                <span className="absolute top-3 left-3 badge bg-primary text-white">
                  -{discountDisplay}%
                </span>
              )}
              {/* Mobile image counter */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full lg:hidden">
                {selectedImage + 1}/{thumbnails.length}
              </div>
            </div>

            {/* Thumbnails - Hidden on mobile, shown on tablet+ */}
            <div className="hidden sm:flex gap-3">
              {thumbnails.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${selectedImage === i ? 'border-primary shadow-md scale-105' : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Mobile thumbnail scroll */}
            <div className="flex sm:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {thumbnails.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${selectedImage === i ? 'border-primary' : 'border-gray-200'
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col bg-white rounded-2xl lg:rounded-none lg:bg-transparent p-4 lg:p-0 shadow-sm lg:shadow-none">
            {/* Category */}
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">{product.category}</span>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-dark mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating & reviews */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <div className="flex">
                {stars.map((filled, i) => (
                  filled
                    ? <StarSolid key={i} className="w-4 h-4 text-yellow-400" />
                    : <StarIcon key={i} className="w-4 h-4 text-gray-300" />
                ))}
              </div>
              <span className="text-sm text-gray-medium">({product.numReviews || 0})</span>

              {product.countInStock > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <CheckIcon className="w-3.5 h-3.5" /> {product.countInStock} Stock Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold bg-red-100 text-red-600 px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 sm:gap-3 mb-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-primary">${discountedPrice}</span>
              {discountDisplay > 0 && (
                <>
                  <span className="text-base sm:text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="badge bg-primary text-white text-xs sm:text-sm">-{discountDisplay}%</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-medium text-sm leading-relaxed mb-5 pb-5 border-b border-gray-100">
              {product.description}
            </p>

            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <label className="text-sm font-semibold text-dark mb-2 block">
                  Color: <span className="text-primary">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm border-2 transition-all duration-200 ${selectedColor === color
                        ? 'border-primary bg-primary/5 text-primary font-semibold'
                        : 'border-gray-200 text-gray-medium hover:border-gray-300 hover:text-dark'
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
              {/* Quantity stepper */}
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden w-fit">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors"
                  disabled={product.countInStock === 0}
                >
                  −
                </button>
                <span className="px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.countInStock, q + 1))}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg font-bold hover:bg-primary hover:text-white transition-colors"
                  disabled={product.countInStock === 0 || quantity >= product.countInStock}
                >
                  +
                </button>
              </div>

              {/* Add to cart - Full width on mobile */}
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${product.countInStock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : added
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
              >
                <ShoppingCartIcon className="w-5 h-5" />
                {product.countInStock === 0 ? 'Out of Stock' : added ? '✓ Added!' : 'Add to Cart'}
              </button>

              {/* Wishlist & Share - Desktop only */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => setWished(!wished)}
                  className={`p-3.5 rounded-xl border-2 transition-all duration-200 ${wished ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-medium hover:border-primary hover:text-primary'
                    }`}
                  aria-label="Add to wishlist"
                >
                  <HeartIcon className={`w-5 h-5 ${wished ? 'fill-primary' : ''}`} />
                </button>

                <button
                  className="p-3.5 rounded-xl border-2 border-gray-200 text-gray-medium hover:border-primary hover:text-primary transition-all duration-200"
                  aria-label="Share"
                >
                  <ShareIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Delivery info */}
            <div className="space-y-2 sm:space-y-3 bg-gray-50 lg:bg-gray-100 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <TruckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <div>
                  <span className="font-semibold text-dark">Free Delivery</span>
                  <span className="text-gray-500"> — 3-5 business days</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-dark">30-Day Return</span>
                  <span className="text-gray-500"> — Free & easy</span>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Related Products */}
        <section className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-200 pb-32 lg:pb-0">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-4 h-8 lg:w-5 lg:h-10 bg-primary rounded-sm" />
              <div>
                <h2 className="text-base lg:text-lg sm:text-xl font-bold text-dark">Related Products</h2>
                {related.length > 0 && (
                  <p className="text-xs text-gray-medium">{related.length} products in {product.category}</p>
                )}
              </div>
            </div>
            {related.length > 0 && (
              <Link 
                to={`/products?category=${product.category}`} 
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                View All <ArrowRightIcon className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Mobile Grid - Same as Featured Products */}
          <div className="block lg:hidden">
            <div className="grid grid-cols-2 gap-3 px-3">
              {related.slice(0, 6).map(p => (
                <Link
                  key={p._id}
                  to={`/products/${p._id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="aspect-square bg-gray-light overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-base text-dark mb-1">${p.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-tight">{p.name}</p>
                  </div>
                </Link>
              ))}
            </div>
            {related.length > 0 && (
              <div className="mt-6 text-center px-3">
                <Link 
                  to={`/products?category=${product.category}`} 
                  className="btn-outline text-sm py-2.5 px-6"
                >
                  View All Related Products
                </Link>
              </div>
            )}
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-6">
              {related.slice(0, 8).map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <EyeIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-dark">Recently Viewed</h2>
                  <p className="text-xs text-gray-medium">Products you've looked at</p>
                </div>
              </div>
              <Link 
                to="/products" 
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                View All <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile/Tablet Grid */}
            <div className="block lg:hidden">
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
                {recentlyViewed.map(p => (
                  <Link
                    key={p._id}
                    to={`/products/${p._id}`}
                    className="flex-shrink-0 w-36 bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2.5">
                      <p className="font-bold text-xs text-dark mb-0.5 truncate">{p.name}</p>
                      <p className="font-semibold text-sm text-primary">${p.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                {recentlyViewed.slice(0, 6).map(p => (
                  <Link
                    key={p._id}
                    to={`/products/${p._id}`}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-bold text-sm text-dark mb-1 line-clamp-2 leading-tight">{p.name}</p>
                      <p className="font-semibold text-primary">${p.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Mobile Bottom Cart Bar */}
      {product.countInStock > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 font-bold hover:bg-gray-100 transition-colors"
              >
                −
              </button>
              <span className="px-3 py-2 font-semibold min-w-[2.5rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.countInStock, q + 1))}
                className="px-3 py-2 font-bold hover:bg-primary hover:text-white transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${added
                ? 'bg-green-500 text-white'
                : 'bg-primary text-white hover:bg-primary-dark'
                }`}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {added ? '✓ Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
