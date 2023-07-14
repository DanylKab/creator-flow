import React, { FC, useState } from "react";

import DescriptionModal from "./DescriptionModal";

const MAX_LENGTH = 150;
export const GRADIENT_INPUT_STYLE = {
  background:
    "linear-gradient(180deg, #B9B9B9 0%, rgba(185, 185, 185, 0.00) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
};

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const DescriptionInput: FC<Props> = ({ value, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shouldOpenModal = value.trim().length >= MAX_LENGTH;

  const handleClick = () => {
    if (shouldOpenModal && !isModalOpen) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={handleClick}
        style={
          shouldOpenModal ? GRADIENT_INPUT_STYLE : { background: "transparent" }
        }
        placeholder="Enter description..."
        className="h-[68px] w-full border-none text-sm leading-tight text-grayText outline-none transition-colors"
      />
      <DescriptionModal
        defaultValue={value}
        isOpen={isModalOpen}
        onChange={onChange}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DescriptionInput;
