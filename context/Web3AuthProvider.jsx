import { createContext, useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import RPC from "../ethersRPC";

const Web3AuthContext = createContext({});

export const Web3AuthProvider = ({ clientId, children }) => {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [chain, setChain] = useState("0x89");
  const [rpc, setRpc] = useState(null);

  const rpcTargets = {
    "0x89": "https://rpc-mainnet.matic.network",
  };

  const supportedChains = Object.keys(rpcTargets);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: chain,
            rpcTarget: rpcTargets[chain],
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (provider) {
      setRpc(new RPC(provider));
    }
  }, [provider]);

  return (
    <Web3AuthContext.Provider value={{ provider, supportedChains, chain, setChain, web3auth, setProvider, rpc }}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export default Web3AuthContext;
