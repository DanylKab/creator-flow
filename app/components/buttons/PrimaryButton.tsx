import React, { FC } from "react";

type Props = {
  text: string;
  onClick: () => void;
};

const PrimaryButton: FC<Props> = ({ text, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="h-[46px] rounded-full bg-primaryWhite px-5 py-2 text-base font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    {text}
  </button>
);

export default PrimaryButton;
