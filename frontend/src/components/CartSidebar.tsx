
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

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      background: 'var(--bg-card)',
      borderLeft: '1px solid var(--border)',
      zIndex: 2000,
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-10px 0 30px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2 className="serif" style={{ fontSize: '1.8rem' }}>Your Bag</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1.5rem' }}>✕</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {cartItems.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '4rem' }}>Your bag is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`} style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <img src={item.imageUrl} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1rem' }}>{item.name}</h4>
                <p style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>{item.brand}</p>
                <p style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>${item.price.toLocaleString()}</p>
              </div>
              <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', color: '#ff4444', alignSelf: 'flex-start' }}>Remove</button>
            </div>
          ))
        )}
      </div>

      <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Total</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${total.toLocaleString()}</span>
        </div>
        <button 
          onClick={onCheckout}
          disabled={cartItems.length === 0}
          style={{ 
            width: '100%', 
            background: 'var(--primary)', 
            color: 'black', 
            padding: '1.2rem', 
            border: 'none', 
            fontWeight: 'bold', 
            textTransform: 'uppercase',
            opacity: cartItems.length === 0 ? 0.5 : 1
          }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
