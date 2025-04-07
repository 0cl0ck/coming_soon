import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Récupérer l'email du corps de la requête
    const { email } = await request.json();
    
    // Vérifier que l'email est présent
    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      );
    }
    
    // Vérifier le format de l'email avec une regex simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }
    
    // Définir le chemin du fichier où stocker les emails dans le répertoire 'data' sécurisé
    const dataDir = path.join(process.cwd(), 'data');
    
    // Vérifier si le répertoire existe, sinon le créer
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const filePath = path.join(dataDir, 'subscribers.txt');
    
    // Ajouter l'email au fichier avec timestamp
    const timestamp = new Date().toISOString();
    const data = `${email},${timestamp}\n`;
    
    // Écrire dans le fichier (append)
    fs.appendFileSync(filePath, data);
    
    // Retourner une réponse de succès
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
