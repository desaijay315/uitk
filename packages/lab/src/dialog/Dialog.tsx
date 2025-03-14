import {
  makePrefixer,
  Portal,
  useId,
  useWindow,
  ValidationStatus,
  Scrim,
  ScrimProps,
} from "@jpmorganchase/uitk-core";
import classnames from "classnames";
import {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { DialogContext } from "./internal/DialogContext";

import "./Dialog.css";

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  autoFocusRef?: ScrimProps["autoFocusRef"];
  height?: string | number;
  onClose?: () => void;
  open?: boolean;
  status?: ValidationStatus;
  width?: string | number;
  enableBackdropClick?: boolean;
  disablePortal?: boolean;
}

const withBaseName = makePrefixer("uitkDialog");

/**
 * The Dialog is a window that contains text and interactive components.
 * By default, Dialog is non-modal, but supports modal behaviour as well.
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  props,
  ref
) {
  const {
    autoFocusRef,
    children,
    className,
    height,
    id,
    onClose,
    open: openProp,
    status,
    width,
    enableBackdropClick,
    disablePortal,
    ...rest
  } = props;

  const Window = useWindow();
  const [open, setOpen] = useState(openProp);

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  const dialogId = useId();

  const handleClose = useCallback(() => {
    onClose?.();
    setOpen(false);
  }, [onClose, setOpen]);

  const handleBackdropClick = useCallback(() => {
    if (enableBackdropClick) {
      handleClose();
    }
  }, [enableBackdropClick, handleClose]);

  const contentElementRef = useRef<HTMLDivElement | null>(null);

  const setContentElement = useCallback((node: HTMLDivElement) => {
    contentElementRef.current = node;
  }, []);

  if (!open) {
    return null;
  }

  return (
    <DialogContext.Provider value={{ status, dialogId, setContentElement }}>
      <Portal disablePortal={disablePortal}>
        <Scrim
          autoFocusRef={autoFocusRef}
          fallbackFocusRef={contentElementRef}
          open={open}
          closeWithEscape
          onBackDropClick={handleBackdropClick}
          onClose={handleClose}
          aria-labelledby={`${dialogId}-heading`}
          aria-describedby={`${dialogId}-body`}
        >
          <Window id={id}>
            <div
              {...rest}
              className={classnames(withBaseName(), className, {
                [withBaseName("infoShadow")]: status === "info",
              })}
              style={{ width }}
              ref={ref}
            >
              {children}
            </div>
          </Window>
        </Scrim>
      </Portal>
    </DialogContext.Provider>
  );
});
