import React, { useEffect, useState } from "react";
import useWeb3Auth from "../hooks/useWeb3Auth";

const currencies = {
  137: "MATIC",
};
const networkNames = {
  137: "Polygon",
};

function AccountDashboard() {
  const { isAuthenticated, getBalance, getChainId, getAccounts } = useWeb3Auth();

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
  }, [isAuthenticated]);
  return (
    <div>
      <h1 className="border-b text-white border-slate-800 pb-2 text-2xl lg:text-4xl font-semibold">Account</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-8">
        <div className="bg-[#5858FB] shadow-lg py-10 rounded-[15px] px-6 lg:px-8 overflow-x-auto">
          <h3 className="text-lg lg:text-xl text-center font-semibold">Wallet Address</h3>
          <p className="text-sm bg-[#213A92] p-5 text-center mt-3 rounded-[15px] shadow-md overflow-ellipsis truncate break-all font-bold">
            {walletAddress}
          </p>
        </div>

        <div className="bg-[#5858FB] shadow-lg py-10 rounded-[15px] px-6 lg:px-8 overflow-x-auto">
          <h3 className="text-lg lg:text-xl text-center font-semibold">Wallet Balance</h3>
          <p className="p-5 text-white text-center text-3xl lg:text-5xl font-bold">
            {Number(walletBalance).toFixed(3)} <span className="text-base">{currencies[chainId]}</span>
          </p>
        </div>

        <div className="bg-[#5858FB] shadow-lg py-10 rounded-[15px] px-6 lg:px-8 overflow-x-auto">
          <h3 className="text-lg lg:text-xl text-center font-semibold">Network</h3>
          <p className="p-5 text-center text-3xl lg:text-5xl font-bold">{networkNames[chainId]}</p>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
