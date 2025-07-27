// conversionContract.js
import Web3 from "web3";
import ConversionEther from "./ConversionEther.json"; 

const web3 = new Web3("http://127.0.0.1:7545");

const contractAddress = "0x36A305fb1F1dA0e92ec6Bf9f9f78CA78728147a4";

const contract = new web3.eth.Contract(ConversionEther.abi, contractAddress);

export default contract;
