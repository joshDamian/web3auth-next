import * as Dialog from "@radix-ui/react-dialog";
import { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Cross1Icon } from "@radix-ui/react-icons";
import cx from "classnames";
import { Root as TransferTokenAsset } from "./TransferTokenAsset";

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="border-tableBorder border py-2 px-4 hover:bg-tableBorder rounded-full text-slate-300">
          Transfer Asset
        </button>
      </Dialog.Trigger>
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay forceMount className="fixed inset-0 z-20 bg-black/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Content
            forceMount
            className={cx(
              "fixed z-50",
              "w-[95vw] max-w-md rounded-lg px-5 py-5 md:w-full",
              "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
              "bg-gray-800",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            )}
          >
            <Dialog.Title className="text-sm lg:text-lg font-medium text-gray-100">Transfer</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm font-normal text-gray-400">
              Send any of the crypto assets available in your wallet to another wallet.
            </Dialog.Description>

            <div className="my-6">
              <TransferTokenAsset closeModal={() => setIsOpen(false)} />
            </div>

            <Dialog.Close
              className={cx(
                "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
            >
              <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-400" />
            </Dialog.Close>
          </Dialog.Content>
        </Transition.Child>
      </Transition.Root>
    </Dialog.Root>
  );
};
