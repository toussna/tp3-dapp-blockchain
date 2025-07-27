import Web3 from "web3";
import Addition from "./Addition.json";

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x06A27C6d65E405c325cd0aD5A937520B26635504"; 
const contract = new web3.eth.Contract(Addition.abi, contractAddress);

export default contract;
