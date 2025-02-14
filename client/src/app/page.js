"use client"
import { useState } from 'react';

export default function Home() {
    const [chainId, setChainId] = useState(0);
    const [userId, setUserId] = useState('');
  
    const connectWallet = async () => {
      try{
          const {ethereum} = window; // grab access to eth 
          if (ethereum == null){
            console.log("Make sure you have metamask!")
            return
          }
          // get the ethereum chain id 
          const ourchainId = await ethereum.request({method: 'eth_chainId'});
          setChainId(ourchainId);
          console.log("connected to chain",ourchainId);
          // get user account
          const accounts = await ethereum.request({method: 'eth_requestAccounts'});
          setUserId(accounts[0])
          console.log('Found Account', accounts[0]);

        
      }
      catch(err){
        console.log(err)
      }
    }
    return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>hello {chainId} {userId}</p>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>);
}
