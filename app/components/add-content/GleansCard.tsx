import Image from "next/image";
import React, { FC } from "react";

type Props = {
  onClick: () => void;
};

const GleansCard: FC<Props> = ({ onClick }) => (
  <article
    className="flex cursor-pointer flex-col items-center gap-3"
    onClick={onClick}
  >
    <div className="relative h-[97px] w-[124px]">
      <Image
        alt="glean 1"
        src="/img/glean-1-new.png"
        width={87}
        height={83}
        className="absolute left-0 top-0 z-10 animate-imageMove1"
        quality={90}
      />
      <Image
        alt="glean 2"
        src="/img/glean-2.png"
        width={28}
        height={45}
        className="absolute right-0 top-0 animate-imageMove2"
        quality={90}
      />
      <Image
        alt="glean 3"
        src="/img/glean-3.png"
        width={75}
        height={47}
        className="absolute bottom-0 right-0 animate-imageMove3"
        quality={90}
      />
    </div>
    <div className="flex max-w-[117px] flex-col gap-2.5 text-center">
      <h5 className="text-sm font-medium leading-4 text-white">
        Create a Glean
      </h5>
      <p className="text-sm leading-4 text-white/70">
        Add content, links & descriptive text
      </p>
    </div>
  </article>
);

export default GleansCard;
