interface Watch {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface ProductCardProps {
  watch: Watch;
  onAddToCart: (watch: Watch) => void;
  onViewDetails: (watch: Watch) => void;
}

const ProductCard = ({ watch, onAddToCart, onViewDetails }: ProductCardProps) => {
  return (
    <div className="watch-card" onClick={() => onViewDetails(watch)}>
      <div style={{ 
        width: '100%', 
        height: '280px', 
        overflow: 'hidden', 
        background: '#f0eeeb',
        flexShrink: 0
      }}>
        <img 
          src={watch.imageUrl} 
          alt={watch.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            objectPosition: 'center',
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'block'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '2px', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            {watch.brand}
          </p>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '0.5rem', height: '2.4em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{watch.name}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{watch.category}</p>
        </div>
        
        <div style={{ textAlign: 'center', width: '100%' }}>
          <p style={{ fontSize: '1.4rem', fontWeight: 400, marginBottom: '1.5rem' }}>${watch.price.toLocaleString()}</p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(watch);
            }}
            style={{ 
              background: 'var(--text-main)', 
              color: 'white', 
              border: 'none', 
              fontSize: '0.8rem', 
              cursor: 'pointer',
              fontWeight: 600,
              padding: '0.8rem 2rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              width: '100%'
            }}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
