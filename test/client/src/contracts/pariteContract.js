import Web3 from "web3";
import Parite from "./Parite.json"; // ABI générée par Truffle après compilation

const web3 = new Web3("http://127.0.0.1:7545");

const contractAddress = "0xD22cCe70d9BE2543bC3bBc5b83A7962EA0066743"; 
const contract = new web3.eth.Contract(Parite.abi, contractAddress);
export default contract;
 