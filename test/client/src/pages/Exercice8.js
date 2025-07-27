import React, { useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import BlockchainInfo from "../components/BlockchainInfo";
import paymentContract from "../contracts/paymentContract";

export default function Exercice8() {
  const [montant, setMontant] = useState(0);
  const [result, setResult] = useState("");

  const web3 = new Web3("http://127.0.0.1:7545");

  // Envoyer un paiement au contrat
  const envoyerPaiement = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await paymentContract.methods.receivePayment().send({
        from: accounts[0], // envoie depuis le premier compte
        value: web3.utils.toWei(montant, "ether"),
      });
      setResult(`${montant} Ether envoyé depuis ${accounts[0]}`);
    } catch (err) {
      console.error("Erreur paiement :", err);
      setResult("Erreur lors de l'envoi du paiement");
    }
  };

  // Seul le destinataire peut retirer les fonds
  const retirer = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const destinataire = await paymentContract.methods.recipient().call();

      if (accounts[1].toLowerCase() !== destinataire.toLowerCase()) {
        setResult(`accounts[1] ≠ destinataire enregistré !`);
        return;
      }

      await paymentContract.methods.withdraw().send({ from: accounts[1] });
      setResult(`Fonds retirés par le destinataire : ${accounts[1]}`);
    } catch (err) {
      console.error("Erreur retrait :", err);
      setResult("Erreur lors du retrait. Vérifie que tu es le destinataire.");
    }
  };

  // Affiche le solde du contrat
  const afficherSolde = async () => {
    try {
      const balance = await paymentContract.methods.getBalance().call();
      setResult(`Solde du contrat : ${web3.utils.fromWei(balance, "ether")} Ether`);
    } catch (err) {
      console.error("Erreur getBalance :", err);
      setResult("Erreur lors de l'affichage du solde");
    }
  };

  // Affiche le destinataire
  const afficherDestinataire = async () => {
    try {
      const r = await paymentContract.methods.recipient().call();
      setResult(`Adresse du destinataire : ${r}`);
    } catch (err) {
      console.error("Erreur destinataire :", err);
      setResult("Erreur lors de l'affichage du destinataire");
    }
  };

  // Bouton debug : liste des comptes utilisés
  const afficherComptes = async () => {
    const accounts = await web3.eth.getAccounts();
    setResult(`Comptes Ganache :\naccounts[0] = ${accounts[0]}\naccounts[1] = ${accounts[1]}`);
  };

  return (
    <div className="min-h-screen px-6" style={{ backgroundColor: "rgba(12, 12, 11, 1)" }}>
      <div className="w-full text-center py-6" style={{ backgroundColor: "rgb(25, 56, 140)" }}>
        <h3 className="text-3xl font-bold mb-4" style={{ color: "rgb(255, 253, 244)" }}>
          Exercice 8 : Paiement et retrait sécurisé
        </h3>
      </div>

      {/* Entrée Ether */}
      <div className="w-full text-center py-4 mb-2" style={{ backgroundColor: "rgb(192, 195, 198)" }}>
        <div className="text-base font-semibold mb-2" style={{ color: "rgb(0, 12, 103)" }}>
          Montant à envoyer (en Ether) :
        </div>
        <div className="flex justify-center">
          <input
            type="number"
            step="0.01"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            className="border rounded p-2 w-40 text-center"
            placeholder="Ex: 0.5"
          />
        </div>
      </div>

      {/* Boutons */}
      <div className="w-full flex flex-wrap justify-center gap-4 mb-4">
        <button onClick={envoyerPaiement} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Envoyer Paiement
        </button>
        <button onClick={retirer} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Retirer (destinataire)
        </button>
        <button onClick={afficherSolde} className="bg-yellow-600 text-black px-4 py-2 rounded hover:bg-yellow-700">
          Solde Contrat
        </button>
        <button onClick={afficherDestinataire} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Voir Destinataire
        </button>
        <button onClick={afficherComptes} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
          Voir Comptes Ganache
        </button>
      </div>

      {/* Résultat */}
      {result && (
        <div className="w-full mb-5">
          <div className="w-full px-6 py-4 rounded shadow-md" style={{ backgroundColor: "rgb(220, 230, 104)" }}>
            <pre className="text-base font-semibold text-center" style={{ color: "rgb(187, 41, 32)" }}>
              {result}
            </pre>
          </div>
        </div>
      )}

      {/* Retour + Infos blockchain */}
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
          <BlockchainInfo />
        </div>
      </div>
    </div>
  );
}
