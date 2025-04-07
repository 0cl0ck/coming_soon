import { NextRequest, NextResponse } from 'next/server';

// Une solution simple - un fichier DB en mémoire qui sera perdu au redéploiement
// Pour une vraie app, utilisez MongoDB, Supabase, ou autre
let DB = {
  subscribers: [] as { email: string; timestamp: string }[]
};

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
    
    // Ajouter l'email à notre base de données en mémoire
    const timestamp = new Date().toISOString();
    DB.subscribers.push({ email, timestamp });
    
    // Log pour debugging
    console.log(`Email ${email} enregistré à ${timestamp}`);
    console.log(`Total d'emails stockés: ${DB.subscribers.length}`);
    
    // Retourner une réponse de succès
    return NextResponse.json({
      success: true,
      message: "Merci de votre inscription !"
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
