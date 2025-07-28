import Web3 from "web3";
import Payment from "./Payment.json"; 

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0xC4F02E21c156A60EfA8Ea7AD803e43C2D5146670"; 

const contract = new web3.eth.Contract(Payment.abi, contractAddress);
export default contract;
 