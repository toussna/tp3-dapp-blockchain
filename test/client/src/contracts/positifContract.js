import Web3 from "web3";
import Positivite from "./Positivite.json"; 

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0xAe7a3C48d236A94C96856f3e7a7e99669faAD535";

const contract = new web3.eth.Contract(Positivite.abi, contractAddress);
export default contract;
