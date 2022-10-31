import { useEffect, useState } from "react";
import useWeb3Auth from "../hooks/useWeb3Auth";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Export() {
  const { isAuthenticated, getPrivateKey } = useWeb3Auth();
  const [privateKey, setPrivateKey] = useState();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getPrivateKey().then(setPrivateKey);
    }
  }, [isAuthenticated]);

  return (
    <>
      {privateKey && (
        <div className="bg-light px-5 py-6 lg:px-7 rounded-[15px] mt-16 lg:mt-12">
          <h3 className="text-xl font-bold">Export Wallet</h3>
          <div
            className="flex p-4 mt-10 max-w-fit mx-auto mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Potential Risk!</span> Only use this feature if you need to import your
              wallet somewhere else <strong>ON YOUR DEVICE</strong>. <br />
              Remember not to share your private key with anybody.
            </div>
          </div>
          <div className="py-10 flex justify-center">
            <CopyToClipboard text={privateKey} onCopy={handleCopy}>
              <button
                disabled={copied}
                className="bg-red-600 hover:bg-gray-700 text-white rounded-[15px] disabled:cursor-not-allowed py-3 px-5 font-semibold text-lg transition-all duration-500 lg:text-xl shadow-lg"
              >
                {copied ? "Copied" : "Copy Private Key"}
              </button>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </>
  );
}

export default Export;
