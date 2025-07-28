import Web3 from "web3";
import Addition from "./Addition.json";

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0xdC3B81126e46e5a4CDBC46924f6B912B660252DE"; 
const contract = new web3.eth.Contract(Addition.abi, contractAddress);

export default contract;

