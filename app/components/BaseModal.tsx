import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { FC, Fragment, ReactNode } from "react";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  centerContent?: boolean;
};

const BaseModal: FC<Props> = ({
  children,
  isOpen,
  onClose,
  centerContent = false,
}) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-400"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-opacity-25 dark:bg-black/25 dark:backdrop-blur-[50px]"
          aria-hidden="true"
        />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div
          className={classNames(
            "flex min-h-full justify-center text-center",
            centerContent ? "items-center" : "items-end",
          )}
        >
          {children}
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default BaseModal;
