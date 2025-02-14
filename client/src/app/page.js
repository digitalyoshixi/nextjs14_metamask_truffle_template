"use client"
import { useState, useEffect } from 'react';
import MessageContractABI from '../contracts/Message.json';
import { ethers } from 'ethers';

export default function Home() {
    const [chainId, setChainId] = useState(0);
    const [userId, setUserId] = useState('');
    const [input, setInput] = useState('hi this is template');
    const MessageContractAddress = "0xfB992676E90a21e6446c5626Cb6f78F9f7d6BFFD";
  
      const connectMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
          } catch (error) {
            console.error("User rejected the request.");
          }
        } else {
          console.error("MetaMask is not installed.");  
        }
      };
    
      useEffect(() => {
        if (window.ethereum) {
          window.ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0]);
          });
    
          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });
        }
    
        return () => {
          if (window.ethereum) {
            window.ethereum.removeListener('accountsChanged', (accounts) => {
              setAccount(accounts[0]);
            });
    
            window.ethereum.removeListener('chainChanged', () => {
              window.location.reload();
            });
          }
        };
      }, []);

    const setMessage = async () => {
        console.log("setting message")
        try {
            const ethereum = window.ethereum;
            if (!ethereum) {
                console.log("Please install MetaMask!");
                return;
            }

            // Check if we're on the correct network
            const provider = new ethers.providers.Web3Provider(ethereum);
            const network = await provider.getNetwork();
            console.log("Current network:", network.chainId);

            // Get contract details for debugging
            const signer = provider.getSigner();
            const MessageContract = new ethers.Contract(
                MessageContractAddress,
                MessageContractABI.abi,
                signer
            );

            // Log some debug information
            console.log("Contract address:", MessageContractAddress);
            console.log("Message to set:", input);

            const tx = await MessageContract.setMessage(input, {
                gasLimit: 100000  // Explicitly set gas limit
            });
            console.log("Transaction hash:", tx.hash);
            await tx.wait();
            console.log("Transaction confirmed");
        }
        catch(err) {
            console.log(err)
            console.log("error")
        }
    }
    return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>hello {chainId} {userId}</p>
      <button onClick={connectMetaMask}>Connect Wallet</button>
      <button onClick={setMessage}>Set as Test message</button>
    </div>);
}
