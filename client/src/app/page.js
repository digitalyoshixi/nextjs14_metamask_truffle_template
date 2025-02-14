"use client"
import { useState, useEffect } from 'react';
import MessageContractABI from '../contracts/Message.json';
import { ethers } from 'ethers';
import Web3 from 'web3';

export default function Home() {
    const MessageContractAddress = "0xADB6e99C87a4c2089f363608aa4c313d6d4188b9";
  
      const connectMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum);
            try{
                await window.ethereum.enable();
                const accounts = await web3.eth.getAccounts();
                const userAddress = accounts[0];
                const contract = new web3.eth.Contract(MessageContractABI.abi, MessageContractAddress);
                // print out user's data
                const data = await contract.methods.getMessage().call();
                console.log(data);
            }
            catch (err){
                console.log(err);
            }
          //let ourchainId = await window.ethereum.request({ method: 'eth_chainId' });
          //setChainId(ourchainId);
          //const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          //setUserId(accounts[0]);
      }};

    return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>hello</p>
      <button onClick={connectMetaMask}>Connect Wallet</button>
    </div>);
}