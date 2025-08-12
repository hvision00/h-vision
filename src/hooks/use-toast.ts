"use client";

import React, { useState, useCallback } from 'react';
import { Toast } from '../components/ui/Base/Toast';

// Store globale semplice
let globalToasts: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener([...globalToasts]));
};

const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
  globalToasts = [...globalToasts, { ...toast, id }];
  notifyListeners();
};

const removeToast = (id: string) => {
  globalToasts = globalToasts.filter(toast => toast.id !== id);
  notifyListeners();
};

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>(globalToasts);

  // Subscribe to global state changes
  const subscribe = useCallback((listener: (toasts: Toast[]) => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  // Update local state when global state changes
  React.useEffect(() => {
    return subscribe(setToasts);
  }, [subscribe]);

  const toast = useCallback((options: Omit<Toast, 'id'>) => {
    addToast(options);
  }, []);

  return {
    toast,
    toasts,
    removeToast
  };
};