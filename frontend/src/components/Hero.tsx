
interface HeroProps {
  onExploreClick: () => void;
  onHeritageClick: () => void;
}

const Hero = ({ onExploreClick, onHeritageClick }: HeroProps) => {
  return (
    <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '100px', textAlign: 'center' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '4rem' }} className="fade-in">
          <h1 style={{ fontSize: '5rem', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '1.5rem', lineHeight: 1.05 }}>
            The art of precision. <br />
            <span style={{ color: 'var(--text-muted)' }}>Timeless by design.</span>
          </h1>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <button 
              onClick={onExploreClick}
              style={{ background: 'none', border: 'none', color: '#0066cc', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              Buy <span>›</span>
            </button>
            <button 
              onClick={onHeritageClick}
              style={{ background: 'none', border: 'none', color: '#0066cc', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              Learn more <span>›</span>
            </button>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', position: 'relative' }} className="fade-in">
          <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <source src="https://videos.pexels.com/video-files/32856239/14004256_1080_1920_60fps.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
