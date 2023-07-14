import { Dialog, Transition } from "@headlessui/react";
import { GleanCollection } from "@prisma/client";
import React, { FC, Fragment, useEffect, useState } from "react";

import CollectionItem from "./CollectionItem";
import BaseModal from "../../BaseModal";
import PrimaryButton from "../../buttons/PrimaryButton";
import CollectionIcon from "../../icons/CollectionIcon";

type Props = {
  collections: GleanCollection[];
  defaultValue?: string[];
  onChange: (collections: string[]) => void;
};

const SelectCollection: FC<Props> = ({
  collections,
  defaultValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedCollections, setSelectedCollections] = useState<Set<string>>(
    new Set(defaultValue || []),
  );

  const handleCollectionClick = (id: string) => {
    setSelectedCollections((prevSelected) => {
      if (prevSelected.has(id)) {
        prevSelected.delete(id);
        return new Set(prevSelected);
      }

      return new Set(prevSelected.add(id));
    });
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedCollections(new Set(defaultValue));
    }
  }, [defaultValue]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-[5px] border-none bg-transparent text-sm text-grayText"
      >
        Add to collection
        <CollectionIcon />
      </button>

      <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-400"
          enterFrom="opacity-0 scale-75"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <Dialog.Panel className="flex h-screen w-full max-w-md transform flex-col items-center justify-between overflow-hidden px-[27px] pb-[51px] pt-[106px] text-center align-middle transition-all">
            <Dialog.Title
              as="h3"
              className="text-center text-[32px] leading-loose text-white/50 [text-shadow:_0_5px_10px_rgb(0_0_0_/_25%)]"
            >
              Collections
            </Dialog.Title>
            <div className="my-[88px] flex flex-1 flex-col gap-[13px] overflow-auto">
              {collections.map(({ id, name }) => (
                <CollectionItem
                  key={id}
                  label={name}
                  isSelected={selectedCollections.has(id)}
                  onClick={() => handleCollectionClick(id)}
                />
              ))}
            </div>
            <div>
              <PrimaryButton
                onClick={() => {
                  setIsOpen(false);
                  onChange(Array.from(selectedCollections));
                }}
                text="Save"
              />
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </BaseModal>
    </>
  );
};

export default SelectCollection;
