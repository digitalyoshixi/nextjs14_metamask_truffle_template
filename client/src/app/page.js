"use client"
import { useState, useEffect } from 'react';
import MessageContractABI from '../contracts/Message.json';
import { ethers } from 'ethers';
import Web3 from 'web3';

export default function Home() {
    const MessageContractAddress = "0x322118598fdDc972cb4717AbBA0fDa1cA9826EE5";
    const [message, setMessage] = useState('');
  
    const connectMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum);
            try{
                await window.ethereum.enable();
                const accounts = await web3.eth.getAccounts();
                const userAddress = accounts[0];
                const contract = new web3.eth.Contract(MessageContractABI.abi, MessageContractAddress);
                // Get the message from the contract
                const currentMessage = await contract.methods.getMessage().call();
                setMessage(currentMessage);
                console.log("Message:", currentMessage);
            }
            catch (err){
                console.log(err);
            }
        }
    };

    return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>hello</p>
      <button onClick={connectMetaMask}>Connect Wallet</button>
      <p>Message from contract: {message}</p>
    </div>);
}