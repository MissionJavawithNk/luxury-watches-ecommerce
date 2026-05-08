
interface Watch {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
}

interface ProductDetailProps {
  watch: Watch;
  onBack: () => void;
  onAddToCart: (watch: Watch) => void;
}

const ProductDetail = ({ watch, onBack, onAddToCart }: ProductDetailProps) => {
  return (
    <div className="fade-in" style={{ padding: '4rem 0' }}>
      <div className="container">
        {/* Navigation / Back Button */}
        <button 
          onClick={onBack} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-main)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '3rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          <span>←</span> Back to Collection
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6rem', alignItems: 'start' }}>
          {/* Image Gallery */}
          <div className="glass" style={{ padding: '2rem', borderRadius: '8px' }}>
            <img 
              src={watch.imageUrl} 
              alt={watch.name} 
              style={{ width: '100%', height: 'auto', borderRadius: '4px', boxShadow: 'var(--shadow)' }}
            />
          </div>

          {/* Product Info */}
          <div>
            <div style={{ marginBottom: '3rem' }}>
              <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '1rem' }}>
                {watch.brand}
              </p>
              <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{watch.name}</h1>
              <p style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '2rem' }}>${watch.price.toLocaleString()}</p>
              <div style={{ width: '60px', height: '2px', background: 'var(--primary)', marginBottom: '2rem' }}></div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                {watch.description || "An exceptional timepiece representing the pinnacle of engineering and style. Hand-assembled with precision components for the discerning collector."}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem' }}>
              <button 
                onClick={() => onAddToCart(watch)}
                style={{ 
                  flex: 1,
                  background: 'var(--primary)', 
                  color: 'black', 
                  padding: '1.2rem', 
                  border: 'none', 
                  fontWeight: 'bold', 
                  textTransform: 'uppercase',
                  fontSize: '0.9rem'
                }}
              >
                Add to Bag
              </button>
              <button 
                style={{ 
                  flex: 1,
                  background: 'transparent', 
                  color: 'var(--text-main)', 
                  padding: '1.2rem', 
                  border: '1px solid var(--border)', 
                  fontWeight: 'bold', 
                  textTransform: 'uppercase',
                  fontSize: '0.9rem'
                }}
              >
                Wishlist
              </button>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 600 }}>Reference</span>
                <span style={{ color: 'var(--text-muted)' }}>{watch.id}00-LX</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 600 }}>Category</span>
                <span style={{ color: 'var(--text-muted)' }}>{watch.category}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Availability</span>
                <span style={{ color: 'var(--primary)' }}>In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
