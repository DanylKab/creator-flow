import classNames from "classnames";
import React, { FC, useState } from "react";

type Props = {
  text: string;
  onClick: () => void;
};

const SuccessButton: FC<Props> = ({ text, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(true);
    setTimeout(() => {
      onClick();
      setIsExpanded(false);
    }, 3000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={classNames(
        "flex h-[46px] w-[107px] items-center justify-center rounded-full bg-success px-5 py-2 text-base font-medium text-white transition-all duration-1000 hover:bg-success focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
        {
          "pointer-events-none animate-bounce": isExpanded,
        },
      )}
    >
      {text}
    </button>
  );
};

export default SuccessButton;
