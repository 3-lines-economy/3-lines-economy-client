import React, { useState, ReactNode } from "react";
import * as S from "./Modal.style";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <S.ModalBackground onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>
        {children}
      </S.ModalContent>
    </S.ModalBackground>
  );
};

export default Modal;
