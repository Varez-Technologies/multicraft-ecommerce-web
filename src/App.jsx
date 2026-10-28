import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductCatalog from './components/ProductCatalog';
import WallPreviewModal from './components/WallPreviewModal';
import CartDrawer from './components/CartDrawer';
import WhyChooseUs from './components/WhyChooseUs';
import ReviewsAndSocial from './components/ReviewsAndSocial';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';
import { initialProducts } from './data/products';
import { API_BASE_URL } from './utils/api';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'admin'
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('multicraft_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWallPreviewOpen, setIsWallPreviewOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);

  // Fetch products from backend API
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(err => {
        console.log("Using static products fallback");
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('multicraft_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (product, size, frame, itemPrice) => {
    const pId = product._id || product.id;
    const existingIndex = cartItems.findIndex(
      it => it.id === pId && it.size.id === size.id && it.frame.id === frame.id
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, {
        id: pId,
        title: product.title,
        image: product.image,
        category: product.category,
        size,
        frame,
        itemPrice,
        quantity: 1
      }]);
    }
    setIsCartOpen(true);
  };

  const handleQuickBuy = (product, size, frame, itemPrice) => {
    handleAddToCart(product, size, frame, itemPrice);
    setIsCartOpen(true);
  };

  const handleUpdateQty = (index, delta) => {
    const updated = [...cartItems];
    updated[index].quantity += delta;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCartItems(updated);
  };

  const handleRemoveItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenWallWithProduct = (prod) => {
    setPreviewProduct(prod);
    setIsWallPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#d4af37] selection:text-black">
      
      {currentView === 'admin' ? (
        <AdminDashboard 
          onBackToStore={() => setCurrentView('home')} 
          products={products}
          onUpdateProducts={setProducts}
        />
      ) : (
        <>
          {/* Navigation Bar (Clean public links only) */}
          <Navbar 
            cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWallPreview={() => {
              setPreviewProduct(products[0]);
              setIsWallPreviewOpen(true);
            }}
            onNavigate={setCurrentView}
          />

          {/* Hero Section */}
          <Hero 
            onExploreClick={() => {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenWallPreview={() => {
              setPreviewProduct(products[0]);
              setIsWallPreviewOpen(true);
            }}
          />

          {/* 4-Category Showcase */}
          <CategoryGrid 
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          {/* Main Product Catalog */}
          <ProductCatalog 
            products={products}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onAddToCart={handleAddToCart}
            onQuickBuy={handleQuickBuy}
            onOpenWallWithProduct={handleOpenWallWithProduct}
          />

          {/* Why Choose Us & Custom Art Service */}
          <WhyChooseUs />

          {/* Testimonials & Instagram Social Section */}
          <ReviewsAndSocial />

          {/* Footer (with secure owner portal access) */}
          <Footer onOpenAdminLogin={() => setIsAdminLoginOpen(true)} />

          {/* Slide-out Cart & Checkout Drawer */}
          <CartDrawer 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />

          {/* Interactive Wall Visualizer Modal */}
          <WallPreviewModal 
            isOpen={isWallPreviewOpen}
            onClose={() => setIsWallPreviewOpen(false)}
            product={previewProduct || products[0]}
            allProducts={products}
          />

          {/* Secure Admin Login Modal */}
          <AdminLoginModal 
            isOpen={isAdminLoginOpen}
            onClose={() => setIsAdminLoginOpen(false)}
            onLoginSuccess={() => setCurrentView('admin')}
          />
        </>
      )}

    </div>
  );
}
