"use client";

import { Glean } from "@prisma/client";
import React, { FC } from "react";

import { isUrl } from "@/app/helpers/isUrl";
import { PopulatedGlean } from "@/app/services/gleans.service";

import GleanEmoji from "../GleanEmoji";
import GleanImage from "../GleanImage";
import Tag from "../Tag";

type Props = {
  glean: PopulatedGlean;
};

const GleanCard: FC<Props> = ({ glean }) => {
  return (
    <article className="flex flex-col gap-3">
      <header className="flex items-center gap-2">
        {isUrl(glean.image) ? (
          <GleanImage
            src={glean.image}
            title={glean.title}
            height={120}
            width={120}
          />
        ) : (
          <GleanEmoji emoji={glean.image} style={{ width: 120, height: 120 }} />
        )}
        <div className="flex flex-col gap-2">
          <h5 className="text-[32px] font-medium leading-none text-white">
            {glean.title}
          </h5>
          {!!glean.collections.length && (
            <p className="text-sm text-white">
              {glean.collections.map((c) => c.collection.name).join(", ")}
            </p>
          )}
          {!!glean.tags.length && (
            <ul className="flex items-center gap-2">
              {glean.tags.map(({ tag }) => (
                <div key={tag.id} className="rounded-xl bg-primaryWhite p-2">
                  {tag.name}
                </div>
              ))}
            </ul>
          )}
        </div>
      </header>
      {!!glean.description && (
        <p className="text-sm text-white">{glean.description}</p>
      )}
    </article>
  );
};

export default GleanCard;
