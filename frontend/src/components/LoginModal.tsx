import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

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
      body: JSON.stringify(body)
    })
    .then(async res => {
      if (res.ok) return res.json();
      const msg = await res.text();
      throw new Error(msg);
    })
    .then(data => {
      onLoginSuccess(data);
      onClose();
    })
    .catch(err => {
      setError(err.message || "An error occurred");
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000,
      backdropFilter: 'blur(5px)'
    }}>
      <div className="glass" style={{
        width: '400px',
        padding: '3rem',
        background: 'var(--bg-card)',
        borderRadius: '8px',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1.2rem' }}>✕</button>
        
        <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          {isRegister ? 'Join the Heritage' : 'Welcome Back'}
        </h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>NAME</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border)', color: 'var(--text-main)' }} 
                required 
              />
            </div>
          )}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>EMAIL ADDRESS</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border)', color: 'var(--text-main)' }} 
              required 
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>PASSWORD</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border)', color: 'var(--text-main)' }} 
              required 
            />
          </div>

          {error && <p style={{ color: '#ff4444', fontSize: '0.8rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

          <button type="submit" style={{ width: '100%', background: 'var(--primary)', color: 'black', padding: '1rem', border: 'none', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span 
            onClick={() => setIsRegister(!isRegister)} 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isRegister ? 'Sign In' : 'Register Now'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
