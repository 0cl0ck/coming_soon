import { NextRequest, NextResponse } from 'next/server';

// Déclaration pour le stockage global des emails (persistant entre les appels d'API)
declare global {
  var subscribers: {email: string, timestamp: string}[];
}

// Initialiser le stockage global s'il n'existe pas déjà
if (!global.subscribers) {
  global.subscribers = [];
}

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
    
    // Stocker l'email et le timestamp dans notre array en mémoire globale
    const timestamp = new Date().toISOString();
    global.subscribers.push({ email, timestamp });
    
    // Log pour debugging
    console.log(`Email ${email} enregistré à ${timestamp}`);
    console.log(`Total d'emails stockés: ${global.subscribers.length}`);
    
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
