type Chain = {
  name: string;
  chainId: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    logo: string;
    token_address: string;
    decimals: number;
    isNative: true;
  };
  rpcUrl: string;
};

type SupportedChains = {
  [chainName: string]: Chain;
};

const supportedChains: SupportedChains = {
  "0x89": {
    name: "polygon",
    chainId: "0x89",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      logo: "/token-icons/polygon.svg",
      token_address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      decimals: 18,
      isNative: true,
    },
    rpcUrl: "https://rpc-mainnet.matic.network",
  },
};

export default supportedChains;
