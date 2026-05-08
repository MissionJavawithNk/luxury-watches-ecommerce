import React from 'react';

const Hero = () => {
  return (
    <section style={{ height: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Est. 1884
          </h2>
          <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '2rem' }}>
            Precision in <br />
            <span className="premium-gradient">Every Second</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '500px' }}>
            Discover our curated collection of world-class timepieces, where heritage meets modern craftsmanship.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button style={{ 
              background: 'var(--primary)', 
              color: 'black', 
              padding: '1rem 2.5rem', 
              border: 'none', 
              fontWeight: 'bold', 
              textTransform: 'uppercase' 
            }}>
              Explore Collection
            </button>
            <button style={{ 
              background: 'transparent', 
              color: 'white', 
              padding: '1rem 2.5rem', 
              border: '1px solid var(--border)', 
              fontWeight: 'bold', 
              textTransform: 'uppercase' 
            }}>
              Our Heritage
            </button>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <img 
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1200" 
            alt="Luxury Watch" 
            style={{ width: '100%', height: 'auto', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
          />
          <div style={{ 
            position: 'absolute', 
            bottom: '-20px', 
            right: '-20px', 
            background: 'var(--bg-card)', 
            padding: '2rem', 
            border: '1px solid var(--border)' 
          }}>
            <p style={{ fontSize: '1.5rem' }} className="serif">Limited Edition</p>
            <p style={{ color: 'var(--primary)' }}>Available Now</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
