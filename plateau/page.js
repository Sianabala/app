"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";  // Si tu utilises `router` pour naviguer

const carteStyle = {
  "🟠 Légendaire": "border-4 border-red-500",
  "🔵 Rare": "border-4 border-blue-500",
  "🟣 Épique": "border-4 border-purple-500",
  "🟢 Commune": "border-4 border-green-500",
};


const Plateau = () => {
  const [deck, setDeck] = useState([
    { 
      id: 1, 
      nom: "Feu", 
      attaque: 50, 
      defense: 30, 
      rarete: "🟠 Légendaire", 
      image: "https://cdn.shopify.com/s/files/1/0269/0868/8432/files/Signe_Chinois_Dragon_de_Feu_2.jpg?v=1726517099",
      description: "Un dragon puissant capable de brûler tout sur son passage.",
      effetSpecial: "Inflige 10 dégâts supplémentaires à toutes les cartes adverses."
    },
    {
      id: 2, 
      nom: "Glace", 
      attaque: 40, 
      defense: 40, 
      rarete: "🔵 Rare", 
      image: "https://cdn.shopify.com/s/files/1/0269/0868/8432/files/Signe_Chinois_Dragon_de_Feu_2.jpg?v=1726517099" 
    },
    { id: 3, nom: "Cryo", attaque: 45, defense: 25, rarete: "🟣 Épique" },
    { id: 4, nom: "Abyssal", attaque: 35, defense: 20, rarete: "🟢 Commune" },
    { id: 5, nom: "Filobscur", attaque: 20, defense: 50, rarete: "🟢 Commune" },
    { id: 6, nom: "Stase", attaque: 55, defense: 35, rarete: "🟠 Légendaire" },
    { id: 7, nom: "Prismatique", attaque: 38, defense: 22, rarete: "🔵 Rare" },
    { id: 8, nom: "Colonel", attaque: 50, defense: 30, rarete: "🟠 Légendaire" },
    { id: 9, nom: "Eva", attaque: 40, defense: 40, rarete: "🔵 Rare" },
    { id: 10, nom: "Osiris", attaque: 45, defense: 25, rarete: "🟣 Épique" },
    { id: 11, nom: "Ikora", attaque: 35, defense: 20, rarete: "🟢 Commune" },
    { id: 12, nom: "Zavala", attaque: 20, defense: 50, rarete: "🟢 Commune" },
        { 
      id: 13, 
      nom: "Cayde", 
      attaque: 55, 
      defense: 35, 
      rarete: "🟠 Légendaire", 
      image: "https://image.noelshack.com/fichiers/2025/14/2/1743459197-12-cayde-6.jpg",
      description: "Cayde on t'aime",
      effetSpecial: "Un chasseur sachant chasser sans son pisto est un bon chasseur"
    },
    { id: 14, nom: "Shaxx", attaque: 38, defense: 22, rarete: "🔵 Rare" },
  ]); // Déclaration correcte du tableau d'objets

  const [main, setMain] = useState([]); // Liste des cartes en main
  const [collection, setCollection] = useState([]); // Liste des cartes collectées
  const ajouterACollection = (carte) => {
    setCollection((prevCollection) => {
      // Vérifie si la carte est déjà dans la collection
      const index = prevCollection.findIndex((c) => c.id === carte.id);
      
      if (index !== -1) {
        // Si elle est déjà présente, on augmente la quantité
        const nouvelleCollection = [...prevCollection];
        nouvelleCollection[index].quantite += 1;
        return nouvelleCollection;
      } else {
        // Sinon, on l'ajoute avec une quantité initiale de 1
        return [...prevCollection, { ...carte, quantite: 1 }];
      }
    });
  };

  const [showCollection, setShowCollection] = useState(false); // État pour afficher ou masquer la collection

  // Charger la collection depuis le localStorage au démarrage
  useEffect(() => {
    const savedCollection = localStorage.getItem("collection");
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection));
    }
  }, []);

  // Fonction pour ouvrir un booster
  const ouvrirBooster = () => {
    if (deck.length >= 5) {
      const nouvellesCartes = [
        deck[Math.floor(Math.random() * deck.length)],
        deck[Math.floor(Math.random() * deck.length)],
        deck[Math.floor(Math.random() * deck.length)],
      ];
  
      nouvellesCartes.forEach((carte) => ajouterACollection(carte));  // Ajouter les cartes à la collection
      setMain([...main, ...nouvellesCartes]); // Ajouter les cartes à la main
      const newDeck = deck.filter((carte) => !nouvellesCartes.includes(carte)); // Mettre à jour le deck
      setDeck(newDeck); // Mise à jour du deck
  
      // Sauvegarder la collection dans localStorage
      localStorage.setItem("collection", JSON.stringify(collection));
    } else {
      console.log("Pas assez de cartes dans le deck pour ouvrir un booster.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-700 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Plateau de Jeu</h1>

      {/* Afficher la taille du deck pour déboguer */}
      <p className="mb-4 text-lg">Deck: {deck.length} cartes restantes</p>

      {/* Bouton pour ouvrir un booster */}
      <button
        onClick={ouvrirBooster}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-700 disabled:bg-gray-500"
        disabled={deck.length < 5} // Désactive si le deck contient moins de 5 cartes
      >
        Ouvrir un Booster ({deck.length} cartes restantes)
      </button>

      {/* Bouton pour afficher ou masquer la collection */}
      <button
        onClick={() => setShowCollection(!showCollection)}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-gray-700"
      >
        {showCollection ? "Retour au Plateau" : "Voir ma Collection"}
      </button>

      {/* Affichage du plateau de jeu ou de la collection */}
      {showCollection ? (
        <div className="mt-4">
          <h2 className="text-xl">Collection</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {collection.map((carte, index) => (
             <div key={index} className="bg-white text-black p-4 rounded-lg shadow-lg ${carteStyle[carte.rarete]} hover:scale-110 transition-transform duration-300">
                <img src={carte.image} alt={carte.nom} className="w-full h-32 object-cover rounded-md mb-2" />
                <h3 className="text-lg font-bold">{carte.nom}</h3>
                <p>{carte.rarete}</p>
                <p>Attaque: {carte.attaque}</p>
                <p>Défense: {carte.defense}</p>
                <p className="text-gray-500">Possédée : {carte.quantite}x</p> {/* Affiche le nombre de doublons */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <h2 className="text-xl">Cartes en Main</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {main.map((carte, index) => (
              <div key={index} className={`bg-white text-black p-4 rounded-lg shadow-lg ${carteStyle[carte.rarete]}`}>
              <img src={carte.image} alt={carte.nom} className="w-full h-32 object-cover rounded-md mb-2" />
              <h3 className="text-lg font-bold">{carte.nom}</h3>
              <p>{carte.rarete}</p>
              <p>Attaque: {carte.attaque}</p>
              <p>Défense: {carte.defense}</p>
            </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Plateau;
