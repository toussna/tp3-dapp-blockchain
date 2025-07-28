import React, { useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import BlockchainInfo from "../components/BlockchainInfo";
import gestionChainesContract from "../contracts/gestionChainesContract";

export default function Exercice3() {
  const [message, setMessage] = useState("");
  const [nouveauMessage, setNouveauMessage] = useState("");
  const [chaineA, setChaineA] = useState("");
  const [chaineB, setChaineB] = useState("");
  const [result, setResult] = useState("");
  const [refreshKey, setRefreshKey] = useState(0); // Pour rafraîchir BlockchainInfo

  const web3 = new Web3("http://127.0.0.1:7545");

  const handleSetMessage = async () => {
    const accounts = await web3.eth.getAccounts();
    await gestionChainesContract.methods.setMessage(nouveauMessage).send({ from: accounts[0] });
    setResult("Message mis à jour !");
    setRefreshKey(prev => prev + 1); // Mettre à jour BlockchainInfo
  };

  const handleGetMessage = async () => {
    const msg = await gestionChainesContract.methods.getMessage().call();
    setMessage(msg);
    setResult(`Message actuel : ${msg}`);
  };

  const handleConcatener = async () => {
    const res = await gestionChainesContract.methods.concatener(chaineA, chaineB).call();
    setResult(`Résultat concaténation : ${res}`);
  };

  const handleConcatenerAvec = async () => {
    const res = await gestionChainesContract.methods.concatenerAvec(chaineA).call();
    setResult(`Message concaténé avec "${chaineA}" : ${res}`);
  };

  const handleLongueur = async () => {
    const res = await gestionChainesContract.methods.longueur(chaineA).call();
    setResult(`Longueur de "${chaineA}" : ${res}`);
  };

  const handleComparer = async () => {
    const res = await gestionChainesContract.methods.comparer(chaineA, chaineB).call();
    setResult(`Les chaînes sont ${res ? "identiques" : "différentes"}`);
  };

  return (
    <div className="min-h-screen px-6" style={{ backgroundColor: "rgba(12, 12, 11, 1)" }}>
      <div className="w-full text-center py-6" style={{ backgroundColor: "rgb(25, 56, 140)" }}>
        <h3 className="text-3xl font-bold mb-4" style={{ color: "rgb(255, 253, 244)" }}>
          Exercice 3 : Traitement des chaînes de caractères
        </h3>
      </div>

      {/* Saisie des chaînes */}
      <div className="w-full text-center py-4 mb-2" style={{ backgroundColor: "rgb(192, 195, 198)" }}>
        <div className="flex flex-wrap justify-center gap-4">
          <input
            type="text"
            placeholder="Chaîne A"
            className="border rounded p-2 w-60 text-center"
            value={chaineA}
            onChange={(e) => setChaineA(e.target.value)}
          />
          <input
            type="text"
            placeholder="Chaîne B"
            className="border rounded p-2 w-60 text-center"
            value={chaineB}
            onChange={(e) => setChaineB(e.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <input
            type="text"
            placeholder="Nouveau message"
            className="border rounded p-2 w-60 text-center"
            value={nouveauMessage}
            onChange={(e) => setNouveauMessage(e.target.value)}
          />
        </div>
      </div>

      {/* Boutons */}
      <div className="w-full flex flex-col items-center space-y-4 mb-4">
        <div className="flex gap-4 flex-wrap justify-center">
          <button onClick={handleSetMessage} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            setMessage
          </button>
          <button onClick={handleGetMessage} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            getMessage
          </button>
          <button onClick={handleConcatener} className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
            concatener(a, b)
          </button>
          <button onClick={handleConcatenerAvec} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
            concatenerAvec(a)
          </button>
          <button onClick={handleLongueur} className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700">
            longueur(a)
          </button>
          <button onClick={handleComparer} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
            comparer(a, b)
          </button>
        </div>
      </div>

      {/* Résultat */}
      {result && (
        <div className="w-full mb-5">
          <div className="w-full px-6 py-4 rounded shadow-md" style={{ backgroundColor: "rgb(220, 230, 104)" }}>
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
          <BlockchainInfo refreshKey={refreshKey} /> {/* Mis à jour */}
        </div>
      </div>
    </div>
  );
}
