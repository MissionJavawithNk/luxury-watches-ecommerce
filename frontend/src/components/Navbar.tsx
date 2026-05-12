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
    <nav className="glass-nav" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, height: '60px', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        
        {/* Logo */}
        <div onClick={onCollectionClick} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <span className="serif" style={{ fontSize: '1.4rem', letterSpacing: '6px', color: 'var(--text-main)', textTransform: 'uppercase', lineHeight: 1 }}>
            Horologe
          </span>
          <span style={{ fontSize: '0.5rem', letterSpacing: '5px', color: 'var(--gold)', textTransform: 'uppercase', marginLeft: '2px' }}>
            Premium Timepieces
          </span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <span onClick={onCollectionClick} className="nav-link"
            style={{ color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Collection
          </span>
          <span onClick={onHeritageClick} className="nav-link"
            style={{ color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Heritage
          </span>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search timepieces..."
              onChange={(e) => onSearch(e.target.value)}
              style={{
                width: '180px',
                padding: '0.4rem 0.8rem 0.4rem 1.8rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                color: 'var(--text-main)',
                fontSize: '0.68rem',
                letterSpacing: '1px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(184,150,90,0.4)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
            />
            <span style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)', fontSize: '0.7rem' }}>⌕</span>
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button onClick={onAccountClick}
            style={{ background: 'none', border: 'none', color: user ? 'var(--gold)' : 'var(--text-muted)', fontSize: '0.68rem', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', transition: 'color 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--gold)'}
            onMouseOut={(e) => e.currentTarget.style.color = user ? 'var(--gold)' : 'var(--text-muted)'}
          >
            {user ? user.name.toUpperCase() : 'Sign In'}
          </button>

          <button onClick={onCartClick}
            style={{ background: 'none', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--text-muted)', fontSize: '0.68rem', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', padding: '0.4rem 1rem', position: 'relative', transition: 'all 0.3s ease' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(184,150,90,0.5)'; e.currentTarget.style.color = 'var(--gold)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            Bag
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--gold)', color: '#0d0d0d', fontSize: '0.55rem', fontWeight: 700, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
