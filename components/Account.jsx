import { CopyToClipboard } from "react-copy-to-clipboard";
import AssetsTable from "./AssetsTable";
import Export from "./Export";
import { useEffect, useState } from "react";
import useWeb3Auth from "../hooks/useWeb3Auth";

function AccountDashboard() {
  const { isAuthenticated, getAccounts } = useWeb3Auth();

  const [copied, setCopied] = useState(false);
  const [address, setAddress] = useState();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAccounts().then(setAddress);
    }
  }, [isAuthenticated]);

  return (
    <>
      {address && (
        <div className="mt-5">
          <CopyToClipboard text={address} onCopy={handleCopy}>
            <button className="border-tableBorder border py-2 px-4 hover:bg-tableBorder rounded-full text-slate-300">
              {copied ? "Copied" : "Copy Wallet Address"}
            </button>
          </CopyToClipboard>
        </div>
      )}

      <AssetsTable />
      <Export />
    </>
  );
}

export default AccountDashboard;
