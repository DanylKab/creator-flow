import classNames from "classnames";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

const IMAGES = [
  {
    id: 1,
    path: "/img/collection-1.png",
    width: 90,
    height: 90,
    position: "left-0 top-0",
  },
  {
    id: 2,
    path: "/img/collection-2.png",
    width: 42,
    height: 43,
    position: "right-0 top-0",
  },
  {
    id: 3,
    path: "/img/collection-3.png",
    width: 19,
    height: 19,
    position: "right-[23px] top-[47px]",
  },
  {
    id: 4,
    path: "/img/collection-4.png",
    width: 19,
    height: 19,
    position: "right-0 top-[47px]",
  },
  {
    id: 5,
    path: "/img/collection-5.png",
    width: 19,
    height: 19,
    position: "bottom-0 right-[23px]",
  },
  {
    id: 6,
    path: "/img/collection-6.png",
    width: 19,
    height: 19,
    position: "bottom-0 right-0",
  },
];

type Props = {
  onClick: () => void;
};

const CollectionsCard: FC<Props> = ({ onClick }) => {
  const [fadedIdx, setFadedIdx] = useState(
    Math.floor(Math.random() * IMAGES.length),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadedIdx(Math.floor(Math.random() * IMAGES.length));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <article
      className="flex cursor-pointer flex-col items-center gap-3"
      onClick={onClick}
    >
      <div className="relative h-[90px] w-[137px]">
        {IMAGES.map(({ height, id, path, position, width }, idx) => (
          <Image
            key={id}
            alt={`collection ${id}`}
            src={path}
            width={width}
            height={height}
            className={classNames(
              "absolute transition-opacity duration-700 ease-in-out",
              position,
              { "opacity-0": idx === fadedIdx },
            )}
            quality={90}
          />
        ))}
      </div>
      <div className="mt-1.5 flex max-w-[103px] flex-col gap-2.5 text-center">
        <h5 className="text-sm font-medium leading-4 text-white">Collection</h5>
        <p className="text-sm leading-4 text-white/70">
          Organise gleans & direct links
        </p>
      </div>
    </article>
  );
};

export default CollectionsCard;
