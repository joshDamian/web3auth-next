import { useContext } from "react";
import Web3AuthContext from "../context/Web3AuthProvider";

export default function useWeb3Auth() {
  const { chain, supportedChains, provider, web3auth, setProvider, rpc, tokens, tokenPrices, connecting } =
    useContext(Web3AuthContext);

  const isAuthenticated = provider && rpc;

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      const user = await web3auth.getUserInfo();
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const chainId = await rpc.getChainId();
    return chainId;
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const address = await rpc.getAccounts();
    return address;
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const balance = await rpc.getBalance();
    return balance;
  };

  const sendTransaction = async (destination, value) => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    if (!destination || !value) {
      console.log("destination or value not set");
      return;
    }
    
    const receipt = await rpc.sendTransaction(destination, value);
    return receipt;
  };

  const signMessage = async (message) => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const signedMessage = await rpc.signMessage(message);
    return signedMessage;
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const privateKey = await rpc.getPrivateKey();
    return privateKey;
  };

  return {
    chain,
    supportedChains,
    connecting,
    tokens,
    tokenPrices,
    provider,
    login,
    getUserInfo,
    logout,
    getChainId,
    getAccounts,
    getBalance,
    sendTransaction,
    signMessage,
    getPrivateKey,
    isAuthenticated,
  };
}
