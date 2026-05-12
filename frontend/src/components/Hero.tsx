import { useEffect, useRef } from 'react';

interface HeroProps {
  onExploreClick: () => void;
  onHeritageClick: () => void;
}

const Hero = ({ onExploreClick }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: '#080808' }}>
      
      {/* Full-bleed background video */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay loop muted playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
        >
          <source src="https://videos.pexels.com/video-files/32856239/14004256_1080_1920_60fps.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.2) 50%, rgba(8,8,8,0.95) 100%)' }} />
        {/* Subtle gold vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(8,8,8,0.7) 100%)' }} />
      </div>

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 1, paddingBottom: '8rem', paddingTop: '120px' }}>
        
        <div className="fade-in">
          <p className="overline" style={{ marginBottom: '2rem', opacity: 0.8 }}>Est. 1887 · Geneva, Switzerland</p>
          
          <h1 className="serif" style={{ fontSize: 'clamp(4rem, 9vw, 9rem)', lineHeight: 0.9, fontWeight: 300, marginBottom: '2.5rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
            The Art of<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Precision.</em>
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '400px', lineHeight: 1.7, marginBottom: '3.5rem', fontWeight: 300, letterSpacing: '0.02em' }}>
            Curated heritage timepieces for the discerning collector. Where every second is a testament to human ingenuity.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button className="btn-primary" onClick={onExploreClick}>
              <span>Explore Collection</span>
            </button>
            <button className="btn-ghost" onClick={onExploreClick} style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '2px' }}>
              View All →
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="fade-in-delay" style={{ position: 'absolute', bottom: '2.5rem', right: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-subtle)', writingMode: 'vertical-rl' }}>Scroll</span>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--gold), transparent)', animation: 'fadeIn 2s ease infinite alternate' }} />
        </div>

        {/* Stats row */}
        <div className="fade-in-delay" style={{ display: 'flex', gap: '4rem', marginTop: '5rem' }}>
          {[
            { num: '500+', label: 'Timepieces' },
            { num: '137', label: 'Years Heritage' },
            { num: '48', label: 'Maisons' },
          ].map(s => (
            <div key={s.label}>
              <p className="serif" style={{ fontSize: '2.2rem', color: 'var(--text-main)', lineHeight: 1 }}>{s.num}</p>
              <p style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--text-subtle)', textTransform: 'uppercase', marginTop: '0.3rem' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
