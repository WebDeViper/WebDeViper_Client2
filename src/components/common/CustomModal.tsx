import React from 'react';
import Modal from 'react-modal';
import ReactModal from 'react-modal';

interface Props {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

export default function CustomModal({ isOpen, close, children }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      style={customStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </Modal>
  );
}

const customStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '9999',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: 'fit-content',
    height: 'fit-content',
    zIndex: '150',
    position: 'absolute',
    padding: '0',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'auto',
  },
};
