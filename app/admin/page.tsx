'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Subscriber {
  email: string;
  timestamp: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Veuillez entrer le mot de passe');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/admin/emails?password=${encodeURIComponent(password)}`);
      const data = await response.json();
      
      if (response.ok) {
        setSubscribers(data.emails || []);
        setAuthenticated(true);
      } else {
        setError(data.error || 'Mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-brand-green-600">Panneau d'administration</h1>
      
      {!authenticated ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Connexion requise</h2>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Mot de passe administrateur
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                placeholder="Entrez le mot de passe"
              />
            </div>
            
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-600 rounded dark:bg-red-900/30 dark:text-red-400">
                {error}
              </div>
            )}
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Connexion...' : 'Accéder aux données'}
            </Button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Liste des abonnés ({subscribers.length})</h2>
            <Button variant="outline" onClick={() => setAuthenticated(false)}>
              Déconnexion
            </Button>
          </div>
          
          {subscribers.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 py-4">Aucun abonné pour le moment.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Date d'inscription</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber, index) => (
                    <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-3">{subscriber.email}</td>
                      <td className="px-4 py-3">{formatDate(subscriber.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
