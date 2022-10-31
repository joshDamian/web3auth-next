import { useEffect, useState } from "react";
import useWeb3Auth from "../hooks/useWeb3Auth";
import { formatAsDollar, formatToEther, roundOff } from "../utils/format";

function NetWorth() {
  const { tokens, tokenPrices } = useWeb3Auth();
  const [netWorth, setNetWorth] = useState(0);

  useEffect(() => {
    if (tokens && tokens.length > 0 && tokenPrices) {
      const tokensValue = tokens.map((token) => {
        const price = tokenPrices[token.token_address]?.usdPrice;
        const balanceInEther = formatToEther(token.balance, token.decimals);
        return parseFloat(roundOff(price)) * parseFloat(balanceInEther);
      });
      setNetWorth(tokensValue.reduce((a, b) => a + b, 0));
    }
  }, [tokenPrices]);

  return (
    <div>
      <h3 className="text-slate-500 text-lg mb-2">Net Worth</h3>
      <h3 className="font-extrabold text-white text-3xl lg:text-4xl">{formatAsDollar(netWorth)}</h3>
    </div>
  );
}

export default NetWorth;
