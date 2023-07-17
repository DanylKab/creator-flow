import { Dialog, Transition } from "@headlessui/react";
import { GleanCollection, GleanTag } from "@prisma/client";
import React, { Dispatch, FC, Fragment, SetStateAction, useState } from "react";

import { isUrl } from "@/app/helpers/isUrl";
import { GleanData } from "@/app/types/glean";

import LoadingButton from "../buttons/LoadingButton";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import GleanEmoji from "../GleanEmoji";
import GleanImage from "../GleanImage";
import DescriptionInput from "../inputs/DescriptionInput";
import SelectCollection from "../inputs/SelectCollection";
import TitleInput from "../inputs/TitleInput";
import Tag from "../Tag";

type Props = {
  glean: GleanData;
  setGlean: Dispatch<SetStateAction<GleanData>>;
  gleanTags: (GleanTag & { isDeleting?: boolean })[];
  gleanCollections: GleanCollection[];
  isOpen: boolean;
  isLoading: boolean;
  onCreateGlean: () => void;
  onBack: () => void;
};

const AddGlean: FC<Props> = ({
  isOpen,
  glean,
  gleanTags,
  gleanCollections,
  isLoading,
  setGlean,
  onCreateGlean,
  onBack,
}) => {
  const [tags, setTags] = useState(gleanTags);

  const handleRemoveTag = (id: string) => {
    const tagIdx = tags.findIndex((tag) => tag.id === id);
    let newTags = [...tags];
    newTags[tagIdx] = { ...newTags[tagIdx], isDeleting: true };

    setTags(newTags);
    setTimeout(() => {
      setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));

      const selectedTagIdx = glean.tags.findIndex((tag) => tag === id);
      if (selectedTagIdx !== -1) {
        const newSelectedTags = [...glean.tags];
        newSelectedTags.splice(selectedTagIdx, 1);
        setGlean((prev) => ({ ...prev, tags: newSelectedTags }));
      }
    }, 500);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-400"
        enterFrom="opacity-0 scale-75"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-75"
        afterLeave={() => {
          setTags(gleanTags);
        }}
      >
        <Dialog.Panel className="flex h-screen w-full max-w-md transform flex-col items-center justify-start overflow-auto px-[27px] py-[38px] pt-[57px] text-center align-middle transition-all">
          <div className="mb-[42px]">
            {isUrl(glean.image) ? (
              <GleanImage src={glean.image} title={glean.title} />
            ) : (
              <GleanEmoji emoji={glean.image} />
            )}
          </div>
          <div className="mb-[13px] w-full px-4">
            <TitleInput
              onChange={(value) =>
                setGlean((prev) => ({ ...prev, title: value }))
              }
              value={glean.title}
            />
          </div>
          <div className="mb-5 w-full px-5">
            <DescriptionInput
              onChange={(value) =>
                setGlean((prev) => ({ ...prev, description: value }))
              }
              value={glean.description}
            />
          </div>
          {!!tags.length && (
            <div className="mb-14 flex flex-wrap items-center justify-center gap-2.5">
              {tags.map(({ name, id, isDeleting }) => (
                <Tag
                  key={id}
                  label={name}
                  isSelected={glean.tags.includes(id)}
                  isDeleting={isDeleting}
                  onSelect={() =>
                    setGlean((prev) => ({ ...prev, tags: [...prev.tags, id] }))
                  }
                  onRemove={() => handleRemoveTag(id)}
                />
              ))}
            </div>
          )}
          <SelectCollection
            collections={gleanCollections}
            defaultValue={glean.collections}
            onChange={(value) =>
              setGlean((prev) => ({ ...prev, collections: value }))
            }
          />
          <div className="mt-auto">
            <div className="mt-[46px] flex items-center gap-[17px]">
              <SecondaryButton onClick={onBack} text="Back" />
              <LoadingButton
                isLoading={isLoading}
                onClick={onCreateGlean}
                text="Add Glean"
                style={{ width: 107 }}
              />
            </div>
          </div>
        </Dialog.Panel>
      </Transition.Child>
    </Transition>
  );
};

export default AddGlean;
