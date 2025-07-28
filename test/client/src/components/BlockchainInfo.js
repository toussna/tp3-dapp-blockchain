import React, { useEffect, useState } from "react";
import Web3 from "web3";

export default function BlockchainInfo({ refreshKey }) {
  const [account, setAccount] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [block, setBlock] = useState({});
  const [tx, setTx] = useState(null);
  const [lastTxIndex, setLastTxIndex] = useState(null);
  const [accountTxCount, setAccountTxCount] = useState(0); //  total des transactions du compte
 
  useEffect(() => {
    const init = async () => {
      const web3 = new Web3("http://127.0.0.1:7545");

      const accounts = await web3.eth.getAccounts();
      const currentAccount = accounts[0];
      setAccount(currentAccount);

      const netId = await web3.eth.net.getId();
      setNetworkId(netId);

      const latestBlock = await web3.eth.getBlock("latest", true);
      setBlock(latestBlock);

      //  Obtenir le nombre total de transactions depuis le compte actif
      const txCount = await web3.eth.getTransactionCount(currentAccount);
      setAccountTxCount(txCount);

      if (latestBlock.transactions.length > 0) {
        const index = latestBlock.transactions.length - 1;
        const txData = latestBlock.transactions[index];
        setLastTxIndex(index);
        setTx(txData);
      } else {
        setLastTxIndex(null);
        setTx(null);
      }
    };

    init();
  }, [refreshKey]);

  return (
    <div className="flex flex-col md:flex-row w-full gap-6 text-sm md:text-xs">
      {/* Partie gauche */}
      <div className="md:w-1/2 w-full p-4 bg-white rounded shadow-md">
        <h3 className="text-lg font-semibold mb-4" style={{ color: "rgb(0, 12, 103)" }}>
          Informations Réseau et Bloc
        </h3>
        <div className="mb-3 p-3 rounded" style={{ backgroundColor: "rgb(90, 119, 176)", color: "rgb(235, 248, 255)" }}>
          <p><strong>URL:</strong> http://127.0.0.1:7545</p>
          <p><strong>ID Réseau:</strong> {networkId}</p>
        </div>
        <div className="mb-3 p-3 border rounded bg-gray-50">
          <p><strong>Compte:</strong> {account}</p>
          <p><strong>Transactions envoyées :</strong> {accountTxCount}</p> {/*  */}
        </div>
        <div className="p-3 border rounded bg-gray-50 overflow-x-auto">
          <p><strong>Bloc #</strong> {block.number}</p>
          <p><strong>Hash:</strong> {block.hash}</p>
          <p><strong>Timestamp:</strong> {block.timestamp ? new Date(block.timestamp * 1000).toLocaleString() : ""}</p>
          <p><strong>Parent Hash:</strong> {block.parentHash}</p>
          <p><strong>Nonce:</strong> {block.nonce}</p>
          <p><strong>Transactions:</strong> {block.transactions?.length}</p>
          <p><strong>Miner:</strong> {block.miner}</p>
          <p><strong>Difficulty:</strong> {block.difficulty}</p>
          <p><strong>Gas Limit:</strong> {block.gasLimit}</p>
          <p><strong>Gas Used:</strong> {block.gasUsed}</p>
          <p><strong>Size:</strong> {block.size}</p>
        </div>
      </div>

      {/* Partie droite */}
      <div className="md:w-1/2 w-full p-4 bg-white rounded shadow-md">
        <h3 className="text-lg font-semibold mb-4" style={{ color: "rgb(0, 12, 103)" }}>
          Détails de la dernière Transaction {lastTxIndex !== null ? `#${lastTxIndex}` : "(Aucune transaction)"}
        </h3>

        {tx ? (
          <div className="p-3 border rounded bg-gray-50 overflow-x-auto">
            <p><strong>Expéditeur:</strong> {tx.from}</p>
            <p><strong>Destinataire:</strong> {tx.to}</p>
            <p><strong>Hash:</strong> {tx.hash}</p>
            <p><strong>Nonce:</strong> {tx.nonce}</p>
            <p><strong>Montant:</strong> {Web3.utils.fromWei(tx.value, "ether")} ETH</p>
            <p><strong>Limite de Gas:</strong> {tx.gas}</p>
            <p><strong>Fonction appelée:</strong> {tx.input !== '0x' ? 'Fonction du contrat' : 'N/A'}</p>
          </div>
        ) : (
          <p className="text-gray-500">Aucune transaction dans le dernier bloc</p>
        )}
      </div>
    </div>
  );
}
