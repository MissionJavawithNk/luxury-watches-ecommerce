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

const FALLBACK: Watch[] = [
  { id: 1, name: 'Submariner', brand: 'Rolex', price: 12500, category: 'Diver', imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Speedmaster', brand: 'Omega', price: 6400, category: 'Chronograph', imageUrl: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Nautilus', brand: 'Patek Philippe', price: 85000, category: 'Luxury', imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Royal Oak', brand: 'Audemars Piguet', price: 45000, category: 'Luxury', imageUrl: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&q=80&w=800' },
  { id: 5, name: 'Portugieser', brand: 'IWC', price: 9800, category: 'Dress', imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800' },
  { id: 6, name: 'Reverso', brand: 'Jaeger-LeCoultre', price: 11200, category: 'Dress', imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800' },
  { id: 7, name: 'Seamaster 300', brand: 'Omega', price: 5200, category: 'Diver', imageUrl: 'https://images.unsplash.com/photo-1548171916-c0dea76c7817?auto=format&fit=crop&q=80&w=800' },
  { id: 8, name: 'Black Bay', brand: 'Tudor', price: 3800, category: 'Diver', imageUrl: 'https://images.unsplash.com/photo-1622434641406-a15812345ad1?auto=format&fit=crop&q=80&w=800' },
  { id: 9, name: 'Daytona', brand: 'Rolex', price: 35000, category: 'Chronograph', imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800' },
  { id: 10, name: 'Carrera', brand: 'TAG Heuer', price: 4200, category: 'Chronograph', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' },
  { id: 11, name: 'Overseas', brand: 'Vacheron Constantin', price: 22000, category: 'Luxury', imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800' },
  { id: 12, name: 'Calatrava', brand: 'Patek Philippe', price: 21000, category: 'Dress', imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800' },
];

const categories = ['All', 'Diver', 'Chronograph', 'Luxury', 'Dress'];

function App() {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [filteredWatches, setFilteredWatches] = useState<Watch[]>([]);
  const [cartItems, setCartItems] = useState<Watch[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:8080/api/watches')
      .then(res => res.json())
      .then(data => { setWatches(data); setFilteredWatches(data); })
      .catch(() => { setWatches(FALLBACK); setFilteredWatches(FALLBACK); });
  }, []);

  const handleSearch = (query: string) => {
    const q = query.toLowerCase();
    setFilteredWatches(watches.filter(w =>
      w.name.toLowerCase().includes(q) || w.brand.toLowerCase().includes(q) || w.category.toLowerCase().includes(q)
    ));
    setActiveCategory('All');
  };

  const filterByCategory = (cat: string) => {
    setActiveCategory(cat);
    setFilteredWatches(cat === 'All' ? watches : watches.filter(w => w.category === cat));
    
    // Scroll to collection smoothly
    setTimeout(() => {
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const addToCart = (watch: Watch) => { setCartItems([...cartItems, watch]); setIsCartOpen(true); };
  const removeFromCart = (id: number) => {
    const idx = cartItems.findIndex(i => i.id === id);
    if (idx > -1) { const c = [...cartItems]; c.splice(idx, 1); setCartItems(c); }
  };

  const handleCheckout = () => {
    if (!user) { setIsLoginOpen(true); return; }
    const orderData = {
      customerName: user.name, customerEmail: user.email,
      totalAmount: cartItems.reduce((s, i) => s + i.price, 0),
      watchIds: cartItems.map(i => i.id)
    };
    fetch('http://localhost:8080/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderData) })
      .then(res => res.json())
      .then(() => { alert(`Thank you ${user.name}! Your order has been placed.`); setCartItems([]); setIsCartOpen(false); })
      .catch(() => alert('Checkout failed. Please try again.'));
  };

  return (
    <div style={{ background: 'var(--bg-body)', minHeight: '100vh' }}>
      <Navbar
        cartCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onAccountClick={() => !user && setIsLoginOpen(true)}
        onSearch={handleSearch}
        onCollectionClick={() => { setSelectedWatch(null); filterByCategory('All'); }}
        onHeritageClick={() => { setSelectedWatch(null); setTimeout(() => document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
        user={user}
      />

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} onRemove={removeFromCart} onCheckout={handleCheckout} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={(u) => setUser(u)} />

      {selectedWatch ? (
        <ProductDetail watch={selectedWatch} onBack={() => setSelectedWatch(null)} onAddToCart={addToCart} />
      ) : (
        <>
          {/* ── HERO ── */}
          <Hero onExploreClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} onHeritageClick={() => document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' })} />

          {/* ── MARQUEE TICKER ── */}
          <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '0.8rem 0', overflow: 'hidden', background: 'var(--bg-section)' }}>
            <div className="marquee-track">
              {[...Array(2)].map((_, i) =>
                ['Rolex · Submariner', 'Patek Philippe · Nautilus', 'Audemars Piguet · Royal Oak', 'Omega · Speedmaster', 'IWC · Portugieser', 'Jaeger-LeCoultre · Reverso', 'Vacheron Constantin · Overseas'].map((name, j) => (
                  <span key={`${i}-${j}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '2rem', marginRight: '2rem' }}>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>{name}</span>
                    <span style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>◆</span>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* ── CATEGORY CARDS ── */}
          <section style={{ padding: '6rem 0 4rem', background: 'var(--bg-body)' }}>
            <div className="container">
              <div style={{ marginBottom: '3rem' }}>
                <p className="overline" style={{ marginBottom: '0.8rem' }}>The Departments</p>
                <h2 className="serif" style={{ fontSize: '3rem', fontWeight: 300 }}>Curated Masterpieces</h2>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {[
                  { id: 'All', name: 'All Collections', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1000' },
                  { id: 'Diver', name: 'Diver', img: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1000' },
                  { id: 'Chronograph', name: 'Chronograph', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1000' },
                  { id: 'Luxury', name: 'Luxury', img: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&q=80&w=1000' }
                ].map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => filterByCategory(cat.id)}
                    className="watch-card"
                    style={{ 
                      height: '400px', 
                      position: 'relative', 
                      cursor: 'pointer',
                      border: activeCategory === cat.id ? '1px solid var(--gold)' : '1px solid var(--border-subtle)'
                    }}
                  >
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                      <img 
                        src={cat.img} 
                        alt={cat.name} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          opacity: activeCategory === cat.id ? 0.8 : 0.5,
                          transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,13,0.9) 0%, transparent 70%)' }} />
                    </div>
                    
                    <div style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', zIndex: 2 }}>
                      <p className="overline" style={{ color: 'var(--gold)', marginBottom: '0.4rem', fontSize: '0.55rem' }}>{cat.id === 'All' ? 'View' : 'Explore'}</p>
                      <h3 className="serif" style={{ fontSize: '2rem', color: 'var(--text-main)', fontWeight: 300 }}>{cat.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── COLLECTION ── */}
          <section id="collection" style={{ padding: '2rem 0 8rem', background: 'var(--bg-body)' }}>
            <div className="container">
              <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p className="overline" style={{ marginBottom: '0.8rem' }}>Curated Selection</p>
                  <h2 className="serif" style={{ fontSize: '3.5rem', fontWeight: 300 }}>The Collection</h2>
                </div>
                <p style={{ color: 'var(--text-subtle)', fontSize: '0.8rem', letterSpacing: '1px' }}>{filteredWatches.length} Timepieces</p>
              </div>

              {filteredWatches.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '8rem 0' }}>
                  <p className="serif" style={{ fontSize: '2rem', color: 'var(--text-muted)' }}>No timepieces found</p>
                </div>
              ) : (
                <div className="collection-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                  {filteredWatches.map((watch, i) => (
                    <div key={watch.id} className="slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
                      <ProductCard watch={watch} onAddToCart={addToCart} onViewDetails={(w) => setSelectedWatch(w)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ── BRAND PHILOSOPHY ── */}
          <section style={{ padding: '8rem 0', background: 'var(--bg-section)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
                <div>
                  <p className="overline" style={{ marginBottom: '1.5rem' }}>Our Philosophy</p>
                  <h2 className="serif" style={{ fontSize: '3.5rem', fontWeight: 300, lineHeight: 1.1, marginBottom: '2rem' }}>
                    Time is the only<br /><em style={{ color: 'var(--gold)' }}>true luxury.</em>
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.9, maxWidth: '420px' }}>
                    Every timepiece in our collection is the result of generations of mastery. We partner exclusively with the world's most celebrated maisons to bring you watches that transcend time.
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {[
                    { icon: '◈', title: 'Global Concierge', desc: 'Personalized horological guidance, 24/7 worldwide.' },
                    { icon: '◇', title: 'Authenticated', desc: 'Every timepiece rigorously certified by master watchmakers.' },
                    { icon: '◆', title: 'White-Glove Delivery', desc: 'Bespoke packaging, insured and delivered with ceremony.' },
                    { icon: '○', title: 'Lifetime Service', desc: 'Complimentary servicing for every acquisition.' },
                  ].map(item => (
                    <div key={item.title} className="glass" style={{ padding: '2rem', transition: 'border-color 0.3s' }}
                      onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(184,150,90,0.4)')}
                      onMouseOut={(e) => (e.currentTarget.style.borderColor = 'rgba(184,150,90,0.15)')}>
                      <span style={{ fontSize: '1.2rem', color: 'var(--gold)', display: 'block', marginBottom: '1rem' }}>{item.icon}</span>
                      <h4 style={{ fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '0.6rem', color: 'var(--text-main)' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── TESTIMONIALS ── */}
          <section id="heritage" style={{ padding: '8rem 0', background: 'var(--bg-body)' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <p className="overline" style={{ marginBottom: '1rem' }}>Collector Voices</p>
                <h2 className="serif" style={{ fontSize: '3rem', fontWeight: 300 }}>The Connoisseurs</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                {[
                  { quote: '"The acquisition of my Patek Philippe through Horologe was seamless. Their attention to heritage documentation is unmatched in the industry."', name: 'Julian V.', location: 'Geneva' },
                  { quote: '"Finally, a platform that understands the soul of a timepiece. The curated selection is a testament to their horological expertise and taste."', name: 'Marcus T.', location: 'London' },
                  { quote: '"From first inquiry to white-glove delivery — a buying experience befitting the watch itself. Truly the pinnacle of luxury retail."', name: 'Isabelle C.', location: 'Paris' },
                ].map((t, i) => (
                  <div key={i} className="glass" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', transition: 'border-color 0.3s' }}
                    onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(184,150,90,0.4)')}
                    onMouseOut={(e) => (e.currentTarget.style.borderColor = 'rgba(184,150,90,0.15)')}>
                    <span style={{ color: 'var(--gold)', fontSize: '2rem', lineHeight: 1, fontFamily: 'Georgia' }}>"</span>
                    <p className="serif-italic" style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, flexGrow: 1 }}>{t.quote}</p>
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.2rem' }}>
                      <p style={{ fontSize: '0.7rem', letterSpacing: '2px', color: 'var(--text-main)', textTransform: 'uppercase' }}>{t.name}</p>
                      <p style={{ fontSize: '0.65rem', letterSpacing: '1px', color: 'var(--gold)', marginTop: '0.2rem' }}>{t.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', background: 'var(--bg-section)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p className="serif" style={{ fontSize: '1.6rem', letterSpacing: '4px', color: 'var(--text-main)', textTransform: 'uppercase' }}>Horologe</p>
                <p style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--gold)', marginTop: '0.3rem' }}>Premium Timepieces · Est. 1887</p>
              </div>
              <p style={{ color: 'var(--text-subtle)', fontSize: '0.7rem', letterSpacing: '1px' }}>© 2026 Horologe. All Rights Reserved.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
