import { useState, useCallback } from 'react';

interface IModalHook {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (): IModalHook => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, openModal, closeModal };
};

export default useModal;
