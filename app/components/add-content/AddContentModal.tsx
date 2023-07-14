"use client";

import { Dialog, Transition } from "@headlessui/react";
import { GleanCollection, GleanTag } from "@prisma/client";
import axios from "axios";
import React, { FC, Fragment, useState } from "react";

import { getRandomEmoji } from "@/app/helpers/getRandomEmoji";
import { isUrl } from "@/app/helpers/isUrl";
import { sleep } from "@/app/helpers/sleep";
import { GleanData, gleanSchema } from "@/app/types/glean";

import AddGlean from "./AddGlean";
import CollectionsCard from "./CollectionsCard";
import GleansCard from "./GleansCard";
import Success from "./Success";
import BaseModal from "../BaseModal";
import PrimaryButton from "../buttons/PrimaryButton";
import LinkInput from "../inputs/LinkInput";

const LOADING_TIME = 3500; // 3.5 seconds of loading animation
const LEAVE_TIMEOUT = 200;

type Props = {
  tags: GleanTag[];
  collections: GleanCollection[];
};

const AddContentModal: FC<Props> = ({ tags, collections }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGleanModalOpen, setIsGleanModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isAddingGlean, setIsAddingGlean] = useState(false);
  const [glean, setGlean] = useState<GleanData>(initGlean());

  const handleCreateContent = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      setIsGleanModalOpen(true);
    }, LEAVE_TIMEOUT + 100);
  };

  const handleAddContent = async () => {
    if (!!glean.title) {
      if (isUrl(glean.title)) {
        setIsLoading(true);

        try {
          const startTime = new Date();
          const { data } = await axios.get<{
            title: string;
            description: string;
            imageUrl: string;
          }>("/api/metadata", {
            params: { url: glean.title },
          });
          const requestTime = new Date().getTime() - startTime.getTime();

          if (LOADING_TIME - requestTime > 0) {
            await sleep(LOADING_TIME - requestTime + 100);
          }

          setGlean((prev) => ({
            ...prev,
            title: data.title || prev.title || "",
            description: data.description || "",
            image: data.imageUrl || getRandomEmoji(),
          }));
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    handleCreateContent();
  };

  const handleCreateGlean = async () => {
    // Possibility to add validation
    if (!gleanSchema.safeParse(glean).success) return;

    setIsAddingGlean(true);

    try {
      const startTime = new Date();
      await axios.post("/api/gleans", glean);
      const requestTime = new Date().getTime() - startTime.getTime();

      if (LOADING_TIME - requestTime > 0) {
        await sleep(LOADING_TIME - requestTime + 100);
      }

      setIsGleanModalOpen(false);
      setTimeout(() => {
        setGlean(initGlean());
        setIsSuccessOpen(true);
      }, LEAVE_TIMEOUT);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddingGlean(false);
    }
  };

  return (
    <div className="w-full p-4">
      <PrimaryButton
        onClick={() => {
          setIsModalOpen(true);
          setIsMenuOpen(true);
        }}
        text="Add Content"
      />

      <BaseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsMenuOpen(false);
          setIsGleanModalOpen(false);
        }}
      >
        <Transition appear show={isMenuOpen} as={Fragment}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-400"
            enterFrom="opacity-0 translate-y-[100vh]"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-[100vh]"
          >
            <Dialog.Panel className="flex w-full max-w-md transform flex-col items-center justify-end overflow-hidden rounded-t-[60px] bg-modalBg/80 px-[21px] pb-12 pt-[41px] text-left align-middle shadow-modalShadow transition-all">
              <Dialog.Title
                as="h3"
                className="mb-[46px] text-center text-[32px] leading-loose text-white/50 [text-shadow:_0_5px_10px_rgb(0_0_0_/_25%)]"
              >
                Add content
              </Dialog.Title>
              <div className="flex items-center justify-center gap-12 pl-3">
                <GleansCard onClick={handleCreateContent} />
                <CollectionsCard onClick={handleCreateContent} />
              </div>
              <div className="mt-9 flex flex-col gap-[17px]">
                <LinkInput
                  value={glean.title}
                  isLoading={isLoading}
                  onChange={(value) =>
                    setGlean((prev) => ({ ...prev, title: value }))
                  }
                  onAddClick={handleAddContent}
                />
                <p className="text-center text-sm leading-[17px] text-white/70">
                  <span className="font-bold">Powered by Gleans Ai</span> ✨
                  Create content automatically and make changes if needed.
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Transition>
        <AddGlean
          glean={glean}
          setGlean={setGlean}
          gleanTags={tags}
          gleanCollections={collections}
          isOpen={isGleanModalOpen}
          isLoading={isAddingGlean}
          onCreateGlean={handleCreateGlean}
          onBack={() => {
            setIsGleanModalOpen(false);
            setTimeout(() => {
              setGlean(initGlean());
              setIsMenuOpen(true);
            }, LEAVE_TIMEOUT);
          }}
        />
        <Success
          isOpen={isSuccessOpen}
          onDone={() => {
            setIsSuccessOpen(false);
            setTimeout(() => {
              setIsModalOpen(false);
            }, LEAVE_TIMEOUT);
          }}
        />
      </BaseModal>
    </div>
  );
};

const initGlean = (): GleanData => ({
  description: "",
  title: "",
  image: getRandomEmoji(),
  tags: [],
  collections: [],
});

export default AddContentModal;
