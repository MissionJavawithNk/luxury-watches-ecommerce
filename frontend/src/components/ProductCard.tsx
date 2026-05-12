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
      
      {/* Image */}
      <div style={{ position: 'relative', height: '300px', overflow: 'hidden', background: '#0f0f0f', flexShrink: 0 }}>
        <img
          src={watch.imageUrl}
          alt={watch.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.07)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* Category badge */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          <span style={{ fontSize: '0.55rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(13,13,13,0.85)', padding: '0.3rem 0.7rem', border: '1px solid rgba(184,150,90,0.3)' }}>
            {watch.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flex: 1, borderTop: '1px solid var(--border-subtle)' }}>
        <p className="overline" style={{ marginBottom: '0.5rem', fontSize: '0.6rem' }}>{watch.brand}</p>
        <h3 className="serif" style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--text-main)', marginBottom: '0.3rem', lineHeight: 1.1 }}>
          {watch.name}
        </h3>
        <div className="gold-line" style={{ margin: '1rem 0', marginLeft: 0 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '2px', color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Starting at</p>
            <p className="serif" style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontWeight: 300 }}>
              ${watch.price.toLocaleString()}
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={(e) => { e.stopPropagation(); onAddToCart(watch); }}
            style={{ padding: '0.7rem 1.4rem', fontSize: '0.6rem', letterSpacing: '2px' }}
          >
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
