import React, { useEffect, useState } from "react";
import useWeb3Auth from "../hooks/useWeb3Auth";

const currencies = {
  137: "MATIC",
};

function AccountDashboard() {
  const { provider, getBalance, getChainId, getAccounts } = useWeb3Auth();

  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [chainId, setChainId] = useState("");

  useEffect(() => {
    async function init() {
      setWalletAddress(await getAccounts());
      setChainId(await getChainId());
      setWalletBalance(await getBalance());
    }
    init();
  }, [provider]);
  return (
    <div className="card">
      <h3>Wallet: {walletAddress}</h3>
      <h3>
        Balance: {Number(walletBalance).toFixed(3)} {currencies[chainId]}
      </h3>
      <h3>ChainId: {chainId}</h3>
    </div>
  );
}

export default AccountDashboard;
