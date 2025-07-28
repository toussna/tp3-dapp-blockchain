import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import BlockchainInfo from "../components/BlockchainInfo";
import listeNombresContract from "../contracts/listeNombresContract";

export default function Exercice6() {
  const [nombre, setNombre] = useState(0);
  const [index, setIndex] = useState("");
  const [result, setResult] = useState("");
  const [tableau, setTableau] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);  

  const web3 = new Web3("http://127.0.0.1:7545");

  const ajouter = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await listeNombresContract.methods.ajouterNombre(parseInt(nombre)).send({ from: accounts[0] });
      setResult(`Nombre ${nombre} ajouté`);
      setNombre(0);
      setRefreshKey(prev => prev + 1);  
      await chargerTableau();
    } catch (err) {
      console.error(err);
      setResult("Erreur lors de l'ajout");
    }
  };

  const chargerTableau = async () => {
    try {
      const tab = await listeNombresContract.methods.afficheTableau().call();
      setTableau(tab);
      setResult("Tableau mis à jour !");
    } catch (err) {
      console.error(err);
      setResult("Erreur lors de l'affichage du tableau");
    }
  };

  const somme = async () => {
    try {
      const s = await listeNombresContract.methods.calculerSomme().call();
      setResult(`Somme du tableau = ${s}`);
    } catch (err) {
      console.error(err);
      setResult("Erreur lors du calcul de la somme");
    }
  };

  const getElement = async () => {
    try {
      const value = await listeNombresContract.methods.getElement(index).call();
      setResult(`Élément à l'indice ${index} = ${value}`);
    } catch (err) {
      console.error(err);
      setResult("Index invalide ou erreur lors de getElement()");
    }
  };

  useEffect(() => {
    chargerTableau();
  }, []);

  return (
    <div className="min-h-screen px-6" style={{ backgroundColor: "rgba(12, 12, 11, 1)" }}>
      <div className="w-full text-center py-6" style={{ backgroundColor: "rgb(25, 56, 140)" }}>
        <h3 className="text-3xl font-bold mb-4" style={{ color: "rgb(255, 253, 244)" }}>
          Exercice 6 : Gestion des tableaux
        </h3>
      </div>

      {/* Zone de saisie */}
      <div className="w-full text-center py-4 mb-2" style={{ backgroundColor: "rgb(192, 195, 198)" }}>
        <div className="text-base font-semibold mb-2" style={{ color: "rgb(0, 12, 103)" }}>
          Ajouter un nombre :
        </div>
        <div className="flex justify-center flex-wrap gap-4 mb-3">
          <input
            type="number"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border rounded p-2 w-40 text-center"
            placeholder="Nombre"
          />
          <button onClick={ajouter} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Ajouter
          </button>
          <button onClick={somme} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Calculer Somme
          </button>
          <button onClick={chargerTableau} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Afficher Tableau
          </button>
        </div>

        <div className="text-base font-semibold mb-2" style={{ color: "rgb(0, 12, 103)" }}>
          Afficher un élément par son index :
        </div>
        <div className="flex justify-center flex-wrap gap-4">
          <input
            type="number"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            className="border rounded p-2 w-40 text-center"
            placeholder="Index"
          />
          <button onClick={getElement} className="bg-yellow-600 text-black px-4 py-2 rounded hover:bg-yellow-700">
            Obtenir Élément
          </button>
        </div>
      </div>

      {/* Résultat */}
      {result && (
        <div className="w-full mb-4">
          <div className="w-full px-6 py-4 rounded shadow-md" style={{ backgroundColor: "rgb(220, 230, 104)" }}>
            <p className="text-lg font-semibold text-center" style={{ color: "rgb(187, 41, 32)" }}>
              {result}
            </p>
          </div>
        </div>
      )}

      {/* Affichage du tableau */}
      <div className="w-full text-center mb-4">
        <h4 className="text-lg font-semibold text-white mb-2">Contenu du tableau :</h4>
        <div className="text-white text-sm">
          {tableau.length > 0 ? tableau.join(", ") : "Aucun nombre ajouté"}
        </div>
      </div>

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
          <BlockchainInfo refreshKey={refreshKey} />  
        </div>
      </div>
    </div>
  );
}
