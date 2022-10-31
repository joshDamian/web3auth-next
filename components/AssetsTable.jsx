import useWeb3Auth from "../hooks/useWeb3Auth";
import TokenData from "./TokenData";

function AssetsTable() {
  const { tokens } = useWeb3Auth();
  return (
    <div className="bg-light px-5 pt-6 lg:px-7 pb-1 rounded-[15px] mt-16 lg:mt-12">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Assets</h3>
        <div className="rounded-full text-sm p-0.5 font-semibold lg:min-w-[200px] flex border border-tableBorder">
          <span className="bg-tableBorder flex-1 text-center rounded-full px-4 text-[#fffeff] py-2.5">Tokens</span>
          <span className="px-4 flex flex-1 justify-center py-2.5 text-[#95a4b8]">NFTs</span>
        </div>
      </div>

      <section className="mt-8 table w-full">
        <div className="hidden md:table-header-group">
          <div className="table-row text-tableHeading">
            <div className="table-cell pl-5 py-5 text-left">Token</div>
            <div className="hidden md:table-cell text-left">Price</div>
            <div className="table-cell text-left pr-4">Balance</div>
          </div>
        </div>
        {tokens && (
          <div className="table-row-group">
            {tokens.map((tokenInfo, index) => (
              <TokenData key={index} tokenInfo={tokenInfo} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AssetsTable;
