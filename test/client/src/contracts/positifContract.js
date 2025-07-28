import Web3 from "web3";
import Positivite from "./Positivite.json"; 

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x801486b020455B4ED04C524D30BE70beBfC91177";

const contract = new web3.eth.Contract(Positivite.abi, contractAddress);
export default contract;
 