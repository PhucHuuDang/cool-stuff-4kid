"use client";

import {
  ElementRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useOnClickOutside } from "usehooks-ts";

import { X } from "lucide-react";

import { FormSubmit } from "./form/form-submit";

interface ModalProps {
  onClose: () => void;
  onSubmit: () => void;
  isOpen?: boolean;
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  const containerRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  const onEscCloseModal = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) {
        return;
      }

      if (e.key === "Escape") {
        setShowModal(false);

        setTimeout(() => {
          onClose();
        }, 300);
      }
    },
    [disabled, onClose]
  );

  const onSubmitEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const onClickOutside = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useOnClickOutside(containerRef, onClickOutside);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        onKeyUp={onEscCloseModal}
        onKeyDown={onSubmitEnter}
        className="
        flex
        justify-center
        items-center
        overflow-x-hidden
        overflow-y-hidden
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800/70
    "
      >
        <div
          className="
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            h-full
            lg:h-auto
            md:h-auto 
        "
        >
          {/* Content Part */}
          <div
            className={`
                translate
                duration-300
                h-full
                ${showModal ? "translate-y-0" : "translate-y-full"}
                ${showModal ? "opacity-100" : "opacity-0"}
                
            `}
          >
            <div
              className="
                translate
                h-full
                lg:h-auto
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
            "
              ref={containerRef}
            >
              <div
                className="
                    flex
                    items-center
                    p-6
                    rounded-t
                    justify-center
                    relative
                    border-b-[1px]
                "
              >
                <button
                  onClick={handleClose}
                  className="
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                "
                >
                  <X size={18} />
                </button>
                <div className="text-lg font-semibold text-center">{title}</div>
              </div>
              {/* Body  */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* Footer  */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <FormSubmit
                      onClick={handleSecondaryAction}
                      disabled={disabled}
                    >
                      {secondaryActionLabel}
                    </FormSubmit>
                  )}
                  {actionLabel && (
                    <FormSubmit
                      className="w-full"
                      variant="book"
                      // onClick={handleSubmit}
                      disabled={disabled}
                    >
                      {actionLabel}
                    </FormSubmit>
                  )}
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
