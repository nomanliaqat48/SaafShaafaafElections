// src/context/Web3Context.js

import React, { createContext, useState, useEffect } from "react";
import { getWeb3, connectWithMetamask } from "../helpers/web3";
import contractABI from "../contracts/election_contract_abi.json";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const [contract, setContract] = useState(null);

  const contractAddress = "0x5D722306C9818d47553F99342E7F539439Badf87";

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        web3Instance && setWeb3(web3Instance);
        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);
      } catch (error) {
        console.error("Failed to load web3", error);
      }
    };
    initWeb3();
  }, []);


  const connectWallet = async () => {
    try {
      const account = await connectWithMetamask();
      setAccount(account);
    } catch (err) {
      setError("Failed to connect to MetaMask");
    }
  };

  return (
    <Web3Context.Provider
      value={{ web3, account, connectWallet, error, contract}}
    >
      {children}
    </Web3Context.Provider>
  );
};
