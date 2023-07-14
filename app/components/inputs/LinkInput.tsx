import classNames from "classnames";
import React, { FC } from "react";

import { GRADIENT_INPUT_STYLE } from "./DescriptionInput";
import LoadingButton from "../buttons/LoadingButton";

const INPUT_STYLE = {
  ...GRADIENT_INPUT_STYLE,
  background: "linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)",
};

type Props = {
  value: string;
  isLoading: boolean;
  onAddClick: () => void;
  onChange: (value: string) => void;
};

const LinkInput: FC<Props> = ({ value, isLoading, onAddClick, onChange }) => (
  <div className="relative flex h-[59px] w-full items-center gap-2 rounded-3xl bg-primaryWhite/10 py-[7px] pl-[15px] pr-1.5">
    <span className="text-xl leading-none">🔗</span>
    <input
      type="url"
      placeholder="Add a Link, title or collection name"
      className="w-full border-none text-sm text-white transition-colors placeholder:text-white/50 focus-visible:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={value.length >= 30 ? INPUT_STYLE : { background: "transparent" }}
    />
    <div
      className={classNames({
        hidden: !value,
      })}
    >
      <LoadingButton isLoading={isLoading} onClick={onAddClick} text="Add" />
    </div>
  </div>
);

export default LinkInput;
