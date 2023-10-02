import React, { ReactNode, KeyboardEvent } from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  backdrop?: boolean;
  isCenter?: boolean;
  customClass?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  closeButtonLabel: string;
}

const Modal: React.FC<IProps> = ({
  isOpen,
  onClose,
  children,
  size,
  backdrop,
  isCenter,
  customClass,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  closeButtonLabel,
}): React.ReactElement => {
  if (!isOpen) return <></>;

  const modalSizeClass = size ? `modal-${size}` : '';
  const backdropClass = backdrop ? 'bg-black opacity-40' : '';
  const centerClass = isCenter ? 'items-center justify-center' : '';

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (closeOnEscape && event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${centerClass}`}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={-1}
    >
      <div className={`flex ${centerClass} min-h-screen`}>
        <div className={`fixed inset-0 ${backdropClass}`}></div>
        <div className={`z-50 bg-white p-8 rounded-lg shadow-lg ${modalSizeClass} ${customClass}`}>
          {children}
          <button className='mt-6 bg-black rounded-full text-white p-2 w-full font-semibold' onClick={onClose}>
            {closeButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
