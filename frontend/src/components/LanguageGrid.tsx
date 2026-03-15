import React, { useState, useEffect } from 'react';

interface Language {
  id: string;
  displayName: string;
  supported: string[];
}

export const LanguageGrid: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8081/api/languages')
      .then(res => res.json())
      .then(data => {
        setLanguages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch languages", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading languages...</div>;

  return (
    <div style={{ padding: '4rem 0' }}>
      <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Supported Languages</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {languages.map(lang => (
          <div key={lang.id} className="glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>{lang.displayName}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {lang.supported.map(cat => (
                <span key={cat} style={{ fontSize: '0.75rem', background: 'var(--primary)', padding: '2px 8px', borderRadius: '12px' }}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
