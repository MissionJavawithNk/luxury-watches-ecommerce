
interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onAccountClick: () => void;
  onSearch: (query: string) => void;
  onCollectionClick: () => void;
  onHeritageClick: () => void;
  user: any;
}

const Navbar = ({ cartCount, onCartClick, onAccountClick, onSearch, onCollectionClick, onHeritageClick, user }: NavbarProps) => {
  return (
    <nav className="glass" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, height: '44px', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div 
          onClick={onCollectionClick}
          style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '-0.02em', cursor: 'pointer' }}
        >
          HOROLOGE
        </div>
        
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <span 
            onClick={onCollectionClick} 
            style={{ color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 400, opacity: 0.8 }}
            className="nav-link"
          >
            Collection
          </span>
          <span 
            onClick={onHeritageClick} 
            style={{ color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 400, opacity: 0.8 }}
            className="nav-link"
          >
            Heritage
          </span>
          <div style={{ position: 'relative', width: '150px' }}>
            <input 
              type="text" 
              placeholder="Search"
              onChange={(e) => onSearch(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.4rem 0.8rem', 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--text-main)',
                fontSize: '0.75rem',
                borderBottom: '1px solid rgba(0,0,0,0.1)'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button 
            onClick={onAccountClick}
            style={{ background: 'none', border: 'none', color: user ? 'var(--primary)' : 'var(--text-main)', fontSize: '0.75rem', fontWeight: 400, opacity: 0.8 }}
          >
            {user ? user.name.toUpperCase() : 'Sign In'}
          </button>
          
          <button 
            onClick={onCartClick}
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.75rem', position: 'relative' }}
          >
            Bag <span style={{ fontSize: '0.6rem', position: 'absolute', top: '-5px', right: '-10px', background: 'var(--text-main)', color: 'white', padding: '1px 4px', borderRadius: '10px' }}>{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
