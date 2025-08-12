import React, { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  className = ""
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Gestione ESC e focus
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Focus al panel quando si apre
    if (panelRef.current) {
      panelRef.current.focus();
    }

    document.addEventListener("keydown", handleKeyDown);
    
    // Previeni scroll del body
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/50 transition-opacity duration-200 z-40
          ${open ? "opacity-100" : "opacity-0"}
        `}
        onClick={handleOverlayClick}
      />

      {/* Dialog container */}
      <div
        className="fixed inset-0 flex items-center justify-center p-4 z-50"
        onClick={handleOverlayClick}
      >
        {/* Panel */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          tabIndex={-1}
          className={`
            w-full max-w-lg rounded-lg bg-background text-foreground shadow-lg
            transition-all duration-200 transform
            ${open ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            focus:outline-none
            ${className}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2
                id="modal-title"
                className="font-heading text-xl font-medium text-foreground"
              >
                {title}
              </h2>
              
              <button
                type="button"
                onClick={onClose}
                className="text-foreground/60 hover:text-foreground transition-colors duration-200 focus:outline-none focus:text-foreground"
                aria-label="Chiudi modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Body */}
          <div className={`px-6 ${title ? 'py-4' : 'py-6'}`}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;