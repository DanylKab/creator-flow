import classNames from "classnames";
import React, { FC } from "react";

type Props = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

const CollectionItem: FC<Props> = ({ isSelected, label, onClick }) => (
  <div
    className={classNames(
      "rounded-3xl px-6 py-2.5 text-sm leading-[15px] text-white transition-colors",
      {
        "bg-primaryWhite/10": isSelected,
      },
    )}
    onClick={onClick}
  >
    {label}
  </div>
);

export default CollectionItem;
