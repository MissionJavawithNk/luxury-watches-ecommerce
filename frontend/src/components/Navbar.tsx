import React from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onAccountClick: () => void;
  onSearch: (query: string) => void;
  user: any;
}

const Navbar = ({ cartCount, onCartClick, onAccountClick, onSearch, user }: NavbarProps) => {
  return (
    <nav className="glass" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, padding: '1rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }} className="serif">
          HOROLOGE <span style={{ color: 'var(--primary)' }}>PREMIUM</span>
        </div>
        
        <div style={{ flex: 1, margin: '0 3rem', maxWidth: '400px', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search our collection..."
            onChange={(e) => onSearch(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.6rem 1rem', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--border)', 
              color: 'white',
              borderRadius: '20px'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '2rem', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600 }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Collection</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Heritage</a>
          </div>
          
          <button 
            onClick={onAccountClick}
            style={{ background: 'none', border: 'none', color: user ? 'var(--primary)' : 'white', fontSize: '0.85rem', fontWeight: 600 }}
          >
            {user ? user.name.toUpperCase() : 'ACCOUNT'}
          </button>
          
          <button 
            onClick={onCartClick}
            style={{ background: 'var(--primary)', border: 'none', color: 'black', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem' }}
          >
            BAG ({cartCount})
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
