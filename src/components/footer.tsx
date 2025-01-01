import { useState } from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import toast from "react-hot-toast";

import RoastCard from "@/components/roast-card";

import { generateRoast } from "@/helpers/generate-roast";

import { AzeezData } from "@/data";

import { GithubAPIResponse } from "@/types";

export default function Footer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [roastedBio, setRoastedBio] = useState<GithubAPIResponse | undefined>(
    undefined
  );
  const [roastRes, setRoastRes] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoastMe = async () => {
    setIsLoading(true);
    // Generate roast response with dummy data (or use your actual logic)
    const roastResponse = await generateRoast(
      "I-am-abdulazeez",
      "Hello! My name is Olanrewaju AbdulAzeez Olamide and I am a front-end developer with a strong passion for creating modern, interactive web experiences.",
      true,
      "Lagos, Nigeria",
      57,
      62,
      91
    );

    if (roastResponse.success) {
      setRoastedBio(AzeezData);
      setRoastRes(roastResponse.data!);
      setIsLoading(false);
      toast.success("Are you happy now? 😂");
    } else {
      toast.error("Failed to roast me. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <footer className="w-full flex items-center justify-center pb-4">
      <p className="text-center text-gray-400 text-lg">
        Created by:{" "}
        <span
          onClick={onOpen}
          className="cursor-pointer text-white hover:underline"
        >
          Abdul'Azeez
        </span>
      </p>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="lg"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">About me</ModalHeader>
          <ModalBody>
            Hey there! I’m Abdul’Azeez, the creator of GitRoast. I love building
            cool apps that mix tech with humor. Think you’re ready for a roast?
            Start with me—click 'Roast Me First!' and see how brutal it gets!
            <Button
              onClick={handleRoastMe}
              onTouchStart={handleRoastMe} // For mobile
              className="font-semibold"
              isLoading={isLoading}
            >
              {isLoading ? "Roasting..." : "Roast Me First! 🔥"}
            </Button>
            {roastedBio && roastRes && (
              <div className="mt-2">
                <RoastCard
                  roastedBio={roastedBio}
                  roastRes={roastRes}
                  isModal
                />
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </footer>
  );
}
