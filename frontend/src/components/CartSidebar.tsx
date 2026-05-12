interface Watch {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Watch[];
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

const CartSidebar = ({ isOpen, onClose, cartItems, onRemove, onCheckout }: CartSidebarProps) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1999, backdropFilter: 'blur(4px)', transition: 'opacity 0.3s' }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0,
        width: '420px', height: '100vh',
        background: '#0f0f0f',
        borderLeft: '1px solid var(--border)',
        zIndex: 2000,
        display: 'flex', flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.5)'
      }}>

        {/* Header */}
        <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p className="overline" style={{ marginBottom: '0.3rem', fontSize: '0.6rem' }}>Your Selection</p>
            <h2 className="serif" style={{ fontSize: '1.8rem', fontWeight: 300 }}>The Bag</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', width: '36px', height: '36px', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s', borderRadius: '2px' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem' }}>
              <span style={{ fontSize: '2rem', color: 'var(--border)' }}>◇</span>
              <p className="serif" style={{ color: 'var(--text-subtle)', fontSize: '1.2rem' }}>Your bag is empty</p>
              <p style={{ color: 'var(--text-subtle)', fontSize: '0.75rem', letterSpacing: '1px' }}>Explore our collection above</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ width: '80px', height: '80px', overflow: 'hidden', flexShrink: 0, background: '#0a0a0a' }}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.6rem', letterSpacing: '2px', color: 'var(--gold)', marginBottom: '0.3rem' }}>{item.brand.toUpperCase()}</p>
                  <h4 className="serif" style={{ fontSize: '1.1rem', fontWeight: 300, marginBottom: '0.4rem' }}>{item.name}</h4>
                  <p className="serif" style={{ fontSize: '1rem', color: 'var(--text-main)' }}>${item.price.toLocaleString()}</p>
                </div>
                <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', fontSize: '0.6rem', letterSpacing: '1px', cursor: 'pointer', alignSelf: 'flex-start', padding: '0.2rem', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#c0392b'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-subtle)'}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>Total</span>
            <span className="serif" style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-main)' }}>${total.toLocaleString()}</span>
          </div>
          <button
            className="btn-primary"
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            style={{ width: '100%', padding: '1rem', opacity: cartItems.length === 0 ? 0.4 : 1, cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer' }}
          >
            <span>Proceed to Checkout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
