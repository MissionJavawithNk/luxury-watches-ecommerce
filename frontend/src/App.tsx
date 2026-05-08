import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import LoginModal from './components/LoginModal';
import ProductDetail from './components/ProductDetail';

interface Watch {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  category: string;
}

function App() {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [filteredWatches, setFilteredWatches] = useState<Watch[]>([]);
  const [cartItems, setCartItems] = useState<Watch[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/watches')
      .then(res => res.json())
      .then(data => {
        setWatches(data);
        setFilteredWatches(data);
      })
      .catch(err => {
        console.error("Failed to fetch watches:", err);
        const fallback = [
          { id: 1, name: "Submariner", brand: "Rolex", price: 12500, category: "Diver", imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800" },
          { id: 2, name: "Speedmaster", brand: "Omega", price: 6400, category: "Chronograph", imageUrl: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800" },
          { id: 3, name: "Nautilus", brand: "Patek Philippe", price: 85000, category: "Luxury", imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800" },
          { id: 4, name: "Royal Oak", brand: "Audemars Piguet", price: 45000, category: "Luxury", imageUrl: "https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&q=80&w=800" }
        ];
        setWatches(fallback);
        setFilteredWatches(fallback);
      });
  }, []);

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = watches.filter(w => 
      w.name.toLowerCase().includes(lowerQuery) || 
      w.brand.toLowerCase().includes(lowerQuery) ||
      w.category.toLowerCase().includes(lowerQuery)
    );
    setFilteredWatches(filtered);
  };

  const addToCart = (watch: Watch) => {
    setCartItems([...cartItems, watch]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    const index = cartItems.findIndex(item => item.id === id);
    if (index > -1) {
      const newCart = [...cartItems];
      newCart.splice(index, 1);
      setCartItems(newCart);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }

    const orderData = {
      customerName: user.name,
      customerEmail: user.email,
      totalAmount: cartItems.reduce((sum, item) => sum + item.price, 0),
      watchIds: cartItems.map(item => item.id)
    };

    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    .then(res => res.json())
    .then(() => {
      alert(`Thank you ${user.name}! Your order has been placed.`);
      setCartItems([]);
      setIsCartOpen(false);
    })
    .catch(err => {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please try again.");
    });
  };

  return (
    <div>
      <Navbar 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)} 
        onAccountClick={() => !user && setIsLoginOpen(true)}
        onSearch={handleSearch}
        onCollectionClick={() => {
          setSelectedWatch(null);
          setTimeout(() => {
            document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onHeritageClick={() => {
          setSelectedWatch(null);
          setTimeout(() => {
            document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        user={user}
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={(u) => setUser(u)} 
      />

      {selectedWatch ? (
        <ProductDetail 
          watch={selectedWatch} 
          onBack={() => setSelectedWatch(null)} 
          onAddToCart={addToCart} 
        />
      ) : (
        <>
          <Hero 
            onExploreClick={() => {
              document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onHeritageClick={() => {
              document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          
          <section id="collection" style={{ padding: '10rem 0', background: 'var(--bg-section)' }}>
            <div className="container">
              <div style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1rem' }}>The Collection</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px' }}>
                  Explore our curated selection of heritage timepieces, where every second is a testament to precision.
                </p>
              </div>
              
              {filteredWatches.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '10rem 0' }}>
                   <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No timepieces found matching your search.</p>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                  gap: '2rem' 
                }}>
                  {filteredWatches.map((watch, index) => (
                    <div key={watch.id} className="slide-up" style={{ animationDelay: `${index * 0.1}s`, background: 'var(--bg-body)', borderRadius: '12px' }}>
                      <ProductCard 
                        watch={watch} 
                        onAddToCart={addToCart} 
                        onViewDetails={(w) => setSelectedWatch(w)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <section style={{ background: 'var(--bg-card)', padding: '6rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', textAlign: 'center' }}>
          <div>
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Global Concierge</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Personalized assistance for your horological journey, available 24/7 worldwide.</p>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Certified Heritage</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Every timepiece is rigorously authenticated and comes with a lifetime guarantee.</p>
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Bespoke Delivery</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>White-glove delivery service ensuring your investment arrives in pristine condition.</p>
          </div>
        </div>
      </section>

      <section id="heritage" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>Collector Voices</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem' }}>
            <div className="glass" style={{ padding: '3rem', textAlign: 'left' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1.5rem' }}>"The acquisition of my Patek Philippe through Horologe was seamless. Their attention to detail and heritage documentation is unmatched."</p>
              <p style={{ fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '1px' }}>— JULIAN V., GENEVA</p>
            </div>
            <div className="glass" style={{ padding: '3rem', textAlign: 'left' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1.5rem' }}>"Finally, a platform that understands the soul of a timepiece. The curated selection is a testament to their horological expertise."</p>
              <p style={{ fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '1px' }}>— MARCUS T., LONDON</p>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <p className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>HOROLOGE PREMIUM</p>
          <p style={{ color: 'var(--text-muted)' }}>© 2026 Luxury Watches. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
