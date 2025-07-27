import Web3 from "web3";
import Payment from "./Payment.json"; 

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x6Cd118EAA0D440bA49B94dB729FEcEc73B79509e"; 

const contract = new web3.eth.Contract(Payment.abi, contractAddress);
export default contract;
