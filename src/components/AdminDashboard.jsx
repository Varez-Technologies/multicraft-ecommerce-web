import React, { useState, useEffect } from 'react';
import { Package, Plus, Trash2, ArrowLeft, LogOut, RefreshCw, CheckCircle, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { initialProducts, categoriesList } from '../data/products';
import { NOTIFICATION_EMAIL } from '../utils/whatsapp';
import { API_BASE_URL } from '../utils/api';

export default function AdminDashboard({ onBackToStore, products, onUpdateProducts }) {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // New Product form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Motivational');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState('/products/art_1.jpg');
  const [newDesc, setNewDesc] = useState('');

  const token = localStorage.getItem('multicraft_admin_token');

  const fetchBackendOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/admin/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        // Fallback to localStorage
        const stored = JSON.parse(localStorage.getItem('multicraft_orders') || '[]');
        setOrders(stored);
      }
    } catch {
      const stored = JSON.parse(localStorage.getItem('multicraft_orders') || '[]');
      setOrders(stored);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackendOrders();
    fetchPendingReviews();
  }, []);

  const fetchPendingReviews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/reviews`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPendingReviews(data);
      }
    } catch { setPendingReviews([]); }
  };

  const handleApproveReview = async (reviewId, approved) => {
    try {
      await fetch(`${API_BASE_URL}/api/admin/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ approved })
      });
      fetchPendingReviews();
    } catch (e) { console.warn(e); }
  };

  const handleDeleteReview = async (reviewId) => {
    if (confirm("Delete this review?")) {
      try {
        await fetch(`${API_BASE_URL}/api/admin/reviews/${reviewId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchPendingReviews();
      } catch (e) { console.warn(e); }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.warn(e);
    }

    const updated = orders.map(ord => (ord._id === orderId || ord.id === orderId) ? { ...ord, status: newStatus } : ord);
    setOrders(updated);
    localStorage.setItem('multicraft_orders', JSON.stringify(updated));
  };

  const handleDeleteOrder = async (orderId) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (e) {
        console.warn(e);
      }

      const updated = orders.filter(ord => (ord._id !== orderId && ord.id !== orderId));
      setOrders(updated);
      localStorage.setItem('multicraft_orders', JSON.stringify(updated));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const newProd = {
      title: newTitle,
      category: newCategory,
      basePrice: parseInt(newPrice),
      image: newImage || '/products/art_1.jpg',
      badge: 'New Arrival',
      featured: true,
      description: newDesc || 'Handcrafted fine-art canvas frame.'
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProd)
      });
      if (res.ok) {
        const saved = await res.json();
        onUpdateProducts([saved, ...products]);
      } else {
        onUpdateProducts([{ id: Date.now(), ...newProd }, ...products]);
      }
    } catch {
      onUpdateProducts([{ id: Date.now(), ...newProd }, ...products]);
    }

    alert("Product published to MultiCraft catalog!");
    setNewTitle('');
    setNewPrice('');
    setNewDesc('');
  };

  const handleDeleteProduct = async (prodId) => {
    if (confirm("Are you sure you want to remove this product?")) {
      try {
        await fetch(`${API_BASE_URL}/api/admin/products/${prodId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (e) {
        console.warn(e);
      }

      const updated = products.filter(p => (p._id !== prodId && p.id !== prodId));
      onUpdateProducts(updated);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('multicraft_admin_token');
    onBackToStore();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      
      {/* Admin Nav */}
      <header className="sticky top-0 z-30 bg-[#121212] border-b border-[#262626] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackToStore}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1c1c] hover:bg-[#2a2a2a] text-xs font-bold text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
            <span>View Store</span>
          </button>
          <div>
            <h1 className="text-base font-black text-white flex items-center gap-2">
              <span>MultiCraft Owner Dashboard</span>
              <span className="text-[10px] bg-[#d4af37] text-black px-2 py-0.5 rounded font-bold">
                SECURE
              </span>
            </h1>
            <p className="text-[11px] text-neutral-400">Authenticated: {NOTIFICATION_EMAIL}</p>
          </div>
        </div>

        {/* Tab switchers + Logout */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders' 
                ? 'bg-[#d4af37] text-black shadow' 
                : 'bg-[#181818] text-neutral-400 hover:text-white'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'products' 
                ? 'bg-[#d4af37] text-black shadow' 
                : 'bg-[#181818] text-neutral-400 hover:text-white'
            }`}
          >
            Catalog ({products.length})
          </button>
          <button 
            onClick={() => { setActiveTab('reviews'); fetchPendingReviews(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
              activeTab === 'reviews' 
                ? 'bg-[#d4af37] text-black shadow' 
                : 'bg-[#181818] text-neutral-400 hover:text-white'
            }`}
          >
            Reviews
            {pendingReviews.filter(r => !r.approved).length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {pendingReviews.filter(r => !r.approved).length}
              </span>
            )}
          </button>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 text-xs flex items-center gap-1 cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* TAB 1: ORDERS DASHBOARD */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Live Customer Orders</h2>
                <p className="text-xs text-neutral-400">Verified orders synced with backend & database</p>
              </div>

              <button 
                onClick={fetchBackendOrders}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-xs text-neutral-300 hover:text-white cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#d4af37]' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#121212] border border-[#222]">
                <Package className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">No incoming orders yet</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  When a customer places a COD order, it will appear here in real time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const oId = order._id || order.id || order.orderNumber;
                  return (
                    <div 
                      key={oId}
                      className="p-5 rounded-2xl bg-[#121212] border border-[#262626] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-white">Order #{order.orderNumber || order.id}</span>
                          <span className="text-xs text-neutral-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            order.status === 'Delivered' ? 'bg-green-900/60 text-green-300 border border-green-600' :
                            order.status === 'Dispatched' ? 'bg-blue-900/60 text-blue-300 border border-blue-600' :
                            'bg-amber-900/60 text-amber-300 border border-amber-600'
                          }`}>
                            {order.status}
                          </span>
                        </div>

                        {/* Customer Info */}
                        <div className="text-xs text-neutral-300 grid sm:grid-cols-2 gap-x-6 gap-y-1">
                          <div><strong>Customer:</strong> {order.customer?.name}</div>
                          <div><strong>Phone:</strong> {order.customer?.phone}</div>
                          <div><strong>City:</strong> {order.customer?.city}</div>
                          <div><strong>Address:</strong> {order.customer?.address}</div>
                          {order.customer?.notes && (
                            <div className="sm:col-span-2 text-neutral-400">
                              <strong>Note:</strong> {order.customer.notes}
                            </div>
                          )}
                        </div>

                        {/* Items */}
                        <div className="pt-2 text-xs">
                          <span className="text-neutral-500 font-bold block mb-1">Items Ordered:</span>
                          <div className="flex flex-wrap gap-2">
                            {order.items?.map((it, idx) => (
                              <span key={idx} className="px-2.5 py-1 rounded bg-[#1c1c1c] border border-[#333] text-neutral-200">
                                {it.quantity}x {it.title} ({it.size?.label || 'A3'}, {it.frame?.name || 'Black'})
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Financials & Status Controls */}
                      <div className="flex flex-col items-end gap-3 shrink-0">
                        <div className="text-right">
                          <span className="text-[10px] text-neutral-500 uppercase">Total Amount (COD)</span>
                          <p className="text-xl font-black text-[#d4af37]">Rs. {order.total?.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <select 
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(oId, e.target.value)}
                            className="bg-[#1c1c1c] border border-[#333] rounded-lg px-2.5 py-1.5 text-xs text-white"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                          </select>

                          <button 
                            onClick={() => handleDeleteOrder(oId)}
                            className="p-1.5 rounded-lg bg-[#222] hover:bg-red-900/40 text-neutral-400 hover:text-red-400"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Add New Product Form */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-[#262626] h-fit">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#d4af37]" />
                <span>Add New Wall Art</span>
              </h3>

              <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Title</label>
                  <input 
                    type="text" 
                    required 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Nissan GTR R35 Midnight"
                    className="w-full p-2.5 rounded-xl bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Category</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#1a1a1a] border border-[#333] text-white"
                  >
                    {categoriesList.filter(c => c !== "All").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Base Price (Rs.)</label>
                  <input 
                    type="number" 
                    required 
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="e.g. 1999"
                    className="w-full p-2.5 rounded-xl bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Image Path</label>
                  <input 
                    type="text" 
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="/products/art_1.jpg"
                    className="w-full p-2.5 rounded-xl bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold mb-1">Short Description</label>
                  <textarea 
                    rows="2"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Fine art museum canvas..."
                    className="w-full p-2.5 rounded-xl bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#d4af37] hover:bg-[#e6c148] text-black font-bold transition-all shadow cursor-pointer"
                >
                  Save & Publish Product
                </button>
              </form>
            </div>

            {/* Existing Products List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-base font-bold text-white">Current Store Catalog ({products.length})</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {products.map((prod) => {
                  const pId = prod._id || prod.id;
                  return (
                    <div 
                      key={pId}
                      className="p-3 rounded-xl bg-[#141414] border border-[#222] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-lg overflow-hidden bg-black shrink-0 border border-[#333]">
                          <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] text-[#d4af37] font-semibold uppercase">{prod.category}</span>
                          <h4 className="text-xs font-bold text-white truncate max-w-[150px]">{prod.title}</h4>
                          <p className="text-xs font-bold text-neutral-300">Rs. {prod.basePrice?.toLocaleString()}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleDeleteProduct(pId)}
                        className="p-2 rounded-lg bg-[#222] hover:bg-red-900/40 text-neutral-500 hover:text-red-400 shrink-0 cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: REVIEWS MANAGER */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Customer Reviews</h2>
                <p className="text-xs text-neutral-400">Approve karo toh website par dikhega, reject karo toh hidden rahega</p>
              </div>
              <button 
                onClick={fetchPendingReviews}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-xs text-neutral-300 hover:text-white cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>

            {pendingReviews.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#121212] border border-[#222]">
                <Star className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">Koi review nahi abhi tak</h3>
                <p className="text-xs text-neutral-400 mt-1">Jab customer "Rate Us" form fill karega, yahan dikhega.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingReviews.map((rev) => (
                  <div key={rev._id} className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${rev.approved ? 'bg-[#0f1a0f] border-green-800/40' : 'bg-[#121212] border-[#262626]'}`}>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-black text-white">{rev.name}</span>
                        <span className="text-xs text-neutral-400">{rev.city}</span>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-neutral-600'}`} />
                          ))}
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${rev.approved ? 'bg-green-900/60 text-green-300 border border-green-700' : 'bg-amber-900/60 text-amber-300 border border-amber-700'}`}>
                          {rev.approved ? 'Live on Website' : 'Pending Approval'}
                        </span>
                        <span className="text-[10px] text-neutral-500">
                          {new Date(rev.createdAt).toLocaleDateString('en-PK')}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed italic">"{rev.text}"</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {rev.approved ? (
                        <button
                          onClick={() => handleApproveReview(rev._id, false)}
                          className="px-3 py-1.5 rounded-lg bg-amber-900/40 hover:bg-amber-900 border border-amber-700 text-amber-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                          <span>Hide</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApproveReview(rev._id, true)}
                          className="px-3 py-1.5 rounded-lg bg-green-900/40 hover:bg-green-900 border border-green-700 text-green-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReview(rev._id)}
                        className="p-1.5 rounded-lg bg-[#222] hover:bg-red-900/40 text-neutral-400 hover:text-red-400 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
