import Web3 from "web3";
import ListeNombres from "./ListeNombres.json"; 

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0xf3cAB6e4C219Ea4d53404323aA5236e92830551B"; 

const contract = new web3.eth.Contract(ListeNombres.abi, contractAddress);
export default contract;
