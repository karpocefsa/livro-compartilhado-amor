
// Mapeia os nomes de imagens para URLs de placeholder
const imagePlaceholders: Record<string, string> = {
  "pequeno-principe": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
  "alquimista": "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop", 
  "harry-potter": "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?q=80&w=400&auto=format&fit=crop",
  "a-cabana": "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=400&auto=format&fit=crop",
  "senhor-dos-aneis": "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=400&auto=format&fit=crop",
  "dom-quixote": "https://images.unsplash.com/photo-1594312915251-48db9280c8f1?q=80&w=400&auto=format&fit=crop",
  "hero-books": "https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=1000&auto=format&fit=crop",
  "readers-sharing": "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1000&auto=format&fit=crop",
  "blog-estante": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=400&auto=format&fit=crop",
  "blog-top10": "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=400&auto=format&fit=crop",
  "blog-doacao": "https://images.unsplash.com/photo-1521056787327-266fecf05f98?q=80&w=400&auto=format&fit=crop",
  "avatar-maria": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  "avatar-joao": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  "avatar-ana": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop"
};

// Função para obter URL de imagem
export const getImageUrl = (path: string): string => {
  if (!path) return "https://via.placeholder.com/400";
  
  const imageName = path.split('/').pop()?.split('.')[0];
  
  if (imageName && imagePlaceholders[imageName]) {
    return imagePlaceholders[imageName];
  }
  
  return "https://via.placeholder.com/400";
};

export default getImageUrl;
