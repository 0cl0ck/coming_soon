import { NextRequest, NextResponse } from 'next/server';

// Référence au stockage temporaire des emails
// Dans une application réelle, on utiliserait une base de données
// Cette variable est partagée avec la route d'enregistrement des emails
// Note: Cette solution est temporaire - les données seront perdues au redéploiement
declare global {
  var subscribers: {email: string, timestamp: string}[];
}

if (!global.subscribers) {
  global.subscribers = [];
}

// Mot de passe d'admin - À REMPLACER par un vrai mot de passe sécurisé
// Idéalement, utilisez une variable d'environnement (process.env.ADMIN_PASSWORD)
const ADMIN_PASSWORD = "chanvre-admin-2025";

export async function GET(request: NextRequest) {
  try {
    // Récupérer le mot de passe de la query string
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    
    // Vérifier que le mot de passe est correct
    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 401 }
      );
    }
    
    // Accéder aux données stockées en mémoire
    const emails = global.subscribers || [];
    
    // Vérifier si des emails ont été enregistrés
    if (emails.length === 0) {
      return NextResponse.json(
        { error: 'Aucun email enregistré pour le moment' },
        { status: 404 }
      );
    }
    
    // Retourner les emails au format JSON
    return NextResponse.json({ 
      total: emails.length,
      emails: emails
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des emails:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
