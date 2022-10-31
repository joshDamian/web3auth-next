import Image from "next/image";
import useWeb3Auth from "../hooks/useWeb3Auth";
import { roundOff, formatToEther, formatAsDollar } from "../utils/format";

function TokenData({ tokenInfo }) {
  const { tokenPrices } = useWeb3Auth();
  const tokenPrice = tokenPrices ? tokenPrices[tokenInfo.token_address]?.usdPrice : 0;
  const balanceInEther = roundOff(formatToEther(tokenInfo?.balance, tokenInfo.decimals), 3);

  const calculateValue = () => {
    return parseFloat(roundOff(tokenPrice)) * parseFloat(balanceInEther);
  };

  console.log(tokenInfo);

  if (tokenInfo) {
    return (
      <div className="table-row">
        <div className="table-cell md:pl-5 py-5 align-middle border-tableBorder md:border-t text-left">
          <div className="flex items-center">
            <Image
              alt="token"
              src={tokenInfo.logo || `https://ui-avatars.com/api/?name=${tokenInfo.symbol}`}
              height={40}
              className="rounded-full"
              width={40}
            />
            <div className="ml-3">
              <h3 className="text-[#fffeff] uppercase font-bold">{tokenInfo.symbol}</h3>
              <h3 className="text-tableHeading">{tokenInfo.name}</h3>
            </div>
          </div>
        </div>
        <div className="align-middle hidden md:table-cell font-bold border-tableBorder md:border-t text-left">
          {formatAsDollar(tokenPrice)}
        </div>
        <div className="table-cell md:pr-5 align-middle border-tableBorder md:border-t text-right md:text-left">
          <h3 className="font-bold text-[#fffeff]">{formatAsDollar(calculateValue())}</h3>
          <h3 className="text-tableHeading uppercase">
            {balanceInEther} {tokenInfo.symbol}
          </h3>
        </div>
      </div>
    );
  }
}

export default TokenData;
