"use client";

import React, { useEffect, useState } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error";
  duration?: number;
}

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  
  const duration = toast.duration || 3500;

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto dismiss
    const dismissTimer = setTimeout(() => {
      handleRemove();
    }, duration);

    // Progress bar animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const decrement = 100 / (duration / 50);
        return Math.max(0, prev - decrement);
      });
    }, 50);

    return () => {
      clearTimeout(dismissTimer);
      clearInterval(progressTimer);
    };
  }, [duration]);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const variantStyles = {
    default: "bg-foreground text-background",
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white"
  };

  const role = toast.variant === "error" ? "alert" : "status";

  return (
    <div
      role={role}
      aria-live="polite"
      className={`
        relative rounded-lg px-4 py-3 shadow-lg text-sm font-sans
        transition-all duration-300 ease-out transform
        ${variantStyles[toast.variant || "default"]}
        ${isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-2 scale-95"
        }
        min-w-[300px] max-w-[400px]
      `}
    >
      {/* Contenuto */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {toast.title && (
            <div className="font-medium mb-1">
              {toast.title}
            </div>
          )}
          {toast.description && (
            <div className="opacity-90 leading-relaxed">
              {toast.description}
            </div>
          )}
        </div>
        
        {/* Pulsante close */}
        <button
          type="button"
          onClick={handleRemove}
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:opacity-100"
          aria-label="Chiudi notifica"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 rounded-b-lg overflow-hidden">
        <div 
          className="h-full bg-white/30 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Toast Container
interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[60] pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
};