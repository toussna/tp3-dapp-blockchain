import Web3 from "web3";
import Rectangle from "./Rectangle.json"; 

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x2BA2a1247BD1fa3B32724986D9546e86c4548903"; 

const contract = new web3.eth.Contract(Rectangle.abi, contractAddress);
export default contract;
