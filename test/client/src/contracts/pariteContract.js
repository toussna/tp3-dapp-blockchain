import Web3 from "web3";
import Parite from "./Parite.json"; // ABI générée par Truffle après compilation

const web3 = new Web3("http://127.0.0.1:7545");

const contractAddress = "0x55EaD1DBFe32A5908252BD8e9bd48380177C5aE8"; 
const contract = new web3.eth.Contract(Parite.abi, contractAddress);
export default contract;
