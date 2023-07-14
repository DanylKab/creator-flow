import classNames from "classnames";
import React, { CSSProperties, FC, useState } from "react";

import CheckIcon from "../icons/CheckIcon";
import LoadingIcon from "../icons/LoadingIcon";

type Props = {
  text: string;
  isLoading: boolean;
  style?: CSSProperties;
  onClick: () => void;
};

const LoadingButton: FC<Props> = ({ text, isLoading, style, onClick }) => {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        if (!isLoading) {
          onClick();
        }
      }}
      onTransitionEnd={() => setIsFinished(true)}
      className={classNames(
        "relative flex h-[46px] w-[70px] flex-col items-center justify-center overflow-hidden rounded-full px-5 py-2 before:absolute before:bottom-0 before:left-0 before:h-full before:bg-[#66ffb6] hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
        { "bg-[#66ffb6]": isFinished },
        isLoading
          ? "bg-success before:w-full before:transition-width before:duration-loading"
          : "bg-primaryWhite before:w-[0%]",
      )}
      style={style}
    >
      <span
        className={classNames(
          "absolute -translate-y-1/2 text-base font-medium text-black",
          { hidden: isFinished },
          isLoading ? "-top-full" : "top-1/2",
        )}
      >
        {text}
      </span>
      <span
        className={classNames(
          "absolute",
          { hidden: isFinished },
          isLoading ? "top-1/2 -translate-y-1/2" : "top-full translate-y-0",
        )}
      >
        <LoadingIcon
          width={24}
          height={24}
          className={classNames("origin-center fill-white", {
            "animate-spin": isLoading,
          })}
        />
      </span>
      <span
        className={classNames(
          "absolute",
          isFinished ? "block animate-loadingScale" : "hidden",
        )}
      >
        <CheckIcon
          width={24}
          height={24}
          className="origin-center fill-white"
        />
      </span>
    </button>
  );
};

export default LoadingButton;
