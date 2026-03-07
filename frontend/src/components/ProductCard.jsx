import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating));

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="card">
        {/* Image wrapper */}
        <div className="relative aspect-square bg-gray-light overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.discount > 0 && (
              <span className="badge bg-primary text-white">-{product.discount}%</span>
            )}
            {product.isNew && (
              <span className="badge bg-secondary text-dark">NEW</span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={e => { e.preventDefault(); setWished(!wished); }}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Add to wishlist"
          >
            <HeartIcon className={`w-4 h-4 transition-colors ${wished ? 'fill-primary text-primary' : 'text-dark'}`} />
          </button>

          {/* Add to Cart overlay */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-dark text-white hover:bg-primary'
              }`}
            >
              <ShoppingCartIcon className="w-4 h-4" />
              {added ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-gray-medium mb-1 uppercase tracking-wide">{product.category}</p>
          <h3 className="font-semibold text-dark text-sm leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary font-bold">
              ${discountedPrice || product.price.toFixed(2)}
            </span>
            {discountedPrice && (
              <span className="text-sm text-gray-medium line-through">${product.price.toFixed(2)}</span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {stars.map((filled, i) => (
                filled
                  ? <StarSolid key={i} className="w-3.5 h-3.5 text-yellow-400" />
                  : <StarIcon key={i} className="w-3.5 h-3.5 text-gray-300" />
              ))}
            </div>
            <span className="text-xs text-gray-medium">({product.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
