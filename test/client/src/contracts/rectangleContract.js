import Web3 from "web3";
import Rectangle from "./Rectangle.json"; 
 
const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0xB454e080809ed0965fa1feBD689BD7F33635f00d"; 

const contract = new web3.eth.Contract(Rectangle.abi, contractAddress);
export default contract;
