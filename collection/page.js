"use client";
import { useState, useEffect } from "react";

const carteStyle = {
  "🟠 Légendaire": "border-4 border-red-500",
  "🔵 Rare": "border-4 border-blue-500",
  "🟣 Épique": "border-4 border-purple-500",
  "🟢 Commune": "border-4 border-green-500",
};


const Collection = () => {
  const [collection, setCollection] = useState([]);  // Changer 'oajouterACollection' en 'setCollection'

  useEffect(() => {
    // Charger la collection depuis localStorage lors du montage du composant
    const savedCollection = localStorage.getItem("collection");
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection));  // Correction ici
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-700 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Ma Collection de Cartes</h1>

      {/* Afficher les cartes collectées */}
      <div className="collection">
        {collection.map((carte) => (
          <div key={carte.id} className={`bg-white text-black p-4 rounded-lg shadow-lg ${carteStyle[carte.rarete]} hover:scale-105 transition-transform duration-300`}>
              <img src={carte.image} alt={carte.nom} className="w-full h-32 object-cover rounded-md mb-2" />
              <h3 className="text-lg font-bold">{carte.nom}</h3>
            <p>Attaque : {carte.attaque}</p>
            <p>Défense : {carte.defense}</p>
            <p>Rareté : {carte.rarete}</p>
            <p className="text-gray-500">Possédée : {carte.quantite}x</p> {/* 🔥 Afficher la quantité de doublons */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
