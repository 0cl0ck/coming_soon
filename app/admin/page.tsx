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
  
  useEffect(() => {
    // Vérifier si on est côté client
    if (typeof window !== 'undefined' && authenticated) {
      // Récupérer les emails du localStorage
      try {
        const storedEmails = localStorage.getItem('subscribers');
        if (storedEmails) {
          const localSubscribers = JSON.parse(storedEmails);
          setSubscribers(localSubscribers);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données locales:', error);
      }
    }
  }, [authenticated]); // Recharger quand l'authentification change
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Veuillez entrer le mot de passe');
      return;
    }
    
    // Vérifier le mot de passe en local (pour simplifier)
    const ADMIN_PASSWORD = "chanvre-admin-2025";
    
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      
      // Récupérer les emails du localStorage
      try {
        const storedEmails = localStorage.getItem('subscribers');
        if (storedEmails) {
          setSubscribers(JSON.parse(storedEmails));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données locales:', error);
      }
    } else {
      setError('Mot de passe incorrect');
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
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => {
                const csvContent = 'data:text/csv;charset=utf-8,' + 
                  'Email,Date d\'inscription\n' +
                  subscribers.map(sub => `${sub.email},${sub.timestamp}`).join('\n');
                
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', `abonnes-newsletter-${new Date().toISOString().split('T')[0]}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}>
                Exporter CSV
              </Button>
              <Button variant="outline" onClick={() => setAuthenticated(false)}>
                Déconnexion
              </Button>
            </div>
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
