import React from 'react';

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
}

const ProductCard = ({ watch, onAddToCart }: ProductCardProps) => {
  return (
    <div className="watch-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '1rem', transition: 'transform 0.3s ease' }}>
      <div style={{ overflow: 'hidden', marginBottom: '1.5rem', height: '300px' }}>
        <img 
          src={watch.imageUrl} 
          alt={watch.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>
          {watch.brand}
        </p>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{watch.name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{watch.category}</p>
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>${watch.price.toLocaleString()}</p>
        <button 
          onClick={() => onAddToCart(watch)}
          style={{ 
            marginTop: '1.5rem', 
            width: '100%', 
            background: 'var(--primary)', 
            color: 'black', 
            border: 'none', 
            padding: '0.8rem', 
            textTransform: 'uppercase', 
            fontSize: '0.8rem', 
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
          Add to Bag
        </button>
        <button style={{ 
          width: '100%', 
          background: 'transparent', 
          color: 'white', 
          border: '1px solid var(--border)', 
          padding: '0.8rem', 
          textTransform: 'uppercase', 
          fontSize: '0.8rem', 
          fontWeight: 'bold' 
        }}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
