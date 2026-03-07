import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  StarIcon, HeartIcon, ShoppingCartIcon, TruckIcon,
  ShieldCheckIcon, ArrowLeftIcon, ShareIcon, CheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const allProducts = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'Electronics', rating: 4.5, reviews: 128, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', discount: 20, description: 'Premium wireless headphones with active noise cancellation. Enjoy crystal-clear audio with 40-hour battery life and foldable design for portability. Bluetooth 5.0 ensures stable connectivity up to 30 meters.', colors: ['Black', 'White', 'Blue'] },
  { id: 2, name: 'Running Sneakers', price: 79.99, category: 'Fashion', rating: 4.3, reviews: 89, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', discount: 0, description: 'Lightweight running sneakers with advanced cushioning technology. Breathable mesh upper keeps feet cool during long runs. Available in multiple colorways.', colors: ['Red/White', 'Black/Blue', 'Grey'] },
  { id: 3, name: 'Smart Watch', price: 199.99, category: 'Electronics', rating: 4.7, reviews: 256, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', discount: 15, description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery. Tracks heart rate, sleep, blood oxygen, and 50+ workout modes. Water-resistant to 50 meters.', colors: ['Black', 'Silver', 'Gold'] },
  { id: 4, name: 'Leather Bag', price: 59.99, category: 'Fashion', rating: 4.2, reviews: 67, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600', discount: 0, description: 'Genuine leather tote bag with multiple compartments. Durable, stylish and perfect for everyday use or business meetings.', colors: ['Brown', 'Black', 'Tan'] },
  { id: 5, name: 'Coffee Maker', price: 129.99, category: 'Home', rating: 4.6, reviews: 312, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600', discount: 10, description: 'Programmable 12-cup coffee maker with built-in grinder and thermal carafe. Brew the perfect cup every time with customizable strength settings.', colors: ['Black', 'Stainless'] },
  { id: 6, name: 'Yoga Mat', price: 39.99, category: 'Sports', rating: 4.4, reviews: 183, image: 'https://images.unsplash.com/photo-1601925248591-58eb958e5dbb?w=600', discount: 0, description: 'Non-slip, eco-friendly yoga mat with alignment marks. 6mm thick for optimal cushioning. Includes carrying strap.', colors: ['Purple', 'Blue', 'Green', 'Pink'] },
  { id: 7, name: 'Sunglasses', price: 49.99, category: 'Fashion', rating: 4.1, reviews: 54, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600', discount: 25, description: 'UV400 protection polarized sunglasses in a timeless aviator design. Lightweight stainless steel frame.', colors: ['Gold/Brown', 'Silver/Grey', 'Black'] },
  { id: 8, name: 'Desk Lamp', price: 34.99, category: 'Home', rating: 4.3, reviews: 97, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600', discount: 0, description: 'LED desk lamp with 5 color modes, 10 brightness levels, and USB charging port. Eye-care technology reduces flicker for long study sessions.', colors: ['White', 'Black', 'Silver'] },
];

const extraImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=120',
  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=120',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=120',
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = allProducts.find(p => p.id === Number(id)) || allProducts[0];

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating));

  const thumbnails = [product.image, ...extraImages.slice(0, 3)];

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-medium mb-6 flex-wrap">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-dark font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-medium hover:text-primary transition-colors mb-6"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-light">
            <img
              src={thumbnails[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-3">
            {thumbnails.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                  selectedImage === i ? 'border-primary shadow-md scale-105' : 'border-gray-light hover:border-gray-medium'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Category */}
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">{product.category}</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-dark mb-3 leading-tight">{product.name}</h1>

          {/* Rating & reviews */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex">
              {stars.map((filled, i) => (
                filled
                  ? <StarSolid key={i} className="w-4 h-4 text-yellow-400" />
                  : <StarIcon key={i} className="w-4 h-4 text-gray-300" />
              ))}
            </div>
            <span className="text-sm text-gray-medium">({product.reviews} reviews)</span>
            <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
              <CheckIcon className="w-4 h-4" /> In Stock
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-extrabold text-primary">${discountedPrice}</span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-gray-medium line-through">${product.price.toFixed(2)}</span>
                <span className="badge bg-primary text-white">{product.discount}% OFF</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-medium text-sm leading-relaxed mb-6 border-b border-gray-100 pb-6">
            {product.description}
          </p>

          {/* Color selector */}
          {product.colors && (
            <div className="mb-6">
              <label className="text-sm font-semibold text-dark mb-3 block">
                Color: <span className="text-primary">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg text-sm border-2 transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-primary bg-primary/5 text-primary font-semibold'
                        : 'border-gray-200 text-gray-medium hover:border-gray-medium hover:text-dark'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to cart */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Quantity stepper */}
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-3 text-lg font-bold hover:bg-gray-light transition-colors"
              >
                −
              </button>
              <span className="px-5 py-3 text-base font-semibold min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 py-3 text-lg font-bold hover:bg-primary hover:text-white transition-colors"
              >
                +
              </button>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                added
                  ? 'bg-green-500 text-white scale-105'
                  : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setWished(!wished)}
              className={`p-3.5 rounded-xl border-2 transition-all duration-200 ${
                wished ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-medium hover:border-primary hover:text-primary'
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

          {/* Delivery info */}
          <div className="space-y-3 bg-gray-light rounded-2xl p-5">
            <div className="flex items-center gap-3 text-sm">
              <TruckIcon className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <span className="font-semibold text-dark">Free Delivery</span>
                <span className="text-gray-medium"> — Estimated 3-5 business days</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheckIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <span className="font-semibold text-dark">30-Day Return</span>
                <span className="text-gray-medium"> — Free & easy returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-10 bg-primary rounded-sm" />
            <h2 className="text-xl font-bold text-dark">Related Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
