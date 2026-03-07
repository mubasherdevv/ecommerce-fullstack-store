import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'E-Commerce API is running' });
});

// Mock products data
const products = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'Electronics', rating: 4.5, reviews: 128, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', discount: 20 },
  { id: 2, name: 'Running Sneakers', price: 79.99, category: 'Fashion', rating: 4.3, reviews: 89, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', discount: 0 },
  { id: 3, name: 'Smart Watch', price: 199.99, category: 'Electronics', rating: 4.7, reviews: 256, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', discount: 15 },
  { id: 4, name: 'Leather Bag', price: 59.99, category: 'Fashion', rating: 4.2, reviews: 67, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', discount: 0 },
  { id: 5, name: 'Coffee Maker', price: 129.99, category: 'Home', rating: 4.6, reviews: 312, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', discount: 10 },
  { id: 6, name: 'Yoga Mat', price: 39.99, category: 'Sports', rating: 4.4, reviews: 183, image: 'https://images.unsplash.com/photo-1601925248591-58eb958e5dbb?w=400', discount: 0 },
  { id: 7, name: 'Sunglasses', price: 49.99, category: 'Fashion', rating: 4.1, reviews: 54, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', discount: 25 },
  { id: 8, name: 'Desk Lamp', price: 34.99, category: 'Home', rating: 4.3, reviews: 97, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', discount: 0 },
];

app.get('/api/products', (req, res) => {
  const { category, minPrice, maxPrice, sort } = req.query;
  let filtered = [...products];

  if (category) filtered = filtered.filter(p => p.category === category);
  if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
  if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  res.json(filtered);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
