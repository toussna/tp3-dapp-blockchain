import React, { useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import BlockchainInfo from "../components/BlockchainInfo";
import rectangleContract from "../contracts/rectangleContract";

export default function Exercice7() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [taille, setTaille] = useState({ lo: 0, la: 0 });
  const [result, setResult] = useState("");

  const web3 = new Web3("http://127.0.0.1:7545");

  const afficherInfos = async () => {
    const info = await rectangleContract.methods.afficheInfos().call();
    setResult(info);
  };

const afficherCoordonnees = async () => {
  try {
    const coords = await rectangleContract.methods.afficheXY().call();
    // coords est un objet : { '0': x, '1': y }
    setResult(`Coordonnées : x = ${coords[0]}, y = ${coords[1]}`);
  } catch (err) {
    console.error("Erreur afficheXY :", err);
    setResult("Erreur lors de l'appel à afficheXY()");
  }
};


const afficherDimensions = async () => {
  try {
    const dims = await rectangleContract.methods.afficheLoLa().call();
    setResult(`Dimensions : longueur = ${dims[0]}, largeur = ${dims[1]}`);
  } catch (err) {
    console.error("Erreur afficheLoLa :", err);
    setResult("Erreur lors de l'appel à afficheLoLa()");
  }
};


  const calculerSurface = async () => {
    const surface = await rectangleContract.methods.surface().call();
    setResult(`Surface = ${surface}`);
  };

  const deplacer = async () => {
    const accounts = await web3.eth.getAccounts();
    await rectangleContract.methods
      .deplacerForme(coords.x, coords.y)
      .send({ from: accounts[0] });
    setResult("Forme déplacée !");
  };

  return (
    <div className="min-h-screen px-6" style={{ backgroundColor: "rgba(12, 12, 11, 1)" }}>
      <div className="w-full text-center py-6" style={{ backgroundColor: "rgb(25, 56, 140)" }}>
        <h3 className="text-3xl font-bold mb-4" style={{ color: "rgb(255, 253, 244)" }}>
          Exercice 7 : Programmation orientée objet
        </h3>
      </div>

      {/* Zone de saisie */}
      <div className="w-full text-center py-4 mb-2" style={{ backgroundColor: "rgb(192, 195, 198)" }}>
        <div className="text-base font-semibold mb-2" style={{ color: "rgb(0, 12, 103)" }}>
          Entrer les valeurs de déplacement :
        </div>
        <div className="flex justify-center flex-wrap gap-4">
          <input
            type="number"
            placeholder="dx"
            value={coords.x}
            onChange={(e) => setCoords({ ...coords, x: e.target.value })}
            className="border rounded p-2 w-32 text-center"
          />
          <input
            type="number"
            placeholder="dy"
            value={coords.y}
            onChange={(e) => setCoords({ ...coords, y: e.target.value })}
            className="border rounded p-2 w-32 text-center"
          />
        </div>
      </div>

      {/* Boutons */}
      <div className="w-full flex flex-wrap justify-center gap-4 mb-5">
        <button onClick={afficherInfos} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Affiche Infos
        </button>
        <button onClick={afficherCoordonnees} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Affiche Coordonnées
        </button>
        <button onClick={afficherDimensions} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Affiche lo/la
        </button>
        <button onClick={calculerSurface} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Surface
        </button>
        <button onClick={deplacer} className="bg-yellow-600 text-black px-4 py-2 rounded hover:bg-yellow-700">
          Déplacer
        </button>
      </div>

      {/* Résultat */}
      {result && (
        <div className="w-full mb-4">
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
