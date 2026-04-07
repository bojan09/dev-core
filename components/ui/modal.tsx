"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface ModalProps {
  open:           boolean;
  onClose:        () => void;
  title?:         string;
  description?:   string;
  size?:          "sm" | "md" | "lg" | "xl" | "full";
  variant?:       "default" | "danger" | "success";
  hideClose?:     boolean;
  closeOnBackdrop?: boolean;
  className?:     string;
  children:       React.ReactNode;
}

const SIZE_CLASSES = {
  sm:   "max-w-sm",
  md:   "max-w-md",
  lg:   "max-w-lg",
  xl:   "max-w-2xl",
  full: "max-w-5xl",
};

const VARIANT_ACCENT: Record<string, string> = {
  default: "#7B61FF",
  danger:  "#EF4444",
  success: "#10B981",
};

/* ─── Modal ──────────────────────────────────────────────────────────────── */
export function Modal({
  open,
  onClose,
  title,
  description,
  size             = "md",
  variant          = "default",
  hideClose        = false,
  closeOnBackdrop  = true,
  className,
  children,
}: ModalProps) {
  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const accent = VARIANT_ACCENT[variant];

  return (
    <AnimatePresence>
      {open && (
        // Portal-like: fixed overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            className={cn(
              "relative w-full rounded-2xl",
              "bg-[#161B22] border border-white/[0.09]",
              "shadow-[0_32px_96px_rgba(0,0,0,0.8)]",
              SIZE_CLASSES[size],
              className
            )}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{ opacity: 0,   scale: 0.94,  y: 8 }}
            transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Accent top line */}
            <div
              className="absolute top-0 left-8 right-8 h-px rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
            />

            {/* Header */}
            {(title || !hideClose) && (
              <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-0">
                {title && (
                  <div>
                    <h2
                      id="modal-title"
                      className="text-base font-semibold text-[#F0F6FF] leading-tight"
                    >
                      {title}
                    </h2>
                    {description && (
                      <p className="text-sm text-[#8B9BB4] mt-1 leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>
                )}
                {!hideClose && (
                  <button
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg text-[#4B5563] hover:text-[#8B9BB4] hover:bg-white/[0.06] transition-all duration-150"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-5">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─── ModalFooter ────────────────────────────────────────────────────────── */
export function ModalFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 pt-4 mt-2",
        "border-t border-white/[0.06]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─── Confirmation dialog ────────────────────────────────────────────────── */
interface ConfirmModalProps {
  open:         boolean;
  onClose:      () => void;
  onConfirm:    () => void;
  title:        string;
  description:  string;
  confirmLabel?: string;
  cancelLabel?:  string;
  variant?:     "danger" | "default";
  loading?:     boolean;
}

export function ConfirmModal({
  open, onClose, onConfirm,
  title, description,
  confirmLabel = "Confirm",
  cancelLabel  = "Cancel",
  variant      = "default",
  loading      = false,
}: ConfirmModalProps) {
  const accent = variant === "danger" ? "#EF4444" : "#7B61FF";

  return (
    <Modal open={open} onClose={onClose} title={title} description={description} size="sm" variant={variant}>
      <ModalFooter>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl text-sm font-medium text-[#8B9BB4] border border-white/[0.08] hover:bg-white/[0.04] transition-all"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
          style={{ background: accent }}
        >
          {loading ? "Loading..." : confirmLabel}
        </button>
      </ModalFooter>
    </Modal>
  );
}

/* ─── useModal hook ──────────────────────────────────────────────────────── */
export function useModal(defaultOpen = false) {
  const [open, setOpen] = React.useState(defaultOpen);
  const openModal  = useCallback(() => setOpen(true),  []);
  const closeModal = useCallback(() => setOpen(false), []);
  const toggleModal = useCallback(() => setOpen((v) => !v), []);
  return { open, openModal, closeModal, toggleModal };
}
