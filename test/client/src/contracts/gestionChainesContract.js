import Web3 from "web3";
import GestionChaines from "./GestionChaines.json";

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x13a13902c7456224ce267736A4E9E7aaD47f920f"; 
const contract = new web3.eth.Contract(GestionChaines.abi, contractAddress);

export default contract;
