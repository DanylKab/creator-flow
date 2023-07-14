import React, { FC } from "react";

type Props = {
  title: string;
  src: string;
  width?: number;
  height?: number;
};

const GleanImage: FC<Props> = ({ title, src, height = 240, width = 240 }) => (
  <div className="relative overflow-hidden rounded-3xl">
    <img
      alt={title}
      src={src}
      className="object-cover"
      width={width}
      height={height}
    />
  </div>
);

export default GleanImage;
