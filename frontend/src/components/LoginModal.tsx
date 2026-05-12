import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.9rem 1rem',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--border-subtle)',
  color: 'var(--text-main)',
  fontSize: '0.85rem',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.3s ease',
  borderRadius: '2px',
};

const LoginModal = ({ isOpen, onClose, onLoginSuccess }: LoginModalProps) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const body = isRegister ? { email, password, name } : { email, password };

    fetch(`http://localhost:8080${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(async res => {
        if (res.ok) return res.json();
        throw new Error(await res.text());
      })
      .then(data => { onLoginSuccess(data); onClose(); })
      .catch(err => setError(err.message || 'An error occurred'));
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, backdropFilter: 'blur(8px)' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: '440px', background: '#0f0f0f', border: '1px solid var(--border)', position: 'relative', padding: '3.5rem' }}
      >
        {/* Close */}
        <button onClick={onClose}
          style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'none', border: 'none', color: 'var(--text-subtle)', fontSize: '1rem', cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--text-subtle)'}
        >✕</button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p className="overline" style={{ marginBottom: '0.8rem', fontSize: '0.6rem' }}>
            {isRegister ? 'Join the Maison' : 'Member Access'}
          </p>
          <h2 className="serif" style={{ fontSize: '2.2rem', fontWeight: 300, color: 'var(--text-main)' }}>
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <div className="gold-line" />
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.6rem', letterSpacing: '2px', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} style={inputStyle} required
                onFocus={e => e.target.style.borderColor = 'rgba(184,150,90,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
              />
            </div>
          )}

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.6rem', letterSpacing: '2px', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} required
              onFocus={e => e.target.style.borderColor = 'rgba(184,150,90,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.6rem', letterSpacing: '2px', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} required
              onFocus={e => e.target.style.borderColor = 'rgba(184,150,90,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
            />
          </div>

          {error && (
            <p style={{ color: '#e74c3c', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '1.2rem', textAlign: 'center' }}>{error}</p>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', marginBottom: '1.5rem' }}>
            <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', letterSpacing: '1px' }}>
          {isRegister ? 'Already a member?' : 'New to Horologe?'}{' '}
          <span onClick={() => { setIsRegister(!isRegister); setError(''); }}
            style={{ color: 'var(--gold)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            {isRegister ? 'Sign In' : 'Create Account'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
