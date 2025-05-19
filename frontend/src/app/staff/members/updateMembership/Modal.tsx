import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showOverlay?: boolean;
}

export default function Modal({ isOpen, onClose, children, showOverlay = true }: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${showOverlay ? "bg-black bg-opacity-50" : ""}`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}