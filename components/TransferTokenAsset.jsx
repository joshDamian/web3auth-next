import { useEffect, useState } from "react";
import useWeb3Auth from "../hooks/useWeb3Auth";
import { formatToEther } from "../utils/format";
import Loader from "./Loader";
import SendAssetForm from "./SendAssetForm";
import { roundOff } from "../utils/format";

export const Root = ({ closeModal }) => {
  const { tokens } = useWeb3Auth();
  const [tokenId, setTokenId] = useState();

  useEffect(() => {
    if (tokens) {
      setTokenId(0);
    }
  }, [tokens]);

  if (tokenId !== null) {
    return (
      <div>
        <select defaultValue={tokenId} className="bg-transparent border-tableBorder border rounded-md py-2 px-5">
          {tokens.map((tokenData, i) => (
            <option className="uppercase" key={i} value={tokenData.token_address}>
              {tokenData.symbol} ({roundOff(formatToEther(tokenData.balance, tokenData.decimals))})
            </option>
          ))}
        </select>

        <div>{tokens[tokenId] && <TransferToken token={tokens[tokenId]} closeModal={closeModal} />}</div>
      </div>
    );
  }
  return <Loader />;
};

export const TransferToken = ({ token, closeModal }) => {
  const { sendTransaction } = useWeb3Auth();

  const transferToken = async (data) => {
    if (token.isNative) {
      return await sendTransaction(data.destination, data.amount);
    }
  };

  return (
    <>
      <SendAssetForm onSubmit={transferToken} token={token} />
    </>
  );
};
