import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment, useEffect, useState } from "react";

import BaseModal from "../../BaseModal";
import PrimaryButton from "../../buttons/PrimaryButton";
import SecondaryButton from "../../buttons/SecondaryButton";

type Props = {
  defaultValue: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

const DescriptionModal: FC<Props> = ({
  isOpen,
  defaultValue,
  onChange,
  onClose,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} centerContent>
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
          <Dialog.Panel className="flex h-screen w-full max-w-md transform flex-col items-center justify-between overflow-hidden px-[21px] pb-12 pt-[41px] text-left align-middle transition-all">
            <div className="mb-auto" />
            <div className="w-full">
              <Dialog.Title
                as="h3"
                className="mb-1.5 text-center text-[32px] leading-none text-white/50 [text-shadow:_0_5px_10px_rgb(0_0_0_/_25%)]"
              >
                Description
              </Dialog.Title>
              <Dialog.Description className="mb-[18px] text-center text-sm leading-normal text-grayText">
                Leave the description empty to create a direct link
              </Dialog.Description>
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-[132px] w-full rounded-3xl border-none bg-primaryWhite/10 px-[21px] py-8 text-center text-sm text-grayText outline-none"
              />
            </div>
            <div className="mt-auto flex items-center gap-[17px]">
              <SecondaryButton
                onClick={() => {
                  setValue(defaultValue);
                  onClose();
                }}
                text="Back"
              />
              <PrimaryButton
                onClick={() => {
                  onChange(value);
                  onClose();
                }}
                text="Save"
              />
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Transition>
    </BaseModal>
  );
};

export default DescriptionModal;
