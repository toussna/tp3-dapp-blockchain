import Web3 from "web3";
import ListeNombres from "./ListeNombres.json"; 

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x99D31bfA3AB40BfD41EE6b6536F07f24B2f6f18e"; 

const contract = new web3.eth.Contract(ListeNombres.abi, contractAddress);
export default contract;
 