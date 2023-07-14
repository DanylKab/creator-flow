import React, { FC } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const TitleInput: FC<Props> = ({ value, onChange }) => (
  <textarea
    className="w-full border-none bg-transparent text-[32px] font-medium leading-9 text-white outline-none"
    placeholder="Enter title..."
    rows={2}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default TitleInput;
