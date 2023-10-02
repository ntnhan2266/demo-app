// src/components/RegisterFailedModal.tsx
import React from 'react';
import Modal from '@/components/common/Modal';

interface RegisterFailedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const ErrorModal: React.FC<RegisterFailedModalProps> = ({ isOpen, onClose, title, content }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium" backdrop={true} isCenter={true} closeButtonLabel='OK'>
      <p  className='text-xl mb-1'>&#128558;</p>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className='text-gray-500'>{content}</p>
    </Modal>
  );
};

export default ErrorModal;
