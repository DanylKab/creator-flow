import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";

import SuccessButton from "../buttons/SuccessButton";

type Props = {
  isOpen: boolean;
  onDone: () => void;
};

const Success: FC<Props> = ({ isOpen, onDone }) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-400"
      enterFrom="opacity-0 scale-75"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-75"
    >
      <Dialog.Panel className="flex h-screen w-full max-w-md transform flex-col items-center justify-end overflow-hidden px-[27px] py-[38px] pt-[57px] text-center align-middle transition-all">
        <div className="flex flex-1 items-end">
          <SuccessButton text="Done" onClick={onDone} />
        </div>
      </Dialog.Panel>
    </Transition.Child>
  </Transition>
);

export default Success;
