import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

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
    
    // Définir le chemin du fichier où sont stockés les emails
    const filePath = path.join(process.cwd(), 'data', 'subscribers.txt');
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Aucun email enregistré pour le moment' },
        { status: 404 }
      );
    }
    
    // Lire le contenu du fichier
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Traiter les emails pour les mettre dans un format JSON
    const emails = fileContent
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const [email, timestamp] = line.split(',');
        return { email, timestamp };
      });
    
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
