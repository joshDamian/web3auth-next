import TransferDialog from "./SendDialog";

export default () => (
  <div className="bg-light px-5 py-6 lg:px-7 rounded-[15px] mt-16 lg:mt-12">
    <h3 className="text-xl font-bold">Transactions</h3>
    <div className="flex mt-8">
      <div className="mr-6">
        <TransferDialog />
      </div>
    </div>
  </div>
);
