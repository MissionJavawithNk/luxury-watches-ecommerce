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
    <div className="watch-card" style={{ padding: '2rem', textAlign: 'center', cursor: 'pointer' }} onClick={() => onViewDetails(watch)}>
      <div style={{ overflow: 'hidden', marginBottom: '2rem', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src={watch.imageUrl} 
          alt={watch.name} 
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.5s ease' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      <div>
        <p style={{ color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
          {watch.brand}
        </p>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.5rem' }}>{watch.name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{watch.category}</p>
        <p style={{ fontSize: '1.2rem', fontWeight: 400, marginBottom: '1.5rem' }}>From ${watch.price.toLocaleString()}</p>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(watch);
          }}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#0066cc', 
            fontSize: '0.9rem', 
            cursor: 'pointer',
            padding: '0.5rem 1rem'
          }}
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
