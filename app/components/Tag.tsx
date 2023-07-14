import classNames from "classnames";
import React, { FC } from "react";

import MinusIcon from "./icons/MinusIcon";
import PlusIcon from "./icons/PlusIcon";

type Props = {
  label: string;
  isSelected: boolean;
  isDeleting?: boolean;
  onSelect: () => void;
  onRemove: () => void;
};

const Tag: FC<Props> = ({
  label,
  isSelected,
  isDeleting = false,
  onSelect,
  onRemove,
}) => (
  <div
    className={classNames(
      "flex items-center gap-[7px] rounded-[32px] bg-secondary px-[13px] py-2 text-sm font-medium drop-shadow-tagShadow",
      { "animate-tagFlashUp": isSelected && !isDeleting },
      { "animate-tagDisappear": isDeleting },
    )}
  >
    <span className="text-white">{label}</span>
    <div className="flex h-[13px] items-center">
      {!isSelected && (
        <div
          className="flex h-full cursor-pointer items-center pr-[9px]"
          onClick={onSelect}
        >
          <PlusIcon />
        </div>
      )}
      {!isSelected && <div className="h-full w-[1px] bg-white/10" />}
      <div
        className="flex h-full cursor-pointer items-center pl-[9px]"
        onClick={onRemove}
      >
        <MinusIcon />
      </div>
    </div>
  </div>
);

export default Tag;
