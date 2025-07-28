import Web3 from "web3";
import GestionChaines from "./GestionChaines.json";

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x851664d807675946ACA45D3098dd416217BC3065"; 
const contract = new web3.eth.Contract(GestionChaines.abi, contractAddress);

export default contract;
