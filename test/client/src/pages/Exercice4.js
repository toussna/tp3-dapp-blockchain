import React, { useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import BlockchainInfo from "../components/BlockchainInfo";
import positifContract from "../contracts/positifContract";

export default function Exercice4() {
  const [nombre, setNombre] = useState(0);
  const [result, setResult] = useState("");

  const web3 = new Web3("http://127.0.0.1:7545");

  const verifierPositif = async () => {
    try {
      const res = await positifContract.methods.estPositif(nombre).call();
      setResult(`Le nombre ${nombre} est ${res ? "positif ou nul" : "négatif"}`);
    } catch (err) {
      setResult("Erreur lors de l'appel à estPositif()");
    }
  };

  return (
    <div className="min-h-screen px-6" style={{ backgroundColor: "rgba(12, 12, 11, 1)" }}>
      {/* Titre principal */}
      <div className="w-full text-center py-6" style={{ backgroundColor: "rgb(25, 56, 140)" }}>
        <h3 className="text-3xl font-bold mb-4" style={{ color: "rgb(255, 253, 244)" }}>
          Exercice 4 : Tester le signe d'un nombre
        </h3>
      </div>

      {/* Zone de saisie */}
      <div className="w-full text-center py-4 mb-2" style={{ backgroundColor: "rgb(192, 195, 198)" }}>
        <div className="text-base font-semibold mb-2" style={{ color: "rgb(0, 12, 103)" }}>
          Saisir un nombre entier :
        </div>
        <div className="flex justify-center">
          <input
            type="number"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border rounded p-2 w-40 text-center"
            placeholder="Nombre"
          />
        </div>
      </div>

      {/* Bouton */}
      <div className="w-full flex flex-col items-center space-y-4 mb-4">
        <button
          onClick={verifierPositif}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Vérifier si positif
        </button>
      </div>

      {/* Résultat */}
      {result && (
        <div className="w-full mb-5">
          <div
            className="w-full px-6 py-4 rounded shadow-md"
            style={{ backgroundColor: "rgb(220, 230, 104)" }}
          >
            <p className="text-lg font-semibold text-center" style={{ color: "rgb(187, 41, 32)" }}>
              {result}
            </p>
          </div>
        </div>
      )}

      {/* Lien retour */}
      <div className="mb-1">
        <Link to="/" className="underline text-white hover:text-yellow-300">
          Retour au Sommaire
        </Link>
      </div>

      {/* Infos blockchain */}
      <div className="w-full bg-gray-100 px-[4%] py-2">
        <div className="max-w-[98vw] mx-auto">
          <h2 className="text-xl font-bold text-center mb-2" style={{ color: "rgb(0, 12, 103)" }}>
            Informations Blockchain
          </h2>
          <BlockchainInfo />  
        </div>
      </div>
    </div>
  );
}
