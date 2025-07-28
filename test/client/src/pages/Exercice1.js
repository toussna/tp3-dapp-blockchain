import React, { useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import BlockchainInfo from "../components/BlockchainInfo";
import additionContract from "../contracts/additionContract";

export default function Exercice1() {
  const [nombre1, setNombre1] = useState(0);
  const [nombre2, setNombre2] = useState(0);
  const [result, setResult] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);  

  const web3 = new Web3("http://127.0.0.1:7545");

  const addition1 = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const resultFromContract = await additionContract.methods.addition1().call({ from: accounts[0] });
      setResult(`Résultat (addition1) = ${resultFromContract}`);
    } catch (err) {
      setResult("Erreur lors de l'appel à addition1()");
    }
  };

  const addition2 = async () => {
    try {
      const a = parseInt(nombre1);
      const b = parseInt(nombre2);
      const accounts = await web3.eth.getAccounts();
      const resultFromContract = await additionContract.methods.addition2(a, b).call({ from: accounts[0] });
      setResult(`Résultat (addition2) = ${resultFromContract}`);
    } catch (err) {
      setResult("Erreur lors de l'appel à addition2()");
    }
  };

  const setNombres = async () => {
    try {
      const a = parseInt(nombre1);
      const b = parseInt(nombre2);
      const accounts = await web3.eth.getAccounts();
      await additionContract.methods.setNombres(a, b).send({ from: accounts[0] });
      setRefreshKey(prev => prev + 1); // Rafraîchir BlockchainInfo après la transaction
    } catch (err) {
      setResult("Erreur lors de l'appel à setNombres()");
    }
  };

  return (
    <div className="min-h-screen  px-6" style={{ backgroundColor: "rgba(12, 12, 11, 1)" }}>
      {/* Titre principal */}
      <div className="w-full text-center py-6" style={{ backgroundColor: "rgb(25, 56, 140)" }}>
        <h3 className="text-3xl font-bold mb-4" style={{ color: "rgb(255, 253, 244)" }}>
          Exercice 1 : Somme de deux variables
        </h3>
      </div>

      {/* Zone de saisie */}
      <div className="w-full text-center py-2 mb-2" style={{ backgroundColor: "rgb(192, 195, 198)" }}>
        <div className="text-base font-semibold mb-2" style={{ color: "rgb(0, 12, 103)" }}>
          Saisir les deux nombres :
        </div>
        <div className="flex justify-center flex-wrap gap-4">
          <input
            type="number"
            value={nombre1}
            onChange={e => setNombre1(e.target.value)}
            className="border rounded p-2 w-40 text-center"
            placeholder="Nombre 1"
          />
          <input
            type="number"
            value={nombre2}
            onChange={e => setNombre2(e.target.value)}
            className="border rounded p-2 w-40 text-center"
            placeholder="Nombre 2"
          />
        </div>
      </div>

      {/* Boutons */}
      <div className="w-full flex flex-col items-center space-y-4 mb-4">
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={addition1}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Addition 1 (view)
          </button>
          <button
            onClick={addition2}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Addition 2 (pure)
          </button>
          <button
            onClick={setNombres}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            setNombres (view)
          </button>
        </div>
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
