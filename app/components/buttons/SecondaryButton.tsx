import React, { FC } from "react";

type Props = {
  text: string;
  onClick: () => void;
};

const SecondaryButton: FC<Props> = ({ text, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="h-[46px] rounded-full bg-secondary px-[17px] py-2 text-base font-medium text-secondaryText hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    {text}
  </button>
);

export default SecondaryButton;
