import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

export const Modal = ({ open, title, children, onClose }) => {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close modal backdrop"
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-white/10 bg-[#1a1714] p-5 shadow-lift animate-fade-up sm:rounded-3xl sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-white">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
