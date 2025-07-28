import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlockchainInfo from "../components/BlockchainInfo";
import contract from "../contracts/conversionContract"; 

export default function Exercice2() {
  const [ether, setEther] = useState(0);
  const [wei, setWei] = useState(0);
  const [result, setResult] = useState("");

  const handleEtherToWei = async () => {
    const value = await contract.methods.etherEnWei(ether).call();
    setResult(`${ether} Ether = ${value} Wei`);
  };

  const handleWeiToEther = async () => {
    const value = await contract.methods.weiEnEther(wei).call();
    setResult(`${wei} Wei = ${value} Ether`);
  };

  return (
    <div className="min-h-screen px-6" style={{ backgroundColor: "rgba(12, 12, 11, 1)" }}>
      <div className="w-full text-center py-6" style={{ backgroundColor: "rgb(25, 56, 140)" }}>
        <h3 className="text-3xl font-bold mb-4" style={{ color: "rgb(255, 253, 244)" }}>
          Exercice 2 : Conversion des cryptomonnaies
        </h3>
      </div>

      {/* Zone de saisie */}
      <div className="w-full text-center py-4 mb-2" style={{ backgroundColor: "rgb(192, 195, 198)" }}>
        <div className="flex justify-center flex-wrap gap-4 mb-2">
          <input
            type="number"
            value={ether}
            onChange={e => setEther(e.target.value)}
            className="border rounded p-2 w-40 text-center"
            placeholder="Montant en Ether"
          />
          <input
            type="number"
            value={wei}
            onChange={e => setWei(e.target.value)}
            className="border rounded p-2 w-40 text-center"
            placeholder="Montant en Wei"
          />
        </div>
      </div>

      {/* Boutons */}
      <div className="w-full flex flex-col items-center space-y-4 mb-4">
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={handleEtherToWei}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Convertir Ether → Wei
          </button>
          <button
            onClick={handleWeiToEther}
            className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
          >
            Convertir Wei → Ether
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
        <Link to="/" className="underline text-white hover:text-yellow-300">Retour au Sommaire</Link>
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
