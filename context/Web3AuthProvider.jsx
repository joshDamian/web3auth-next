import { createContext, useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import RPC from "../ethersRPC";
import chains from "../supportedChains";
import axios from "axios";
import { ADAPTER_EVENTS } from "@web3auth/base";

const Web3AuthContext = createContext({});

export const Web3AuthProvider = ({ clientId, children }) => {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [chain, setChain] = useState("0x89");
  const [rpc, setRpc] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [tokenPrices, setTokenPrices] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const supportedChains = Object.keys(chains);

  // subscribe to lifecycle events emitted by web3auth
  const subscribeAuthEvents = (web3auth) => {
    web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
      console.log("connected to wallet", data);
      setConnecting(false);
      // web3auth.provider will be available here after user is connected
    });
    web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
      console.log("connecting");
      setConnecting(true);
    });
    web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      console.log("disconnected");
      setConnecting(false);
    });
    web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      console.log("error", error);
      setConnecting(false);
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: chain,
            rpcTarget: chains[chain].rpcUrl,
            displayName: chains[chain].name,
            ticker: chains[chain].nativeCurrency.symbol,
            tickerName: chains[chain].name,
          },
        });

        subscribeAuthEvents(web3auth);

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
    } else {
      setRpc(null);
    }
  }, [provider]);

  useEffect(() => {
    async function loadTokens() {
      try {
        const address = await rpc.getAccounts();
        const { data, status } = await axios.post("/api/tokens", {
          address,
          chain,
        });
        let tokens = [];
        const nativeBalance = await rpc.getBalance();
        tokens.push({
          ...chains[chain].nativeCurrency,
          balance: nativeBalance,
        });
        if (status === 200) {
          tokens.push(...data);
        }
        setTokens(tokens);
      } catch (err) {
        console.error(err);
      }
    }
    if (rpc) {
      loadTokens();
    }
  }, [rpc]);

  useEffect(() => {
    async function loadPrices() {
      let prices = {};
      await Promise.all(
        tokens.map(async (token) => {
          prices[token.token_address] = (
            await axios.post("/api/token-price", {
              address: token.token_address,
              chain,
            })
          ).data;
        })
      );
      prices[chains[chain].nativeCurrency.token_address] = (
        await axios.post("/api/token-price", {
          address: chains[chain].nativeCurrency.token_address,
          chain,
        })
      ).data;
      setTokenPrices(prices);
    }
    if (tokens) {
      loadPrices();
    }
  }, [tokens]);

  return (
    <Web3AuthContext.Provider
      value={{
        provider,
        supportedChains,
        chain,
        setChain,
        web3auth,
        setProvider,
        rpc,
        tokens,
        tokenPrices,
        connecting,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export default Web3AuthContext;
