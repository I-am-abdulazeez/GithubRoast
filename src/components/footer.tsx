import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

export default function Footer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <footer className="w-full flex items-center justify-center pb-1">
      <p className="text-center text-gray-400 text-lg">
        Created by:{" "}
        <span
          onClick={onOpen}
          className="cursor-pointer text-white hover:underline"
        >
          Abdul'Azeez
        </span>
      </p>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">About me</ModalHeader>
          <ModalBody>
            Hey there! I’m Abdul’Azeez, the creator of BurnedIn. I love building
            cool apps that mix tech with humor. Think you’re ready for a roast?
            Start with me—click 'Roast Me First!' and see how brutal it gets!
            <Button size="sm">Roast Me First!</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </footer>
  );
}
