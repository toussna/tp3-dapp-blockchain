import React from "react";
import { Link } from "react-router-dom";

export default function Accueil() {
  return (
        <div className="flex flex-col min-h-screen justify-between items-center px-[1%]">
          {/* Bandeau titre */}
          <div className="w-full text-center py-6" style={{ backgroundColor: "rgb(25, 56, 140)" }}>
            <h1 className="text-4xl font-bold mb-4" style={{ color: "rgb(255, 253, 244)" }}>
              Projet de Fin de Module
            </h1>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: "rgb(255, 253, 244)" }}>
              Développement d'une d'App pour le TP3
            </h2>
            <h3 className="text-sm" style={{ color: "rgb(255, 253, 244)" }}>
              Solidity, Truffle et ReactJS
            </h3>
          </div>

          {/* Menu liste des liens */}
          <div className="w-full text-center py-6" style={{ backgroundColor: "rgb(192, 195, 198)" }}>
            <ul className="flex flex-col items-center space-y-4 text-lg leading-relaxed">
              <li><Link to="/exercice1" className="hover:underline" style={{ color: "rgb(157, 105, 181)" }}>Exercice 1 - Somme de deux variables</Link></li>
              <li><Link to="/exercice2" className="hover:underline" style={{ color: "rgb(157, 105, 181)" }}>Exercice 2 - Conversion des cryptomonnaies</Link></li>
              <li><Link to="/exercice3" className="hover:underline" style={{ color: "rgb(157, 105, 181)" }}>Exercice 3 - Traitement des chaînes de caractères</Link></li>
              <li><Link to="/exercice4" className="hover:underline" style={{ color: "rgb(157, 105, 181)" }}>Exercice 4 - Tester le signe d'un nombre</Link></li>
              <li><Link to="/exercice5" className="hover:underline" style={{ color: "rgb(157, 105, 181)" }}>Exercice 5 - Tester la parité d'un nombre</Link></li>
              <li><Link to="/exercice6" className="hover:underline" style={{ color: "rgb(157, 105, 181)" }}>Exercice 6 - Gestion des tableaux</Link></li>
              <li><Link to="/exercice7" className="hover:underline" style={{ color: "rgb(157, 105, 181)" }}>Exercice 7 - Programmation orientée objet (Formes géométriques)</Link></li>
              <li><Link to="/exercice8" className="hover:underline" style={{ color: "rgb(157, 105, 181)" }}>Exercice 8 - Utilisation des variables globales (msg.sender et msg.value)</Link></li>
            </ul>
          </div>
        </div>

  );
}
