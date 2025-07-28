// conversionContract.js
import Web3 from "web3";
import ConversionEther from "./ConversionEther.json"; 

const web3 = new Web3("http://127.0.0.1:7545");

const contractAddress = "0x2824cb7A2E306012342DAbA6A54Cba36Fd43af30";

const contract = new web3.eth.Contract(ConversionEther.abi, contractAddress);

export default contract;
